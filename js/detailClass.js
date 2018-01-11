function buyNow() {
    var $buyNow = $("#buyNow")
    $buyNow.on("click", function() {
        var data = {
            'ClassId': $("#ClassId").text(),
            'UserMail': $.cookie('username')
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: data, //提交的参数
            url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=BuyClass',
            dataType: "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success: function(msg) {
                console.log(1)
            }
        })
    })
}
buyNow()

function watchNow() {
    var $watchNow = $("#watchNow")
    $watchNow.on("click", function() {
        var data = {
            'userid': $.cookie('username')
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: data, //提交的参数
            url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=getLiveUrl',
            dataType: "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success: function(msg) {
                // console.log(msg.msg)
                var $login = $("#login")
                if ($.cookie('username') === undefined) {
                    $login.text("未登录")
                } else {
                    window.location.href = "https://live.polyv.cn/watch/149406?" + msg.msg
                }
            }
        })
    })
}
watchNow()

function isLogin() {
    var $login = $("#login")
    if ($.cookie('username') === undefined) {
        $login.text("登录")
    } else {
        $login.text($.cookie('username'))
    }
}
isLogin();

function lessonDsec() {
    var $tab01 = $("#tab01"),
        $tab02 = $("#tab02"),
        $tab03 = $("#tab03"),
        $tab04 = $("#tab04")
    $.ajax({
        type: "post",
        async: false,
        dataType: 'jsonp',
        jsonp: 'Callback',
        data: {
            "Id": $("#ClassId").text()
        },
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Course_GetHtml',
        success(msg) {
            // console.log(msg[0].Html01)
            $tab01.html(msg[0].Html01)
            $tab02.html(msg[0].Html02)
            $tab03.html(msg[0].Html03)
            $tab04.html(msg[0].Html04)
        }
    })
}
lessonDsec()