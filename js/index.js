$(function() {
    function isLogin() {
        var $login = $("#login")
        if ($.cookie('username') === undefined) {
            $login.text("请登录 / 注册")
        } else {
            $login.text($.cookie('User_TureName'))
        }
    }
    isLogin();
})

// 轮播
$(function() {
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            disableOnInteraction: false,
        },
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
})

// 回到顶部
$(function() {
    var backtoTop = $("#backtoTop")
    $(window).scroll(function() {
        var sc = $(window).scrollTop();
        if (sc > 0) {
            backtoTop.fadeIn(200)
        } else {
            backtoTop.fadeOut(200)
        }
    })

    backtoTop.on("click", function() {
        $('body,html').animate({ scrollTop: 0 }, 500);
    })
})

$(function() {
    var flag = true,
        aBox = $(".lecturer")
    $(window).scroll(function() {
        if (flag) {
            var sc = $(window).scrollTop();
            if (sc >= 1700) {
                for (var i = 0; i < aBox.length; i++) {
                    aBox.eq(i).css("visibility", "visible")
                    aBox.eq(i).css("animation-delay", i / 5 + "s").addClass("animated fadeInUp")
                }
                flag = false;
            }
        }
    })
})


$(function() {
    var CourseContainer = $("#CourseContainer")
    $.ajax({
        type: "get",
        async: false,
        data: "",
        dataType : "json",
        contentType: "application/json;charset=UTF-8",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            // console.log(msg.data)
            for (var i = 0; i < 4; i++) {
                CourseContainer.append(`
                        <div class="col-md-3 col-sm-6">
                            <div class="CourseContainer">
                                <a href="javascript:;" target="_">
                                    <div class="Course Course-up">
                                        <img src="${msg.data[i].CoverImage}" alt="">
                                        <div class="state">${msg.data[i].CourseState}</div>
                                    </div>
                                    <div class="Course Course-mid"><img src="${msg.data[i].CoverImage}" alt=""></div>
                                    <div class="Course Course-down"><img src="${msg.data[i].CoverImage}" alt=""></div>
                                </a>
                                <div class="CourseInfo">
                                    <p class="mtb5 oneline"><span class="CourseName">${msg.data[i].CourseName}</span></p>
                                    <p class="mtb5 twoline"><span class="CourseDesc" title="${msg.data[i].CourseDescription}">${msg.data[i].CourseDescription}</span></p>
                                    <p class="mtb5">开课时间：<span class="CourseTime">${msg.data[i].ClassBegins}</span></p>
                                </div>
                            </div>
                        </div>
                    `)
            }
            var aState = $(".state")
            for (var i = 0; i < aState.length; i++) {
                switch (aState.eq(i).text()) {
                    case "查看回放":
                        aState.eq(i).addClass("viewBack")
                        break;
                    case "正在直播":
                        aState.eq(i).addClass("new animated tada infinite")
                        break;
                    case "备课中":
                        aState.eq(i).addClass("makepreparations")
                        break;
                }
            }

            var aCourse = $("#CourseContainer").children()
            aCourse.on("click", function() {
                var courseId = msg.data[$(this).index()].Id
                window.location = "./detailClass.html?Id=" + courseId
            })

        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})