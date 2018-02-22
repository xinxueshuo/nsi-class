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
        Id = decodeURIComponent(args['Id']),
        data = {
            'UserMail': $.cookie('username'),
            'ClassId': Id
        }
    var screenWidth = $(window).width()
    var screenHeight = $(window).height()
    if (screenWidth < 768) {
        $('#mobileHeight').attr('height', screenHeight)
        $('.mobile').removeClass('bg-wrap container row col-lg-12 col-md-12 col-sm-12 Pd150')
        $('.mbHide').addClass('hide')
    }
    $.ajax({
        type: "POST",
        dataType: "json",
        data: data,
        async: true,
        url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
        success: function(msg) {
            if ($.cookie('username') === undefined) {
                alert("请先登录")
                window.location.href = "./login.html"
            } else {
                if (msg.msg <= 0) {
                    alert("请先购买该课程")
                    window.location.href = "./detailClass.html?Id=10001"
                } else {
                    var obj = $("#mobileHeight"),
                        mobile = $("#mobile"),
                        data01 = {
                            'userid': $.cookie('username')
                        }
                    $.ajax({
                        type: "post",
                        data: data01,
                        dataType: "json",
                        async: true,
                        url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=getLiveUrl',
                        success: function(msg) {
                            console.log(msg)
                            obj.attr("data", "https://live.polyv.cn/watch/149406?" + msg.msg)
                            mobile.attr("href", "https://live.polyv.cn/watch/149406?" + msg.msg)
                        },
                        error: function() {
                            console.log("error")
                        }
                    })
                }
            }
        },
        error: function() {
            console.log("error")
        }
    })

})
$(function() {
    var quit = $("#quit")

    function exitLogin() {
        $.cookie('member_sign', null, { expires: -1, path: '/' });
        $.cookie('username', null, { expires: -1, path: '/' });
        $.cookie('User_TureName', null, { expires: -1, path: '/' });
        $.cookie('userVerifyCode', null, { expires: -1, path: '/' });
        window.location.href = './index.html'
    }

    quit.on("click", function() {
        exitLogin()
    })
})