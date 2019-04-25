// Install Service Worker and PushManager
if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('[ServiceWorker] ServiceWorker and Push is supported');

    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('[ServiceWorker] Registration successful: ', registration);
            }, function(err) {
                console.log('[ServiceWorker] Registration failed: ', err);
            });
    });

} else {
    console.warn('[ServiceWorker] Push messaging is not supported');
    pushButton.textContent = '[ServiceWorker] Push Not Supported';
}


// Suscribe for Push-UP's ask for after 10s
setTimeout(function() {
    (function(d, t) {
        var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
        g.src = "https://cdn.pushalert.co/integrate_3c3b7df02e6f9cccf523640784ef0104.js";
        s.parentNode.insertBefore(g, s);
    }(document, "script"));
    setTimeout(function() {
        PushAlertCo.clearPAFirstTime(false);
        PushAlertCo.forceSubscribe();
    }, 2500);
    console.log('[Push Notification] Registrated');
}, 10000);


// Zeigt eine Benachrichtigung an
/* function showNotification(message) {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration()
            .then(function(reg) {
                var options = {
                    body: message,
                    icon: 'templates/zh11/res/logos/logo.png',
                    vibrate: [100, 50, 100],
                    data: {
                        primaryKey: 1
                    },
                    actions: [{
                        action: 'explore',
                        title: 'Zur Webseite'
                    }]
                };
                reg.showNotification('Cevi Züri 11', options);
            });
    }
}
*/
