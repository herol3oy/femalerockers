if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let s = Promise.resolve();
      return (
        n[e] ||
          (s = new Promise(async (s) => {
            if ("document" in self) {
              const n = document.createElement("script");
              (n.src = e), document.head.appendChild(n), (n.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!n[e]) throw new Error(`Module ${e} didn’t register its module`);
          return n[e];
        })
      );
    },
    s = (s, n) => {
      Promise.all(s.map(e)).then((e) => n(1 === e.length ? e[0] : e));
    },
    n = { require: Promise.resolve(s) };
  self.define = (s, c, i) => {
    n[s] ||
      (n[s] = Promise.resolve().then(() => {
        let n = {};
        const t = { uri: location.origin + s.slice(1) };
        return Promise.all(
          c.map((s) => {
            switch (s) {
              case "exports":
                return n;
              case "module":
                return t;
              default:
                return e(s);
            }
          })
        ).then((e) => {
          const s = i(...e);
          return n.default || (n.default = s), n;
        });
      }));
  };
}
define("./sw.js", ["./workbox-8778d57b"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/E07eItp8xzICVqNQgU9vh/_buildManifest.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/E07eItp8xzICVqNQgU9vh/_ssgManifest.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/05d954cf.9543659deee757b5635d.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/1bfc9850.fa17939a732878ab783b.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/29107295.1cd452b74215f4b651bd.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/2ef38716a8bd6a0dda809252fe5510ce81c385e3.6b033d750727266128ee.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/59062a989afaeadac2d08efe63ab7db1345452ef.191a053c89773b3be620.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/71247caf95475e3ea7f9a0f8a30beb258b23d005.b209d3f933b7852bfdac.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/831a594deca4b24090b0e4cc97e8de2323a86093.5dc5a92a1fcd97b0a473.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/9f7bdbd56975dd1cc9c571296d0aa9526165ba7d.0156884feafb25f0b7e8.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/e68168650b825ef6a2d1ce621ee26cba026f1793.e97a071d086f52918f3b.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/ead95ec3.bc7564fa166f0d34b14f.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/framework.a3ab6d70963b928e4674.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/main-0d301e9d431a9598d736.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/pages/%5Binterview%5D-1c0becffb08c4df4f9df.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/pages/_app-19e4f920fefc451d086e.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/pages/_error-d84cac427c4de25614b8.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/pages/articles-b19d469c5175ca75852e.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/pages/articles/%5Barticle%5D-6e0ced2db8e3110740a2.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/pages/index-f592217bfa56ea2ed1f9.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/pages/page/%5Bpage%5D-d1aefd9ad26f4b118f7f.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url:
            "/_next/static/chunks/pages/privacypolicy-f20b71fd2ad930a8537a.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/pages/terms-be6cc1390a989c7613ad.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/polyfills-2be76cc2531af487e612.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/css/15d58c59ad3e6fb34950.css",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/_next/static/css/1ab0ceb0db9cbc674eed.css",
          revision: "E07eItp8xzICVqNQgU9vh",
        },
        {
          url: "/apple-icon.png",
          revision: "4bb44c9008ef8c5f936e581d5b8719b0",
        },
        {
          url: "/favicon-16x16.png",
          revision: "5af7b410743c501762cddba05c51d7f3",
        },
        {
          url: "/favicon-32x32.png",
          revision: "fcd4cf937159884df8304bed468afc2c",
        },
        { url: "/favicon.ico", revision: "d26d61a66cd2b173576b5bbd07925769" },
        {
          url: "/icons/icon-128x128.png",
          revision: "10556db121c9ba8055021408afbf754d",
        },
        {
          url: "/icons/icon-144x144.png",
          revision: "321f3c8efe14600cae6ee5e6f6290147",
        },
        {
          url: "/icons/icon-152x152.png",
          revision: "d078761cfc8bb83edf7275d4c8c5f35d",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "74cb416cefa1b915419cdb0b8bdeb1d2",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "779162753a0da6d12033734bb256c520",
        },
        {
          url: "/icons/icon-72x72.png",
          revision: "98f116f0f55d3d288335375547acd1ae",
        },
        {
          url: "/icons/icon-96x96.png",
          revision: "e8bcf1f621d48afcf833f588713a29be",
        },
        { url: "/logo.png", revision: "6f5e241e2de536610281178ecec9aa3f" },
        { url: "/manifest.json", revision: "56971b1093ae2ad5edf2c7bf47f505d3" },
        {
          url: "/og-thumbnail.png",
          revision: "fe7fae18d17b16fadc5ec45f4a0c2c89",
        },
        { url: "/robots.txt", revision: "6ec5d3f49384dee6bca959de5312dca7" },
        {
          url: "/screenshot.png",
          revision: "91009ea6706db09845cf7e9802a1b1cc",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
