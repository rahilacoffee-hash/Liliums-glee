import axiosInstance from "./axiosInstance";

const listeners = new Set();
let eventSource = null;

function getStreamUrl() {
  const configuredBase = axiosInstance.defaults.baseURL || (import.meta.env.PROD ? "/api" : "");
  const base = configuredBase.replace(/\/+$/, "");
  return `${base}/notification/stream`;
}

function handleNotification(event) {
  let notification;

  try {
    notification = JSON.parse(event.data);
  } catch (error) {
    console.error("Unable to parse admin notification event:", error);
    return;
  }

  listeners.forEach((listener) => listener(notification));
}

function ensureConnection() {
  if (eventSource || typeof window === "undefined" || !("EventSource" in window)) {
    return;
  }

  eventSource = new EventSource(getStreamUrl(), { withCredentials: true });
  eventSource.addEventListener("notification", handleNotification);
  eventSource.onerror = () => {
    // EventSource automatically reconnects. Existing REST polling remains as
    // a fallback for browsers/proxies where the stream cannot stay connected.
  };
}

export function subscribeToAdminNotifications(listener) {
  if (typeof listener !== "function") return () => {};

  listeners.add(listener);
  ensureConnection();

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };
}
