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
    $.ajax({
        type: "POST",
        dataType: "json",
        data: data,
        url: 'http://' + changeUrl.address + '/Class_User_api?whereFrom=Verification',
        success: function(msg) {
            if (msg.msg < 0) {
                alert("请先购买该课程")
                window.location.href = "./index.html"
            }
        },
        error: function() {
            console.log("error")
        }
    })
})

$(function() {
    var obj = $("#obj"),
        mobile = $("#mobile"),
        data = {
            'userid': $.cookie('username')
        }
    $.ajax({
        type: "post",
        data: data,
        dataType: "json",
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
})