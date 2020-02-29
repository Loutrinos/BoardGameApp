import { routes } from "./router.js";
import { googleAPI } from "./home.js";

var root = document.body;
m.route(root, '/', routes)

window.googleAPI = googleAPI;