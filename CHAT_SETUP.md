# Portfolio chat beta setup

The chat uses Supabase Auth, Postgres with row-level security, Supabase Realtime, and browser WebRTC. The site does not contain a Supabase service-role key.

## Supabase setup

1. Create a Supabase project.
2. In **Authentication → Sign In / Providers**, enable **Anonymous Sign-Ins**. Create your owner account with email and password; keep it private.
3. Run [`supabase/chat-schema.sql`](./supabase/chat-schema.sql) in the Supabase SQL Editor.
4. Copy your owner account's user UUID from **Authentication → Users**, then add it:

   ```sql
   insert into public.portfolio_chat_owners (user_id)
   values ('YOUR_OWNER_USER_UUID')
   on conflict do nothing;
   ```

5. The call-signaling channel is marked private in the client and authorized by the `realtime.messages` policies in the schema. The schema also adds the chat tables to the `supabase_realtime` publication; keep those policies enabled.
6. In Netlify, set these site environment variables and redeploy:
   - `SUPABASE_URL`: the project URL
   - `SUPABASE_ANON_KEY`: the project's publishable/anon key (never use the `service_role` key)
   - `SUPABASE_OWNER_ID`: the owner account UUID from step 4

## Beta behavior

- Visitors enter a display name, email, and text request. Email is not verified in this guest beta.
- Only you can accept or decline requests. Messages and calls stay unavailable until you accept.
- After acceptance, either participant can start an audio or video call. The other participant must accept the ringing call before media is shared.
- Both people must have the accepted conversation open and stay online for real-time chat/calls. Calls need HTTPS and microphone/camera permission.
- There are no push/email notifications or CAPTCHA in this beta; requests appear when you open the owner inbox. Add abuse protection before promoting it widely.
- WebRTC uses a public STUN server for this beta. Some networks require a TURN relay, so calls may not connect everywhere without one.
- Messages are stored in Supabase and are not end-to-end encrypted. Do not use the beta for sensitive information. File/image sharing and verified email are not enabled.
