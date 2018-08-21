require(["page", "get", "render", "routerConfig"], (page, get, render, routerConfig) => {

    page("*", routerConfig.start)
        //主页
    page("/", "/index/bookcity")
        //详情页
    page("/detail/:id", routerConfig.showDetail)
        //书城
    page("/index/bookcity", routerConfig.showBookcity)
        //书架
    page("/index/bookrack", routerConfig.showBookrack)
        //搜索
    page("/search", routerConfig.showSearch)
        //找不到页面
    page("*", routerConfig.render)
        //开启单页面
    page()

});