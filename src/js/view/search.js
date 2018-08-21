define(["jquery", "render", "text!listTpl", "bscroll"], ($, render, listTpl, bscroll) => {
    var nameArr = [];
    init = (ops) => {

        //点击back返回上一个页面
        $("#icon-back").on("click", function() {
            history.go(-1);
        });
        //获取热门数据
        $.ajax({
            url: "/api/hot",
            dataType: "json",
            success: (res) => {
                if (res.code === 1) {
                    HotData(res.msg.ads);
                }
            },
            error: function(error) {
                console.warn(error)
            }
        });

        //热门搜索渲染
        HotData = (data) => {
            render($("#hotTpl").html(), data, "#hotlist", true)
        }

        //点击搜索框
        $("#btn-search").on("click", function() {
            //input框的值
            let searchVal = $("#ipt-search").val();
            //隐藏搜索
            $(".tog").hide();
            //显示数据
            $(".searchcontent").show();

            if (searchVal == "") {
                alert("输入不能为空")
            } else {

                let name = searchVal;

                //去重
                var local = nameArr.some(function(v) {
                    return v == searchVal;
                });

                if (!local) {
                    //本地存贮
                    nameArr.push(searchVal);
                }

                localStorage.setItem("nameArr", JSON.stringify({ nameArr: nameArr }))

                //获取择天记数据
                $.ajax({
                    url: `/api/tian?name=${searchVal}`,
                    dataType: "json",
                    success: (res) => {
                        if (res.code === 1 && res.msg) {
                            //择天记数据渲染
                            render($("#tianTpl").html(), res.msg.items, ".searchcontent", true);
                        } else {
                            $(".searchcontent").html("没有这个数据")
                        }
                    },
                    error: function(error) {

                        console.warn(error)
                    }
                });
                //获取诛仙数据
                $.ajax({
                    url: `/api/tian?name=${searchVal}`,
                    dataType: "json",
                    success: (res) => {

                        if (res.code === 1 && res.msg) {
                            //诛仙数据渲染
                            render($("#tianTpl").html(), res.msg.items, ".searchcontent", true);
                        } else {
                            $(".searchcontent").html("没有这个数据")
                        }
                    },
                    error: function(error) {

                        console.warn(error)
                    }
                });
            }

        });
        //历史搜索数据
        let historyData = JSON.parse(localStorage.getItem("nameArr")) || [];
        render($("#historyTpl").html(), historyData.nameArr, "#historylist", false);

        //监听
        $("#ipt-search").on("input", function() {

            let vals = $(this).val();

            if (!vals) {
                $(".searchcontent").hide();
                $(".tog").show();
            }

        })

        //点击书名获取相对应数据
        $(".list").on("click", "li", function() {

            let html = $(this).html();

            $("#ipt-search").val(html);
        })

    }
    return init;
})