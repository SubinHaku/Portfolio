create extension if not exists pgcrypto;

create table if not exists public.portfolio_chat_owners (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create table if not exists public.portfolio_chat_conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null references auth.users (id) on delete cascade,
  owner_id uuid not null references auth.users (id) on delete cascade,
  visitor_name text not null check (char_length(btrim(visitor_name)) between 2 and 80),
  visitor_email text not null check (
    char_length(visitor_email) between 5 and 254
    and visitor_email ~* '^[^@[:space:]]+@[^@[:space:]]+[.][^@[:space:]]+$'
  ),
  request_message text not null check (char_length(btrim(request_message)) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (visitor_id <> owner_id)
);

create unique index if not exists portfolio_chat_one_active_request_per_visitor
  on public.portfolio_chat_conversations (visitor_id)
  where status in ('pending', 'accepted');

create index if not exists portfolio_chat_conversations_owner_status_created
  on public.portfolio_chat_conversations (owner_id, status, created_at desc);

create table if not exists public.portfolio_chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.portfolio_chat_conversations (id) on delete cascade,
  sender_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists portfolio_chat_messages_conversation_created
  on public.portfolio_chat_messages (conversation_id, created_at);

create or replace function public.is_portfolio_chat_owner(candidate_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portfolio_chat_owners
    where user_id = candidate_id
  );
$$;

create or replace function public.is_portfolio_chat_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select public.is_portfolio_chat_owner((select auth.uid()));
$$;

create or replace function public.is_portfolio_chat_participant(conversation_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portfolio_chat_conversations
    where id = conversation_id
      and (
        visitor_id = (select auth.uid())
        or owner_id = (select auth.uid())
      )
  );
$$;

create or replace function public.can_access_portfolio_chat_call()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portfolio_chat_conversations
    where id::text = split_part((select realtime.topic()), ':', 2)
      and status = 'accepted'
      and (
        visitor_id = (select auth.uid())
        or owner_id = (select auth.uid())
      )
  );
$$;

revoke all on function public.is_portfolio_chat_owner(uuid) from public, anon;
revoke all on function public.is_portfolio_chat_owner() from public, anon;
revoke all on function public.is_portfolio_chat_participant(uuid) from public, anon;
revoke all on function public.can_access_portfolio_chat_call() from public, anon;
grant execute on function public.is_portfolio_chat_owner(uuid) to authenticated;
grant execute on function public.is_portfolio_chat_owner() to authenticated;
grant execute on function public.is_portfolio_chat_participant(uuid) to authenticated;
grant execute on function public.can_access_portfolio_chat_call() to authenticated;

alter table public.portfolio_chat_owners enable row level security;
alter table public.portfolio_chat_conversations enable row level security;
alter table public.portfolio_chat_messages enable row level security;

revoke all on public.portfolio_chat_owners from anon, authenticated;
revoke all on public.portfolio_chat_conversations from anon, authenticated;
revoke all on public.portfolio_chat_messages from anon, authenticated;

grant select, insert on public.portfolio_chat_conversations to authenticated;
grant update (status) on public.portfolio_chat_conversations to authenticated;
grant select, insert on public.portfolio_chat_messages to authenticated;

drop policy if exists "chat participants can read their conversations"
  on public.portfolio_chat_conversations;
create policy "chat participants can read their conversations"
  on public.portfolio_chat_conversations
  for select
  to authenticated
  using (visitor_id = (select auth.uid()) or (select public.is_portfolio_chat_owner()));

drop policy if exists "anonymous visitors can request a conversation"
  on public.portfolio_chat_conversations;
create policy "anonymous visitors can request a conversation"
  on public.portfolio_chat_conversations
  for insert
  to authenticated
  with check (
    visitor_id = (select auth.uid())
    and (select (auth.jwt() ->> 'is_anonymous')::boolean)
    and (select public.is_portfolio_chat_owner(owner_id))
    and status = 'pending'
  );

drop policy if exists "only the portfolio owner can update a conversation"
  on public.portfolio_chat_conversations;
create policy "only the portfolio owner can update a conversation"
  on public.portfolio_chat_conversations
  for update
  to authenticated
  using ((select public.is_portfolio_chat_owner()))
  with check ((select public.is_portfolio_chat_owner()));

drop policy if exists "accepted chat participants can read messages"
  on public.portfolio_chat_messages;
create policy "accepted chat participants can read messages"
  on public.portfolio_chat_messages
  for select
  to authenticated
  using (
    (select public.is_portfolio_chat_participant(conversation_id))
    and exists (
      select 1
      from public.portfolio_chat_conversations
      where id = conversation_id
        and status = 'accepted'
    )
  );

drop policy if exists "accepted chat participants can send messages"
  on public.portfolio_chat_messages;
create policy "accepted chat participants can send messages"
  on public.portfolio_chat_messages
  for insert
  to authenticated
  with check (
    sender_id = (select auth.uid())
    and (select public.is_portfolio_chat_participant(conversation_id))
    and exists (
      select 1
      from public.portfolio_chat_conversations
      where id = conversation_id
        and status = 'accepted'
    )
  );

drop policy if exists "accepted chat participants can receive call signals"
  on realtime.messages;
create policy "accepted chat participants can receive call signals"
  on realtime.messages
  for select
  to authenticated
  using (
    extension = 'broadcast'
    and (select public.can_access_portfolio_chat_call())
  );

drop policy if exists "accepted chat participants can send call signals"
  on realtime.messages;
create policy "accepted chat participants can send call signals"
  on realtime.messages
  for insert
  to authenticated
  with check (
    extension = 'broadcast'
    and (select public.can_access_portfolio_chat_call())
  );

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_chat_conversations'
  ) then
    alter publication supabase_realtime add table public.portfolio_chat_conversations;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'portfolio_chat_messages'
  ) then
    alter publication supabase_realtime add table public.portfolio_chat_messages;
  end if;
end
$$;
