let bookcityData = require("./data/bookcity.json");
let searchHotData = require("./data/search-hot.json");
let searchTianData = require("./data/search-tian.json");
let searchZhuData = require("./data/search-zhu.json");
let detailData = require("./data/352876.json");

let resObj = {
    "/api/bookcity": bookcityData,
    "/api/hot": searchHotData,
    "/api/tian?name=择天记": searchTianData,
    "/api/tian?name=诛仙": searchZhuData,
    "/api/detail": detailData
}

module.exports = (url) => {
    if (resObj[url]) {
        return resObj[url]
    } else {
        return null;
    }
}