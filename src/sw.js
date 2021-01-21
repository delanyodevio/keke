const staticCacheName = "static-assets";

const assets = [
  "/",
  "/index.html",
  "/scripts/app.js",
  "/images/bg/brand.svg",
  "/images/bg/favicon.svg",
  "/images/bg/personal_goal.webp",
  "/images/bg/saving-lady.webp",
  "/images/bg/building_wealth.webp",
  "/images/bg/happiest_man.webp",
  "/images/bg/independence_oxygen.webp",
  "/images/bg/keeping_money.webp",
  "/images/bg/saving_and_getting.webp",
  "/images/bg/savings_habit.webp",
  "/images/bg/sowing_and_reaping.webp",
  "/fonts/fonts.css",
  "/fonts/Literata-400-cyrillic-ext1.woff2",
  "/fonts/Literata-400-cyrillic-ext8.woff2",
  "/fonts/Literata-400-cyrillic2.woff2",
  "/fonts/Literata-400-cyrillic9.woff2",
  "/fonts/Literata-400-greek-ext3.woff2",
  "/fonts/Literata-400-greek-ext10.woff2",
  "/fonts/Literata-400-greek4.woff2",
  "/fonts/Literata-400-greek11.woff2",
  "/fonts/Literata-400-latin-ext6.woff2",
  "/fonts/Literata-400-latin-ext13.woff2",
  "/fonts/Literata-400-latin7.woff2",
  "/fonts/Literata-400-latin14.woff2",
  "/fonts/Literata-400-vietnamese5.woff2",
  "/fonts/Literata-400-vietnamese12.woff2",
  "/fonts/Literata-700-cyrillic-ext15.woff2",
  "/fonts/Literata-700-cyrillic16.woff2",
  "/fonts/Literata-700-greek-ext17.woff2",
  "/fonts/Literata-700-greek18.woff2",
  "/fonts/Literata-700-latin-ext20.woff2",
  "/fonts/Literata-700-latin21.woff2",
  "/fonts/Literata-700-vietnamese19.woff2",
  "/fonts/Red_Hat_Display-400-latin-ext22.woff2",
  "/fonts/Red_Hat_Display-400-latin23.woff2",
  "/fonts/Red_Hat_Display-900-latin-ext24.woff2",
  "/fonts/Red_Hat_Display-900-latin25.woff2",
];

// Install event.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Activate event.
self.addEventListener("activate", (event) => {});

// Fetch event.
self.addEventListener("fetch", (event) => {});
