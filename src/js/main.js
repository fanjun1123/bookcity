require.config({
    baseUrl: "/js/",
    paths: {

        //库文件
        "jquery": "./libs/jquery-2.1.1.min",
        "bscroll": "./libs/better-scroll",
        "swiper": "./libs/swiper-4.2.2.min",
        "handlebars": "./libs/handlebars-v4.0.11",
        "page": "./libs/page",
        "text": "./libs/text",

        //路由
        "index": "./router/index",
        "routerConfig": "./router/router-config",

        //common
        "render": "./common/render",
        "get": "./common/get",

        //模板
        "listTpl": "../view/tpl/listTpl.html",

        //视图js
        "bookcity": "./view/bookcity",
        "bookrack": "./view/bookrack",
        "detail": "./view/detail",
        "search": "./view/search"
    }
});
require(["index"]);