import { getStore } from "@netlify/blobs";

const resumeFilename = "Subin_Ratna_Tuladhar.pdf";
const visitorIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function jsonResponse(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

async function getStats(store, visitorId, requestUrl) {
  const [likes, downloads, liked, resumeResponse] = await Promise.all([
    store.list({ prefix: "likes/" }),
    store.list({ prefix: "downloads/" }),
    store.get(`likes/${visitorId}`),
    fetch(new URL(`/${resumeFilename}`, requestUrl), { method: "HEAD" }),
  ]);
  const isResumeAvailable =
    resumeResponse.ok && resumeResponse.headers.get("content-type")?.includes("application/pdf");

  return {
    likes: likes.blobs.length,
    downloads: downloads.blobs.length,
    liked: liked !== null,
    resumeAvailable: Boolean(isResumeAvailable),
  };
}

export default async (request) => {
  if (request.method === "GET") {
    const visitorId = new URL(request.url).searchParams.get("visitorId");
    if (!visitorIdPattern.test(visitorId || "")) {
      return jsonResponse({ error: "A valid visitor ID is required." }, 400);
    }

    try {
      const store = getStore("portfolio-engagement");
      return jsonResponse(await getStats(store, visitorId, request.url));
    } catch (error) {
      console.error("Could not read portfolio engagement stats.", error);
      return jsonResponse({ error: "Portfolio stats are temporarily unavailable." }, 500);
    }
  }

  if (request.method === "POST") {
    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "The request body must be valid JSON." }, 400);
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      return jsonResponse({ error: "The request body must be an object." }, 400);
    }

    const { action, visitorId } = payload;
    if (
      typeof visitorId !== "string" ||
      !visitorIdPattern.test(visitorId) ||
      !["like", "unlike"].includes(action)
    ) {
      return jsonResponse({ error: "A valid action and visitor ID are required." }, 400);
    }

    try {
      const store = getStore("portfolio-engagement");
      if (action === "like") {
        await store.set(`likes/${visitorId}`, "1", { onlyIfNew: true });
      } else {
        await store.delete(`likes/${visitorId}`);
      }

      return jsonResponse(await getStats(store, visitorId, request.url));
    } catch (error) {
      console.error("Could not update portfolio engagement stats.", error);
      return jsonResponse({ error: "Portfolio stats are temporarily unavailable." }, 500);
    }
  }

  return jsonResponse({ error: "Method not allowed." }, 405);
};
