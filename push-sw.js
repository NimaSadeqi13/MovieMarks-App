// Imported into the generated PWA service worker. Empty-payload pushes reveal
// no private account content to the browser push provider or lock screen.
self.addEventListener('push', (event) => {
  event.waitUntil(self.registration.showNotification('MovieMarks', {
    body: 'You have a new notification. Open your inbox to see it.',
    icon: `${self.registration.scope}icon-192.png`,
    badge: `${self.registration.scope}icon-192.png`,
    tag: 'moviemarks-inbox',
    renotify: true,
    data: { url: `${self.registration.scope}?inbox=1` }
  }));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || `${self.registration.scope}?inbox=1`;
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const existing = windows.find((client) => client.url.startsWith(self.registration.scope));
    if (existing) {
      await existing.navigate(url);
      return existing.focus();
    }
    return self.clients.openWindow(url);
  })());
});
