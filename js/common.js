$(function() {
    function isLogin() {
        var $login = $("#login"),
            personalClass = $("#personalClass"),
            exit = $("#exit")
        if ($.cookie('username') === undefined) {
            $login.text("登录 / 注册")
            $login.parent().attr("href", "./login.html")
            personalClass.css("display", "none")
            exit.css("display", "none")
        } else {
            $login.text($.cookie('User_TureName'))
            $login.parent().attr("href", "javascript:;")
            exit.css("display", "inline-block")
        }
    }
    isLogin();
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

// 退出登录
$(function() {
    var exit = $("#exit")

    function exitLogin() {
        $.cookie('member_sign', null, { expires: -1, path: '/' });
        $.cookie('username', null, { expires: -1, path: '/' });
        $.cookie('User_TureName', null, { expires: -1, path: '/' });
        $.cookie('userVerifyCode', null, { expires: -1, path: '/' });
        window.location.href = './index.html'
    }

    exit.on("click", function() {
        exitLogin()
    })
})