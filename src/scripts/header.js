const FOOTER = {
    view: function() {
        return m("div", { class:"ui top fixed orange inverted big labeled menu" }, [
            m("a", { class: "item" }, "Boardgamesson")
        ])
    }
}

const HEADER = {
    view: function() {
        return m("div", { class: "ui bottom fixed orange inverted big fluid two item icon menu" }, [
            m("a", { class: m.route.get() === "/" ? "item active" : "item", href:"#!/" }, [
                m("i", { class: "home icon" })
            ]),
            m("a", { class: m.route.get() === "/search" ? "item active" : "item", href:"#!/search" }, [
                m("i", { class: "search icon" })
            ])
        ])
    }
};
export {HEADER, FOOTER};