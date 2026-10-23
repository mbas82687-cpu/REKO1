
// coi-serviceworker - minimal version for REKO
if (typeof window === 'undefined') {
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
  self.addEventListener("fetch", (e) => {
    if (e.request.cache === "only-if-cached" && e.request.mode !== "same-origin") return;
    e.respondWith(
      fetch(e.request).then((response) => {
        if (response.status === 0) return response;
        const newHeaders = new Headers(response.headers);
        newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
        newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
      }).catch(() => fetch(e.request))
    );
  });
} else {
  (async function() {
    if (window.crossOriginIsolated !== false) return;
    const registration = await navigator.serviceWorker.register(window.document.currentScript.src).catch(() => {});
    if (registration) {
      if (registration.active && !navigator.serviceWorker.controller) {
        window.location.reload();
      }
    }
  })();
}
