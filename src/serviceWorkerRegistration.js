import { registerSW } from 'virtual:pwa-register';

export default function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        registerSW({
            updateViaCache: 'imports',
            ready() {
                console.log('Service worker is active.');
            },
            registered() {
                console.log('Service worker has been registered.');
            },
            updated() {
                console.log('New content is available; please refresh.');
            },
            offlineReady() {
                console.log('Ready for offline use.');
            },
            onNeedRefresh() {
                if (confirm('Please refresh.')) {
                    window.location.reload();
                }
            }
        });
    } else {
        console.error('Service workers are not supported.');
    }
}
