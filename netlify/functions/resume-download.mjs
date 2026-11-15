import { randomUUID } from "node:crypto";
import { getStore } from "@netlify/blobs";

const resumeFilename = "Subin_Ratna_Tuladhar.pdf";

function errorResponse(message, status) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export default async (request) => {
  if (request.method !== "GET") {
    return errorResponse("Method not allowed.", 405);
  }

  let resumeResponse;
  try {
    resumeResponse = await fetch(new URL(`/${resumeFilename}`, request.url));
  } catch (error) {
    console.error("Could not retrieve the resume PDF.", error);
    return errorResponse("The resume is temporarily unavailable.", 502);
  }

  if (!resumeResponse.ok || !resumeResponse.headers.get("content-type")?.includes("application/pdf")) {
    return errorResponse("The resume PDF has not been added yet.", 404);
  }

  let counted = true;
  try {
    const store = getStore("portfolio-engagement");
    await store.set(`downloads/${randomUUID()}`, new Date().toISOString());
  } catch (error) {
    console.error("Could not record the resume download.", error);
    counted = false;
  }

  return new Response(resumeResponse.body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="${resumeFilename}"`,
      "Content-Type": "application/pdf",
      "X-Download-Counted": String(counted),
    },
  });
};
