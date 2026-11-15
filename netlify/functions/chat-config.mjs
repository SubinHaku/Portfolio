const ownerIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export default async (request) => {
  if (request.method !== "GET") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const ownerId = process.env.SUPABASE_OWNER_ID;

  if (!supabaseUrl || !supabaseAnonKey || !ownerIdPattern.test(ownerId || "")) {
    return jsonResponse({ error: "Chat is not configured yet." }, 503);
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    return jsonResponse({ error: "Chat configuration is invalid." }, 503);
  }

  if (
    parsedUrl.protocol !== "https:" &&
    !["localhost", "127.0.0.1"].includes(parsedUrl.hostname)
  ) {
    return jsonResponse({ error: "Chat configuration is invalid." }, 503);
  }

  return jsonResponse({ supabaseUrl, supabaseAnonKey, ownerId });
};
