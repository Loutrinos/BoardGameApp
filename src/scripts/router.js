import SEARCH from "./search.js";
import { HOME } from "./home.js";
import mainLayout from "./layout.js";
import { GAME_PAGE } from "./gamePage.js";

var Game = {
    load: function() {
        return m.request({
            method: "GET",
            url: "https://www.boardgamegeek.com/xmlapi2/thing",
            params: {
                id: 13
            },
            withCredentials: false,
            responseType: "document"
        })
        .then(function(result) {
            Game.list = {
                name: result.getElementsByTagName("name")[0].getAttribute("value"),
                image: result.getElementsByTagName("image")[0].childNodes[0].nodeValue
            };
        })
    },
    list: []
}

const Catan = {
    oninit: Game.load,
    view: function() {
        return m("p", Game.list.name, [
            m("img", { src: Game.list.image, width: 200})
        ])
    }
}

export const routes = {
    '/': mainLayout(HOME),
    '/catan': mainLayout(Catan),
    "/search": mainLayout(SEARCH),
    "/games/:game": mainLayout(GAME_PAGE)
  };