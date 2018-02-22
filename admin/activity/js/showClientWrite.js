// body高度
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})

$(function() {
    var activityList = $("#activityListDesc_container"),
        activeTitleList = $("#activeTitle")
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchActivity',
        success: function(msg) {
            var title = [],
                theNewest = msg.data[0]
            for (var i = 0; i < msg.data.length; i++) {
                activityList.append('<li>' + msg.data[i].Title1 + '</li>')
            }
            for (var arr in theNewest) {
                if (theNewest[arr] !== "未填写" && theNewest[arr] !== "0" && arr !== "Id" && arr !== "Title20" && arr !== "Title1" && arr !== "Title2" && arr !== "Deadline" && arr !== "Load_time") {
                    title.push(theNewest[arr])
                }
            }
            for (var i = 0; i < title.length; i++) {
                activeTitleList.append('<th>' + title[i] + '</th>')
            }

            //点击显示对应活动详情列表
            var aLi = activityList.children()
            aLi.on("click", function() {
                var data = $(this).text(),
                    _index = $(this).index()
                $(this).css({ "background": "rgb(253, 185, 140)", "color": "#FFF" }).siblings().css({ "background": "#FFF", "color": "#000" })
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: { "Title1": data },
                    url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchActivity',
                    success: function(msg) {
                        // console.log(msg.data[_index])
                        var arrTitle = [],
                            acquireTitle = msg.data[_index]
                        for (var arr in acquireTitle) {
                            if (acquireTitle[arr] !== "未填写" && acquireTitle[arr] !== "0" && arr !== "Id" && arr !== "Title20" && arr !== "Title1" && arr !== "Title2" && arr !== "Deadline" && arr !== "Load_time") {
                                arrTitle.push(acquireTitle[arr])
                            }
                        }
                        activeTitleList.html("")
                        for (var i = 0; i < arrTitle.length; i++) {
                            activeTitleList.append('<th>' + arrTitle[i] + '</th>')
                        }
                        $.ajax({
                            type: "post",
                            dataType: "json",
                            data: { "Title1": data },
                            url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchInformation',
                            success: function(msg) {
                                // console.log(msg.data)
                                var activeContent = $("#activeContent")
                                activeContent.html("")
                                for (var i = 0; i < msg.data.length; i++) {
                                    activeContent.append('<tr></tr>')
                                    for (var j = 0; j < arrTitle.length; j++) {
                                        activeContent.children("tr").eq(i).append('<td>' + eval("msg.data[i].Content" + (j + 3)) + '</td>')
                                    }
                                }
                                activeContent.append(`<tr><td class="total">学员总人数：${msg.data.length}人</td></tr>`)
                            },
                            error: function() {
                                console.log("error")
                            }
                        })
                    },
                    error: function() {
                        console.log("error")
                    }
                })

            })

            // 默认显示最新活动
            $.ajax({
                type: "post",
                dataType: "json",
                data: { "Title1": theNewest.Title1 },
                url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchInformation',
                success: function(msg) {
                    var activeContent = $("#activeContent")
                        // console.log(msg.data)
                    for (var i = 0; i < msg.data.length; i++) {
                        activeContent.append(`<tr></tr>`)
                        for (var j = 0; j < title.length; j++) {
                            activeContent.children("tr").eq(i).append('<td>' + eval("msg.data[i].Content" + (j + 3)) + '</td>')
                        }
                    }
                    $(".total").text(msg.data.length)
                },
                error: function(msg) {
                    console.log("error")
                }
            })
        },
        error: function(msg) {
            console.log("error:" + msg)
        }
    })

})