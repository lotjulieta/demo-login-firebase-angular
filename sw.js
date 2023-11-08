self.addEventListener("fetch", function (event) {});

console.log('sw funciona');

const STATIC_CACHE = "static";

const APP_SHELL = [
    "/",
    "index.html"
];


self.addEventListener("install", (e) => {
    const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

    e.waitUntil(cacheStatic);
}) ;


self.addEventListener('fetch', (e) => {

if(e.request.url.includes('.png') ) {
         console.log(e.request.url);

      let fotoReq = fetch( e.request  ) ;

        e.respondWith (fotoReq);
    }

 });


 self.addEventListener('fetch', (e) => {

    if (e.request.url.includes('style.css')) {
        e.respondWith( null );
    }
    else {
        e.respondWith( fetch( e.request));
    }
    
 } );