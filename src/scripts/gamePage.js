import { googleAPI } from "./home.js";

const GAME_PAGE = {
    oninit: function() {
        GAME_PAGE.param = m.route.param("game");
        document.addEventListener("dataLoaded", GAME_PAGE.load);
        if (googleAPI.data.length > 0) {
            GAME_PAGE.load();
        }
    },
    view: function() {
        if (googleAPI.data.length > 0) {
            return m("div", { class: "main-container" }, [
                m("div", { class: "ui segment raised" }, [
                    m("a", { class: "ui top right attached label inverted orange" }, [
                        m("i", { class: "clock icon" })
                    ], GAME_PAGE.data[0].minplay + " - " + GAME_PAGE.data[0].maxplay, [
                        m("div", { class: "detail" }, "min")
                    ]),
                    m("span", { class: "ui header" }, [
                        m("a", { href: "https://www.boardgamegeek.com/boardgame/" + GAME_PAGE.data[0].id, target: "_blank" }, GAME_PAGE.data[0].name)
                    ]),
                    m("table", { class: "ui celled table structured striped unstackable" }, [
                        m("thead", [
                            m("tr", [
                                m("th", { colspan: GAME_PAGE.players.length }, "Players")
                            ])
                        ]),
                        m("tbody", [
                            m("tr", GAME_PAGE.players.map((player) => {
                                return m("td", player);
                            }))
                        ])
                    ]),
                    m("div", { class: "ui very relaxed items" }, [
                        m("div", { class: "item" }, [
                            m("div", { class: "ui image medium" }, [
                                m("img", { src: GAME_PAGE.data[0].bigurl })
                            ]),
                            m("div", { class: "ui content" }, [
                                m("h2", { class: "title" }, "Description"),
                                m("div", { class: "content" }, [
                                    m("p", unescape(GAME_PAGE.data[0].description))
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        }
    },
    load: function() {
        GAME_PAGE.info = [];
        GAME_PAGE.info = googleAPI.data.filter(item => item[1] === GAME_PAGE.param);
        GAME_PAGE.data = [];
        GAME_PAGE.data = googleAPI.gameData.filter(item => item.id === GAME_PAGE.param);
        GAME_PAGE.players = GAME_PAGE.info[0].filter((item, index) => index > 2 );
    },
    info: [],
    data: [],
    param: "",
    players: []
}

export { GAME_PAGE };