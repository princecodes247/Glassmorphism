const staticGGen = "glassmorphism-generator-v1"
const assets = [
    "/",
    "/index.html",
    "/style.css",
    "/main.js",
    "/prism.css",
    "/prism.js",
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticGGen)
            .then(cache => {
                return cache.addAll(assets)
            })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request)
            .then(res => {
                return res || fetch(fetchEvent.request)
                //         .then(res => {
                //             if (!res || res.status !== 200 || res.type !== 'basic') {
                //                 return res;
                //             }

                //             let resToCache = res.clone();
                //             caches.open(staticGGen)
                //                 .then(cache => {
                //                     cache.put(fetchEvent.request, resToCache)
                //                 })

                //             return res
                //         }
                //         )
                // })
                // .then(networkRes => {
                //     cache.put
                //     return res || fetch(fetchEvent.request)
            })
    )
}
)