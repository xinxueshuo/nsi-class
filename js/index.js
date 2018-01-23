$(function() {
    // autoRoll
    function autoRoll() {
        // console.log(1);
        var speed = 0,
            $box = $(".scrollBox");

        function auto() {
            speed++;
            if (speed >= $box.height() / 2) {
                speed = 0;
            }
            $box.css({ top: -speed + "px" })
        }
        timer = setInterval(auto, 50);
    }
    autoRoll()
})

$(function() {
    function isLogin() {
        var $login = $("#login")
        if ($.cookie('username') === undefined) {
            $login.text("登录")
        } else {
            $login.text($.cookie('username'))
        }
    }
    isLogin();
})

$(function() {
    $.ajax({
        type: "get",
        async: false,
        data: "",
        dataType : "json",
        contentType: "application/json;charset=UTF-8",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            $(".prepareLesson_title").eq(0).text(msg.data[0].CourseName);
            $(".prepareLesson_subject").eq(0).text(msg.data[0].CourseSubject + "：" + msg.data[0].CourseName)
            $(".ClassBegins").eq(0).text(msg.data[0].ClassBegins)
        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})