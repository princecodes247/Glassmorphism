const staticGGen = "glassmorphism-generator-v1"
const assets = [
    "/",
    "/style.css",
    "/main.js",
    "/prism.css",
    "/prism.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticGGen).then(cache => {
            cache.addAll(assets)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request)
        })
    )
})