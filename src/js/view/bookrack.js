define(["jquery", "handlebars", "render", "text!listTpl", "bscroll"], ($, handlebars, render, listTpl, bscroll) => {

    init = (ops) => {

        let id = ops.id;

        if (id == 1) {
            $('header a').eq(id).addClass('active').siblings().removeClass('active');
        }

        $.ajax({
            url: "/api/bookcity",
            dataType: "json",
            success: function(res) {

                if (res.code === 1) {

                    let data = res.msg.items;

                    renderData(data)

                }
            },
            error: function(error) {
                console.warn(error)
            }
        });

        //bscroll
        let myScroll = new bscroll(".content", {
            probeType: 2,
            click: true
        });
        //点击切换样式
        $("#click").on("click", function() {
            $(this).toggleClass("active");
            $(".bookracklist").toggleClass("list");
        })

        //渲染数据
        renderData = (data) => {
                //返回的数据
                let hotData = data[3].data.data;
                //渲染页面
                render($("#bookracklist-Tpl").html(), hotData, ".bookracklist", true)
            }
            //点击跳转搜索界面
        $("#searchIpt").on("click", function() {
            location.href = "/search"
        })


    }
    return init;
})