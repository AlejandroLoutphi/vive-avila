import React from "react";
import ReactDOM from "react-dom/client";
import { App } from './App';

const rootElt = document.getElementById("root");
ReactDOM.createRoot(rootElt).render(React.createElement(App));
window.onbeforeunload = () => window.scrollTo(0, 0);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
