import React from "react";
import ReactDOM from "react-dom/client";
import { App } from './App';

const rootElt = document.getElementById("root");
ReactDOM.createRoot(rootElt).render(React.createElement(App));
window.onbeforeunload = () => windowi.scrollTo(0, 0);
