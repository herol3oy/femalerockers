import type { NextConfig } from "next";

const interviewSlugs = [
  "elisafortunato",
  "amberdebellis",
  "martinanixe",
  "maryn",
  "cicipowell",
  "alicelane",
  "leyan",
  "tora",
  "annasentina",
  "rachelg",
  "alexarae",
  "arielbellvalaire",
  "emilydolandavies",
  "alexey",
  "brunaterroni",
  "sacravictoria",
  "abbyk",
  "andreakrakovska",
  "francescamancini",
  "nanuvillalba",
  "rubybouzioti",
  "soniaanubis",
  "moriahformica",
  "chena",
  "giorgia",
  "lexiilynnfrazier",
  "loidaliuzzi",
  "lexirose",
  "jimenafosado",
  "sacravictoria2",
  "esprila",
  "aldana",
  "anouckandre",
  "tracylambertucci",
  "brookecolucci",
  "leyan2026",
  "gloriamaurel",
  "elianacargnelutti",
  "yoohyejin",
  "emilyhastings",
  "larissaliveir",
  "kseniakuznetsova",
  "eleonoramoriartydaolio",
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  serverExternalPackages: ["@countrystatecity/countries"],

  async redirects() {
    return interviewSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/interviews/${slug}`,
      permanent: true,
    }));
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    optimizePackageImports: ["@phosphor-icons/react"],
  },

  allowedDevOrigins: ["127.0.0.1"],

  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
