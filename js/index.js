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
    var CourseContainer = $("#CourseContainer")
    $.ajax({
        type: "get",
        async: false,
        data: "",
        dataType : "json",
        contentType: "application/json;charset=UTF-8",
        url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
        success: function(msg) {
            // console.log(msg.data)
            // CourseContainer.append(`
            // <div class="col-md-3 col-sm-6">
            //     <a href="./detailLesson.html" target="_">
            //          <div class="Course borderRadio4">
            //             <img src="./images/CourseImage01.jpg" alt="">
            //             <p class="Couse_title oneline">${msg.data[0].CourseName}</p>
            //          </div>
            //      </a>
            //     <p class="mtb5  oneline"><span class="CourseName">${msg.data[0].CourseSubject}</span></p>
            //     <p class="mtb5">开课时间：<span class="CourseTime">${msg.data[0].ClassBegins}</span></p>
            // </div>
            // `)
        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })
})