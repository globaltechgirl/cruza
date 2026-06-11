import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import App from "@/App.tsx";
import "@/index.css";
import { AuthProvider } from "@/component/layout/authContext";

const stripUrlQuery = () => {
  const { pathname } = window.location;
  if (window.location.search) {
    window.history.replaceState({}, "", pathname);
  }
};

const originalPushState = window.history.pushState;
window.history.pushState = function (...args) {
  const [state, title, url] = args;
  if (typeof url === "string") {
    const cleanUrl = url.split("?")[0];
    return originalPushState.call(this, state, title, cleanUrl);
  }
  return originalPushState.apply(this, args);
};

const originalReplaceState = window.history.replaceState;
window.history.replaceState = function (...args) {
  const [state, title, url] = args;
  if (typeof url === "string") {
    const cleanUrl = url.split("?")[0];
    return originalReplaceState.call(this, state, title, cleanUrl);
  }
  return originalReplaceState.apply(this, args);
};

window.addEventListener("popstate", stripUrlQuery);

stripUrlQuery();

// Set a CSS variable --vh equal to 1% of the viewport height
// This helps avoid mobile browser chrome (address bar) causing 100vh to be larger
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setVh();
let vhTimeout: any;
window.addEventListener("resize", () => {
  clearTimeout(vhTimeout);
  vhTimeout = setTimeout(setVh, 150);
});
window.addEventListener("orientationchange", () => setTimeout(setVh, 200));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

