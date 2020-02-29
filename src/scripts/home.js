const spreadSheetId = "1RxYWvoE4pe28p_DkMZiTiAKrDfxQgcdrtpknj9PoBGk";

const googleAPI = {
    load: function() {
        var CLIENT_ID = "client-id";
        var API_KEY = "api-key";
        var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
        var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

        gapi.load('client:auth2', initClient);

        function initClient() {
            gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
            }).then(function () {
                googleAPI.fetchUsers();
            }, function(error) {
                appendPre(JSON.stringify(error, null, 2));
            });
        }
    },
    fetchUsers: function() {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: spreadSheetId,
            range: "Users!2:50"
        }).then((response) => {
            console.info("BoardGameApp || init success");
            googleAPI.data = response.result.values;
            m.request({
                method: "GET",
                url: "https://www.boardgamegeek.com/xmlapi2/thing",
                params: {
                    id: googleAPI.data.map(row => row[1]).join()
                },
                withCredentials: false,
                responseType: "document"
            })
            .then(function(result) {
                console.log(result);
                Array.from(result.getElementsByTagName("item")).map(item => {
                    googleAPI.gameData.push({
                        id: item.getAttribute("id"),
                        url: item.getElementsByTagName("thumbnail")[0].textContent,
                        bigurl: item.getElementsByTagName("image")[0].textContent,
                        name: item.getElementsByTagName("name")[0].getAttribute("value"),
                        description: item.getElementsByTagName("description")[0].textContent,
                        min: item.getElementsByTagName("minplayers")[0].getAttribute("value"),
                        max: item.getElementsByTagName("maxplayers")[0].getAttribute("value"),
                        minplay: item.getElementsByTagName("minplaytime")[0].getAttribute("value"),
                        maxplay: item.getElementsByTagName("maxplaytime")[0].getAttribute("value"),
                    })
                });
                console.info("BoardGameApp || Data loaded");   
                const event = new Event("dataLoaded");
                document.dispatchEvent(event);
            })
        });
    },
    data: [],
    gameData: []
}

const HOME = {
    onload: googleAPI.load(),
    view: function() {
        return m("div", { class: "main-container" } , [
            m("h1", "Upcoming Game Sessions"),
            m("div", { class: "ui segment" }, [
                m("div", { class: "ui relaxed divided list big selection" }, googleAPI.gameData.map((item, index) => {
                    return m("a", { class: "item", href: "#!/games/" + item.id }, [
                        m("img", { class: "ui avatar image", src: item.url }),
                        m("div", { class: "content" }, [
                            m("a", { class: "header" }, item.name),
                            m("div", { class: "date" }, "Game Session: " + new Date(googleAPI.data[index][2]).getDate() + "/" + (new Date(googleAPI.data[index][2]).getMonth() + 1) + "/" + new Date(googleAPI.data[index][2]).getFullYear())
                        ])
                    ])
                }))
            ])
        ])
    }
}

export { HOME, googleAPI };