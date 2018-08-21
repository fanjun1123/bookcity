define(["jquery", "handlebars", "render", "text!listTpl", "bscroll", "swiper"], ($, handlebars, render, listTpl, bscroll, swiper) => {

    init = (ops) => {

        //底部线
        let id = ops.id;

        if (id == 0) {
            $('.line').removeClass('move');
            $('header a').eq(id).addClass('active').siblings().removeClass('active');
        }
        //bscroll
        let myScroll = new bscroll(".con", {
            probeType: 2,
            click: true
        });
        //点击跳转搜索界面
        $(".false-search").on("click", function() {
                location.href = "/search"
            })
            //获取bookcity数据
        $.ajax({
            url: "/api/bookcity",
            dataType: "json",

            success: (res) => {

                if (res.code === 1) {

                    let data = res.msg.items;

                    renderData(data);

                }
            },
            error: function(error) {

                console.warn(error)
            }
        });

        let renderData = (data) => {
            //swiper数据
            let swiperData = data[0].data.data.filter((item) => {
                return item.size != 0
            });
            //渲染swiper
            render($("#swiper-Tpl").html(), swiperData, '.index-wrapper', true);

            //轮播
            let mySwiper = new swiper(".index-banner", {
                loop: true,
                autoplay: true
            });

            //分类数据
            let TypesData = data[0].data.data.filter((item) => {
                return item.size == 0
            });
            //渲染分类列表
            render($("#types-Tpl").html(), TypesData, '.index-types', true);
            myScroll.refresh();

            //本周最火数据
            let hotListData = data[1].data.data;
            //渲染本周最火数据
            render($("#hot-list-Tpl").html(), hotListData, '.hot-list', true);
            myScroll.refresh();
            //重磅推荐数据
            let heightListData = data[2].data.data;
            let total = Math.ceil(heightListData.length / 6);
            let heightArr = [];
            for (var i = 0; i < total; i++) {
                heightArr.push(heightListData.splice(0, 5))
            }
            //渲染重磅推荐
            render($("#height-list-Tpl").html(), heightArr[0], '.height-list-in', true);
            myScroll.refresh();
            //点击换一换
            let nums = 0;
            $("#heightGet").on("click", function() {
                if (nums >= 4) {
                    nums = 0;
                } else {
                    nums++;
                    render($("#height-list-Tpl").html(), heightArr[nums], '.height-list-in', true);
                    myScroll.refresh();
                }
            });
            //女生最爱数据
            let girlData = data[3].data.data;
            let total1 = Math.ceil(girlData.length / 5);
            let heightArr1 = [];
            for (var i = 0; i < total1; i++) {
                heightArr1.push(girlData.splice(0, 5))
            }
            //渲染女神最爱
            render(listTpl, heightArr1[0], "#girllove", true);
            myScroll.refresh();

            //点击换一换
            let nums1 = 0;
            $("#girlGet").on("click", function() {
                if (nums1 >= 2) {
                    nums1 = 0;
                } else {
                    nums1++;
                    render(listTpl, heightArr1[nums1], "#girllove", true);
                    myScroll.refresh();
                }
            });


            //男生最爱数据
            let boyData = data[4].data.data;
            let total2 = Math.ceil(boyData.length / 5);
            let heightArr2 = [];
            for (var i = 0; i < total2; i++) {
                heightArr2.push(boyData.splice(0, 5))
            }
            //渲染男生最爱
            render(listTpl, heightArr2[0], "#boylove", true);
            myScroll.refresh();

            //点击换一换
            let nums2 = 0;
            $("#boyGet").on("click", function() {
                if (nums2 >= 2) {
                    nums2 = 0;
                } else {
                    nums2++;
                    render(listTpl, heightArr2[nums2], "#boylove", true);
                    myScroll.refresh();
                }
            });
        }



















        //上拉刷新 下拉加载
        var _content = $(".con");

        myScroll.on("scroll", function() {

            if (this.y < this.maxScrollY - 54) {
                _content.attr("up", "上拉加载")
            } else if (this.y < this.maxScrollY - 22) {
                _content.attr("up", "释放加载更多")
            } else {
                _content.attr("down", "释放刷新")
            }

        })
        myScroll.on("touchEnd", function() {
            if (_content.attr("up") === "上拉加载") {
                console.log("上拉加载")
            } else if (_content.attr("down") === "释放刷新") {
                console.log("下拉刷新")
            }
        })

















    }
    return init;
})