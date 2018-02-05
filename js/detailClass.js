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
                console.log("Buy:" + msg)
            }
        })
    })
}
// buyNow()

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
                    $login.text("请登录 / 注册")
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


$(function() {
    //获取url地址问号后面部分
    function getQueryStringArgs() {
        var qs = location.search.length > 0 ? location.search.substring(1) : '',
            args = {},
            items = qs.length ? qs.split('&') : [],
            item = null,
            name = null,
            value = null,
            i = 0,
            len = items.length;
        for (i = 0; i < len; i++) {
            item = items[i].split('=');
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            name = item[0];
            value = item[1];

            if (name.length) {
                args[name] = value;
            }
        }
        return args;
    }
    var args = getQueryStringArgs(),
        Id = decodeURIComponent(args['Id'])

    function lessonDsec() {
        var $tab01 = $("#tab01"),
            $tab02 = $("#tab02"),
            $tab03 = $("#tab03"),
            $tab04 = $("#tab04")
        $.ajax({
            type: "get",
            dataType: 'json',
            contentType: "application/json;charset=UTF-8",
            data: {
                "Id": Id
            },
            url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Course_GetHtml',
            success(msg) {
                // console.log(msg)
                $tab01.html(msg.data[0].Html01)
                $tab02.html(msg.data[0].Html02)
                $tab03.html(msg.data[0].Html03)
                $tab04.html(msg.data[0].Html04)
            }
        })
    }
    lessonDsec()
    $.ajax({
        type: "get",
        dataType: "json",
        data: { Id: Id },
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            // console.log(msg.data[0])
            $("#CourseName").text(msg.data[0].CourseName);
            $("#ClassBegins").text(msg.data[0].ClassBegins);
            $("#CoursePrice").text(msg.data[0].CoursePrice)
        }
    })


    //立即购买

    function buy() {
        var buyNow = $("#buyNow")
        if ($.cookie('username') !== undefined) {
            buyNow.on("click", function() {
                // console.log($.cookie('username'))
                var data = {
                    'UserMail': $.cookie('username'),
                    'Id': Id
                }
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: data,
                    url: 'http://' + changeUrl.address + '/Payment_api?whereFrom=WeChatPayment',
                    success: function(msg) {
                        console.log(msg.CoursePrice)
                        $("#orderDesc-price").text(msg.CoursePrice)
                        $("#qrCode").css("background-image", "url(" + msg.data + ")")
                    },
                    error: function() {
                        console.log("error")
                    }
                })
            })
        } else {
            buyNow.on("click", function() {
                alert("请先登录")
                window.location.href = "./login.html"
                return false;
            })
        }

    }
    buy()
})