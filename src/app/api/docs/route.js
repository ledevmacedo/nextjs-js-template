import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  url: "/openapi.yaml",
  theme: "default", //default,moon,kepler
  layout: "classic",
  proxyUrl: "https://proxy.scalar.com",
};

export const GET = ApiReference(config);
