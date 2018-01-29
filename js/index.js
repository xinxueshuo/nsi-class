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
//             for (var i = 0; i < 4; i++) {
//                 CourseContainer.append(`
//                     <div class="col-md-3 col-sm-6">
//                         <div class="CourseContainer">
//                             <a href="./detailLesson.html" target="_">
//                                 <div class="Course borderRadio4 Course-up">
//                                     <img src="${msg.data[i].CoverImage}" alt="">
//                                 </div>
//                                 <div class="Course borderRadio4 Course-mid"><img src="${msg.data[i].CoverImage}" alt=""></div>
//                                 <div class="Course borderRadio4 Course-down"><img src="${msg.data[i].CoverImage}" alt=""></div>
//                             </a>
//                             <div class="CourseInfo">
//                                 <p class="mtb5 oneline"><span class="CourseName">${msg.data[i].CourseName}</span></p>
//                                 <p class="mtb5 twoline"><span class="CourseDesc" title="${msg.data[i].CourseDescription}">${msg.data[i].CourseDescription}</span></p>
//                                 <p class="mtb5">开课时间：<span class="CourseTime">${msg.data[i].ClassBegins}</span></p>
//                             </div>
//                         </div>
//                     </div>
//                 `)
//             }
//         },
//         error: function(msg) {
//             console.log("error:" + msg)
//         }
//     })
// })