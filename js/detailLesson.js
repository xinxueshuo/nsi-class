// 立即购买
$(function() {
    // 课程&用户邮箱
    var ClassId = $('#ClassId').val()

    // 从cookie中
    var data = {
        'ClassId': ClassId,
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
        success :   function(msg) {
            console.log(msg);
            // if(msg.member_sign > 0){
            //     $.cookie('usertitle', msg.member_sign , { expires: 1, path: '/' });
            //     $.cookie('username', msg.username , { expires: 1 ,path: '/'});
            //     $.cookie('User_TureName', msg.User_TureName , { expires: 1 ,path: '/'});
            //     $.cookie('userVerifyCode', msg.UserVerifyCode , { expires: 1 ,path: '/'});
            //     console.log( $.cookie('usertitle'))
            //     console.log( $.cookie('username'))  //邮箱地址
            //     console.log( $.cookie('userVerifyCode'))
            //     console.log( $.cookie('User_TureName'))  //真实姓名
            //     window.location.href = "../other/index.html";
            // }else if(msg.member_sign == -2){
            //     $('#errPassword').modal({
            //         keyboard: true //用户密码错误
            //     })
            // }else if(msg.member_sign == -1){
            //     $('#emailNoPass').modal({  //邮箱没有激活
            //         keyboard: true
            //     })
            // }else if(msg.member_sign == 0){
            //     $('#waitForPass').modal({   //账号没有审核
            //         keyboard: true
            //     })
            // }
        },
        error: function() {
            alert('用户名或密码错误，请求数据失败！');
        }
    });
})