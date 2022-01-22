/* eslint-disable no-restricted-globals */
function receivePushNotification(event) {
    const { title, body, image, icon, badge } = event.data.json();
  
    const options = {
      title: title,
      body: body,
      vibrate: [200, 100, 200],
      icon: icon,
      badge: badge,
      image: image,
    };
    event.waitUntil(self.registration.showNotification(title, options));
  }

  
  self.addEventListener("push", receivePushNotification);

  
