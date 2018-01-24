// body高度
$(function() {
    var height = $(window).height()
    $(document.body).css("min-height", height)
})

$(function() {
    var activityList = $("#activityListDesc_container"),
        activeTitleList = $("#activeTitle"),
        defaultTitleLength = 0
    $.ajax({
        type: "post",
        dataType: "json",
        url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchActivity',
        success: function(msg) {
            var title = [],
                theNewest = msg.data[0];
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
                        // console.log(arrTitle)
                        defaultTitleLength = arrTitle.length;
                    },
                    error: function() {
                        console.log("error")
                    }
                })
                $.ajax({
                    type: "post",
                    dataType: "json",
                    data: { "Title1": data },
                    url: 'http://' + changeUrl.address + '/Class_activity?whereFrom=searchInformation',
                    success: function(msg) {
                        console.log(msg.data)
                        var activeContent = $("#activeContent")
                        activeContent.html("")
                        for (var i = 0; i < msg.data.length; i++) {
                            activeContent.append(`<tr></tr>`)
                            for (var j = 0; j < defaultTitleLength; j++) {
                                activeContent.children("tr").eq(i).append('<td>' + eval("msg.data[i].Content" + (j + 3)) + '</td>')
                            }
                        }
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
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content3}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content4}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content5}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content6}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content7}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content8}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content9}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content10}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content11}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content12}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content13}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content14}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content15}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content16}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content17}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content18}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content19}</td>`)
                                // activeContent.children("tr").eq(i).append(`<td>${msg.data[i].Content20}</td>`)
                        }
                    }
                    // console.log($("td").text())
                    // for (var i = 0; i < $("td").length; i++) {
                    //     if ($("td").eq(i).text() == "null") {
                    //         $("td").eq(i).css("display", "none")
                    //     }
                    // }
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