define(["jquery", "handlebars", "render"], ($, handlebars, render) => {
    init = (ops) => {
        //获取详情页数据
        $.ajax({
            url: "/api/detail",
            dataType: "json",
            success: (res) => {
                if (res.code === 1) {

                    var data = res.msg;

                    render($("#wrapperTpl").html(), data, ".wrap", true)

                }
            },
            error: function(error) {
                console.warn(error)
            }
        });
        //点击返回上一级
        $(".wrap").on("click", ".back", function() {
            history.go(-1);
        })

        //点击首页返回首页
        $(".wrap").on("click", ".shouye", function() {
            location.href = "/"
        })
    }
    return init;
})