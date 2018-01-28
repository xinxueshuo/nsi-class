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

// 轮播
$(function() {
    var swiper = new Swiper('.swiper-container', {
        autoplay: {
            disableOnInteraction: false,
        },
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
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


// $(function() {
//     var CourseContainer = $("#CourseContainer")
//     $.ajax({
//         type: "get",
//         async: false,
//         data: "",
//         dataType : "json",
//         contentType: "application/json;charset=UTF-8",
//         url: 'http://' + changeUrl.address + '/Class_Course_api?whereFrom=Search_Course',
//         success: function(msg) {
//             console.log(msg.data)
//             CourseContainer.append(`
//             <div class="col-md-3 col-sm-6">
//                 <a href="./detailLesson.html" target="_">
//                      <div class="Course borderRadio4">
//                         <img src="./images/CourseImage01.jpg" alt="">
//                         <p class="Couse_title oneline">${msg.data[0].CourseName}</p>
//                      </div>
//                  </a>
//                 <p class="mtb5  oneline"><span class="CourseName">${msg.data[0].CourseSubject}</span></p>
//                 <p class="mtb5">开课时间：<span class="CourseTime">${msg.data[0].ClassBegins}</span></p>
//             </div>
//             `)
//         },
//         error: function(msg) {
//             console.log("error:" + msg)
//         }
//     })
// })