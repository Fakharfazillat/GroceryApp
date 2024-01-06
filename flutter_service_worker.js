'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "3bdc815eefb2084020885f85b2739760",
"assets/AssetManifest.json": "3e6e9d43bf53842f3d7424fbe4da8daf",
"assets/assets/images/Ellipse%252010.png": "5d9cde232fe9d055c9a56189f1a3e2c3",
"assets/assets/images/Ellipse%25205.png": "ff0ab67d761335d2c5e2e9bb07605bc2",
"assets/assets/images/Ellipse%25207.png": "d9c93781a3a3caa2114b48c34c9abe83",
"assets/assets/images/Ellipse%25208.png": "e8c83b2c4296a78f313b054e220e75fd",
"assets/assets/images/Ellipse%25209.png": "62655b0cfcb2f77a2d03e34378ac5db2",
"assets/assets/images/fluent-emoji_fire.png": "eca13e1bdfd365ccf326983641956e5d",
"assets/assets/images/Frame%25201.png": "4e31d492772fb02c933a4ef37f03bc8b",
"assets/assets/images/Group.png": "6c4f9e7d33b69c15508195c515499ea2",
"assets/assets/images/mdi_organic-outline.png": "d0e61188fe090fc1632b764fbee7b137",
"assets/assets/images/noto_star.png": "ae5b2a2d9173ced2ddb60f7975c2e5f5",
"assets/assets/images/pngwing%25201.png": "63a650ed43118e674d6257c181c2bf4f",
"assets/assets/images/Rectangle%25202.png": "ac29d0a95db5d25ac13f208211bbe01b",
"assets/assets/images/Rectangle%25204381-1.png": "b2efbaa961f7f5d7ba99a3122055aed4",
"assets/assets/images/Rectangle%25204381.png": "a564982b7530609d4367f892ee33f511",
"assets/assets/images/Rectangle%25204382-1.png": "48967aea8f93f798ab25d7c755c0ebb3",
"assets/assets/images/Rectangle%25204382-10.png": "0b8741e2cab12eb2d6bac43eb96014f5",
"assets/assets/images/Rectangle%25204382-2.png": "78ec98e5a7c32e6fa99c7609625fea1d",
"assets/assets/images/Rectangle%25204382-3.png": "7eaea9e151866edaa8825544dad9b7be",
"assets/assets/images/Rectangle%25204382-4.png": "2b0d6bc3abc9e7b252fb06f99c61783d",
"assets/assets/images/Rectangle%25204382-5.png": "6555168e9abdce092202569e8b6c8ed9",
"assets/assets/images/Rectangle%25204382-6.png": "8980161c128b2e10afd719339e27131d",
"assets/assets/images/Rectangle%25204382-7.png": "97b999f95e0ca0598480c8a2eeebbddd",
"assets/assets/images/Rectangle%25204382-8.png": "6629a937e387ae042b77ffd98be7ff40",
"assets/assets/images/Rectangle%25204382-9.png": "83d2e0eaa8de7872601d43285f46c1f6",
"assets/assets/images/Rectangle%25204382.png": "9cff54524c2fcbb1e6ce3e6debd4bda5",
"assets/assets/images/tabler_square-number-1.png": "98644736c74f86a16514030a50768a29",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "1f1d1a30220880d49718a6e8c8fd5a3a",
"assets/NOTICES": "dc54efecfaef8b079e042dd439f8c2ef",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "42df12e09ecc0d5a4a34a69d7ee44314",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "be0e3b33510f5b7b0cc76cc4d3e50048",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "1a074e8452fe5e0d02b112e22cdcf455",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9fdb98b35133a698e21d1d46990555cd",
"/": "9fdb98b35133a698e21d1d46990555cd",
"main.dart.js": "8413204ebf8ed17ae79a798cbe6c0b73",
"manifest.json": "62ad66482ba7a6a601e1a703c39cf957",
"version.json": "3de6998f3db28291b0b466b136288e78"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
