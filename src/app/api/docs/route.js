import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  url: "/openapi.yaml",
  theme: "default", //default,moon,kepler
  layout: "classic",
};

export async function GET(request) {
  const isDevelopment =
    process.env.NODE_ENV === "development" &&
    process.env.NODE_ENV !== "staging";
  if (!isDevelopment) {
    return new Response("Not found", { status: 404 });
  }

  const handler = ApiReference(config);
  return handler(request);
}
