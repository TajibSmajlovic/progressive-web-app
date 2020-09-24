var deferredPrompt;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js") // .register("/service-worker.js", { scope: "/help" })
    .then(() => console.log("Service worker registered!"));
}

window.addEventListener("beforeinstallprompt", (e) => {
  console.log(e);
  e.preventDefault();

  deferredPrompt = e;

  return false;
});
