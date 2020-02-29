var state = {
    searchList: [],
    searchText: ""
}

var SearchData = {
    load: () => {
        return m.request({
            method: "GET",
            url: "https://www.boardgamegeek.com/xmlapi2/search?query=" + state.searchText,
            withCredentials: false,
            responseType: "document"
        })
        .then((result) => {
            state.searchList = [];
            var items = result.getElementsByTagName("item");
            var maxCount = items.length > 20 ? 20 : items.length;
            if (items.length == 0) {
                return;
            }
            for(var i=0; i< maxCount; i++) {
                state.searchList.push({
                    name: items[i].getElementsByTagName("name")[0].getAttribute("value"),
                    year: items[i].getElementsByTagName("yearpublished")[0]?.getAttribute("value"),
                    id: items[i].getAttribute("id")
                });
            }
        });
    }
}


const SEARCH = {
    view: function() {
        return m("div", { class: "ui container main-container" }, [
            m("div", { class: "ui fluid left action icon input" }, [
                m("button", { class: "ui button icon", onclick: function() {
                    if (state.searchText) {
                        SearchData.load();
                    }
                }}, [
                    m("i", { class: "search icon" })
                ]),
                m("input", { type: "text", placeholder: "Search a game", value: state.searchText, oninput: function(event) {
                    state.searchText = event.target.value;
                }})
            ]),
            m("div", { class:"ui middle aligned divided list" }, state.searchList.map((item) => {
                return m("div", { class: "item" }, [
                    m("div", { class:"right floated aligned content" }, [
                        m("a", { class: "ui icon button", href: "https://www.boardgamegeek.com/boardgame/" + item.id, target:"_blank" }, "Go to BGG")
                    ]),
                    m("div", { class:"middle aligned content" }, [
                        m("div", { class:"header" }, item.name),
                        m("div", { class:"description" }, item.year)
                    ])         
                ])
            }))
        ]);
    }
}
export default SEARCH;