$(function() {
    var aA = $("#myLable").children().children(),
        _index = 0,
        rightBox = $("#rightBox").children(),
        aLi = $("#myLable").children()
    aLi.on("click", function() {
        _index = $(this).index()
        $(this).children("a").addClass("active").parent().siblings().children("a").removeClass("active")
        rightBox.eq(_index).fadeIn(100).siblings().fadeOut(100)
    })
})

$(function() {
    var btn = $("#btn"),
        checkCode = 0,
        myDate = new Date(),
        nowDate = myDate.getDate(),
        checkDate = nowDate < 10 ? "0" + nowDate : nowDate

    function RandomNumBoth(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }


    btn.on("click", function() {
        var codeValue = $("#code").val(),
            checkCode = RandomNumBoth(17, 33),
            checkNum = checkCode + checkDate,
            data = {
                'code': codeValue,
                // 'sign': checkNum,
                'UserMail': $.cookie('username')
            }
        $.ajax({
            type: "get",
            // dataType: "json",
            data: data,
            url: 'http://' + changeUrl.address + '/Class_ActivationCode?whereFrom=courseCode',
            success: function(data) {
                if (data.code > 0) {
                    $("#myAlertSuccess").fadeIn(100)
                    $("#myAlertError01").fadeOut(100)
                    $("#myAlertError02").fadeOut(100)
                } else {
                    $("#myAlertError02").fadeIn(100)
                    $("#myAlertSuccess").fadeOut(100)
                    $("#myAlertError01").fadeOut(100)
                }
            },
            error: function() {
                $("#myAlertError01").fadeIn(100)
                $("#myAlertError02").fadeOut(100)
                $("#myAlertSuccess").fadeOut(100)
            }
        })
    })
})