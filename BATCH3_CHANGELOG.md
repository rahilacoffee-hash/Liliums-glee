# Liliums Glee V1 — Batch 3 changelog

## Frontend changes

- `src/component/services/ServiceRow.jsx`: avoids rendering an image element when `service.image` is empty or whitespace; preserves the existing two-column layout with a neutral surface, adds lazy loading/async decoding, and safely handles absent `features` arrays.
- `src/component/layout/Loader/LuxuryLoader.jsx`: replaces the loader's Framer Motion dependency with CSS animations while preserving its existing visual language.
- `src/App.jsx`: removes the root-level Framer Motion `AnimatePresence` dependency used only by the initial loader.
- `src/admin/dashboard/Dashboard.jsx`: lazy-loads the chart components.
- `src/admin/dashboard/DeferredChart.jsx`: defers chart mounting until the chart approaches the viewport, so Recharts is not requested just by entering the admin dashboard.
- `src/api/adminNotificationStream.js`: creates one shared credentialed EventSource connection for mounted admin subscribers, using the configured Axios API base URL.
- `src/admin/layout/AdminNavbar.jsx`: updates the unread badge immediately on pushed notifications, displays a toast, and retains 30-second REST reconciliation as a fallback.
- `src/Pages/Notificationspage.jsx`: refreshes the visible notification list when a pushed notification arrives and corrects the prior fetch callback declaration/dependency warnings.

## Backend changes required for real-time delivery

- `utils/adminNotificationStream.js`: in-process fan-out for connected admin SSE clients.
- `utils/Createnotification.js`: publishes a notification only after MongoDB successfully persists it.
- `controllers/Notification.controller.js`: adds the SSE stream handler with heartbeat, reconnect hint and cleanup.
- `route/Notification.route.js`: exposes `GET /api/notification/stream` behind the existing `auth` and `adminOnly` middleware.
- `controllers/Review.controller.js`: creates an admin notification when a new product review is successfully stored.

Existing order and consultation notification producers already use `createNotification`, so they now publish to connected admin browsers automatically. No new dependency or environment variable is required.

## Verification

- Frontend production build: passed; Vite 8.1.4; 3,009 modules transformed.
- ESLint: last completed full `src` run reported 30 warnings and 0 errors (Batch 2 baseline: 32 warnings, 0 errors). Warnings are pre-existing outside the changed files; changed frontend files passed targeted ESLint with no warnings.
- Backend changed-file `node --check`: passed.
- SSE publisher and stream lifecycle smoke test: passed with mocked response objects.
- No live database, deployed Render service, Vercel proxy or browser end-to-end test was available; those remain to be verified after backend deployment.

## Deployment notes and limitations

- Deploy the Server archive to the existing Render backend before expecting live notifications in production.
- Deploy the Client archive to Vercel after the backend is updated.
- The stream is authenticated using the existing access-token cookie and existing admin role middleware.
- The fan-out registry is process-local. It supports a single backend process/instance. If Render is configured with multiple instances or multiple Node workers, add shared pub/sub (e.g. Redis) or MongoDB change-stream fan-out before relying on cross-instance delivery.
- REST unread-count polling remains as a fallback if a browser or proxy cannot maintain SSE.
- No production deployment or database write was performed by this work.
