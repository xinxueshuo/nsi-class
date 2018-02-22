// 登录
$(function() {
    function userLogin() {
        var username = $('#username').val()
        var password = $('#password').val()
        var data = {
            'username': username,
            'pwd': password
        }
        $.ajax({
            type: "get",
            async: false,
            traditional: true,
            data: data, //提交的参数
            url: 'http://' + changeUrl.address + '/User_api?whereFrom=login',
            dataType :   "jsonp", //数据类型为jsonp  
            jsonp:   "Callback", //服务端用于接收callback调用的function名的参数  
            success :   function(msg) {
                console.log(msg);
                var tips = $("#tipsTxt"),
                    error_tips = $("#error_tips")
                if (msg.member_sign > 0) {
                    $.cookie('member_sign', msg.member_sign, { expires: 1, path: '/' });
                    $.cookie('username', msg.username, { expires: 1, path: '/' });
                    $.cookie('User_TureName', msg.User_TureName, { expires: 1, path: '/' });
                    $.cookie('userVerifyCode', msg.UserVerifyCode, { expires: 1, path: '/' });
                    console.log($.cookie('member_sign'))
                    console.log($.cookie('username')) //邮箱地址
                    console.log($.cookie('userVerifyCode'))
                    console.log($.cookie('User_TureName')) //真实姓名
                    window.location.href = "index.html";
                } else if (msg.member_sign == -2) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("您填写的账号或密码错误")
                } else if (msg.member_sign == -1) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("邮箱没有激活")
                } else if (msg.member_sign == 0) {
                    error_tips.animate({ "opacity": 1 }, 100)
                    tips.text("账号没有审核")
                }
                // window.location.href("http://class.xinxueshuo.cn");

            },
            error: function() {
                alert('用户名或密码错误，请求数据失败！');
            }
        });
    }

    $('#loginButton').click(function() {
        userLogin()
    })
    $('#password').keydown(function() {
        if (event.keyCode == 13) {
            userLogin()
        }
    })

    //判断浏览器是否支持cookie
    $(function() {
        console.log('Cookies启用：' + navigator.cookieEnabled);
        if (navigator.cookieEnabled == false) {
            $('#isCookie').show()
        } else {
            $('#isCookie').hide()
        }
    })
})

$(function() {
    var registerNewAccount = $("#registerNewAccount"),
        login = $("#login"),
        loginBox = $("#loginBox"),
        registerBox = $("#registerBox")

    login.on("click", function() {
        registerBox.fadeOut(200)
        loginBox.fadeIn(200)
    })

    registerNewAccount.on("click", function() {
        loginBox.fadeOut(200)
        registerBox.fadeIn(200)
    })

})

// 注册

$(function() {
    var btn = $("#registerLoginButton"),
        registerError = $("#registerError"),
        registerTips = $("#registerTips"),
        emailFlag = false,
        nameFlag = false,
        instutionFlag = false,
        jobFlag = false,
        telFlag = false,
        pwdFlag = false,
        confirmPwdFlag = false

    // 邮箱注册
    function mailCheck() {
        var pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            emailValue = $("#registerEmail").val()
        if (pattern.test(emailValue) === true) {
            // emailFlag = true;
            // console.log("ok");
            $.ajax({
                url: "http://" + changeUrl.address + "/User_api?whereFrom=checkMail",
                type: 'post',
                dataType: 'jsonp',
                jsonp:   "Callback",
                async: true,
                data: { checkMail: emailValue },
                success: function(msg) {
                    if (msg.msg < 0) {
                        registerError.animate({ "opacity": 1 }, 100)
                        registerTips.text("邮箱已注册过")
                        emailFlag = false;
                    } else {
                        // 邮箱格式正确且未被注册
                        emailFlag = true
                        registerError.animate({ "opacity": 0 }, 100)
                    }
                }
            })
        } else {
            emailFlag = false;
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("您填写的邮箱格式不正确")
        }
    }

    //姓名验证
    function nameCheck() {
        var nameValue = $("#registerName").val()
        if (nameValue != '') {
            nameFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            nameFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("请填写姓名")
        }
    }

    //机构验证
    function instutionCheck() {
        var instutionValue = $('#registerInstution').val()
        if (instutionValue != "") {
            instutionFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            instutionFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("请填写机构名")
        }
    }

    //职位验证
    function jobCheck() {
        var jobValue = $("#registerJob").val()
        if (jobValue != "") {
            jobFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            jobFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("请填写职位名称")
        }
    }

    //验证手机号
    function telCheck() {
        var telPattern = /^1[34578]\d{9}$/,
            phoneValue = $("#registerPhone").val()
        if (telPattern.test(phoneValue)) {
            telFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            telFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("手机号格式不正确")
        }
    }

    //验证密码(至少为6位)
    function pwdCheck() {
        var len = $("#registerPassword").val().length
        if (len >= 6) {
            pwdFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            pwdFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("密码不少于6位")
        }
    }

    //验证确认密码
    function confirmPwdCheck() {
        var pwdValue01 = $("#registerPassword").val(),
            pwdValue02 = $("#registerConfirmPassword").val()
        if (pwdValue01 === pwdValue02) {
            confirmPwdFlag = true
            registerError.animate({ "opacity": 0 }, 100)
        } else {
            confirmPwdFlag = false
            registerError.animate({ "opacity": 1 }, 100)
            registerTips.text("您填写的密码不一致")
        }
    }

    //失焦
    var registerEmail = $("#registerEmail"),
        registerName = $("#registerName"),
        registerInstution = $("#registerInstution"),
        registerJob = $("#registerJob"),
        registerPhone = $("#registerPhone"),
        registerPassword = $("#registerPassword"),
        registerConfirmPassword = $("#registerConfirmPassword")

    registerEmail.blur(function() {
        mailCheck()
    })

    registerName.blur(function() {
        nameCheck()
    })

    registerInstution.blur(function() {
        instutionCheck()
    })

    registerJob.blur(function() {
        jobCheck()
    })

    registerPhone.blur(function() {
        telCheck()
    })

    registerPassword.blur(function() {
        pwdCheck()
    })

    registerConfirmPassword.blur(function() {
        confirmPwdCheck()
    })

    btn.on("click", function() {
        var emailValue = $("#registerEmail").val(),
            nameValue = $("#registerName").val(),
            instutionValue = $("#registerInstution").val(),
            jobValue = $("#registerJob").val(),
            phoneValue = $("#registerPhone").val(),
            pwdValue01 = $("#registerPassword").val(),
            pwdValue02 = $("#registerConfirmPassword").val(),
            data = {
                'Email': emailValue,
                'Name': nameValue,
                'company': instutionValue,
                'position': jobValue,
                'Passwd01': pwdValue02,
                'phone': phoneValue
            }
        if (emailFlag && nameFlag && instutionFlag && jobFlag && telFlag && pwdFlag && confirmPwdFlag) {
            $.ajax({
                type: "get",
                async: true,
                traditional: true,
                dataType: "jsonp",
                jsonp: "Callback",
                data: data,
                url: 'http://' + changeUrl.address + '/User_api?whereFrom=register',
                success: function(msg) {
                    alert("注册成功，请查看您的邮箱以激活账号")
                    window.location.reload()
                },
                error: function() {
                    console.log("error")
                }
            })

        } else {
            console.log("注册失败")
        }
    })
})