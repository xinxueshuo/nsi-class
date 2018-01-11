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

function isLogin() {
    var $login = $("#login")
    if ($.cookie('username') === undefined) {
        $login.text("登录")
    } else {
        $login.text($.cookie('username'))
    }
}
isLogin();