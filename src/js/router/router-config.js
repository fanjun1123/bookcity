define(["get", "render"], (get, render) => {

    let routerObj = {};

    routerObj.start = (ctx, next) => {

        ctx.res = {};

        next();
    }

    //书城
    routerObj.showBookcity = (ctx, next) => {

            Promise.all([get("/view/index.html"), get("/view/bookcity.html")])

            .then((result) => {

                $(".wrap").html(result[0]);

                $(".content").html(result[1])

                ctx.res.script = "bookcity";

                ctx.res.id = 0;

                next();
            })
        }
        //书架
    routerObj.showBookrack = (ctx, next) => {

            Promise.all([get("/view/index.html"), get("/view/bookrack.html")])

            .then((result) => {

                $(".wrap").html(result[0]);

                $(".content").html(result[1])

                ctx.res.script = "bookrack";

                ctx.res.id = 1;

                next();
            }).catch((error) => {
                console.warn(error)
            })
        }
        //详情
    routerObj.showDetail = (ctx, next) => {

            get("/view/detail.html").then(function(res) {

                    $(".wrap").html(res)

                    ctx.res.script = "detail";

                    next();

                })
                .catch((error) => {

                    console.warn(error)
                })
        }
        //搜索
    routerObj.showSearch = (ctx, next) => {

            get("/view/search.html").then(function(res) {

                    $(".wrap").html(res)

                    ctx.res.script = "search";

                    next();

                })
                .catch((error) => {

                    console.warn(error)
                })
        }
        //no found
    routerObj.showNot = (ctx) => {

        get("/view/not-found.html").then(function(res) {
                $(".wrap").html(res)
            })
            .catch((error) => {
                console.warn(error)
            })
    }

    routerObj.render = (ctx) => {
        require([ctx.res.script], (cb) => {
            cb(ctx.res)
        })
    }

    return routerObj;

});