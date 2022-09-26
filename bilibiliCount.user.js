// ==UserScript==
// @name         自动统计视频总时长
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    setTimeout(function () {
        let lis = document.querySelectorAll(".list-box>li");
        let timer = null;

        count();
        function count() {
            // 使用防抖
            clearTimeout(timer);
            timer = setTimeout(function () {
                console.log("统计中.....");
                let totalSec = 0;
                let watchedSec = 0;
                let totalHur = 0;
                let watchedHur = 0;
                let flag = true; //假如为假, 就不再计算已看时间

                for (let i = 0; i < lis.length; i++) {
                    const TimeStr = lis[i].querySelector(".duration").innerHTML;
                    const TimeArr = TimeStr.split(":");
                    console.log(TimeArr); //['02', '34']
                    if (TimeArr.length === 3) {
                        totalSec += Number(TimeArr[0]) * 3600;
                        totalSec += Number(TimeArr[1]) * 60;
                        totalSec += Number(TimeArr[2]);
                    } else if (TimeArr.length === 2) {
                        totalSec += Number(TimeArr[0]) * 60;
                        totalSec += Number(TimeArr[1]);
                    } else if (TimeArr.length === 1) {
                        totalSec += Number(TimeArr[0]);
                    }

                    if (flag) {
                        watchedSec = totalSec;
                        console.log("正在观看" + i);
                    }

                    if (lis[i].className == "watched on" || lis[i].className == "on") {
                        flag = false;
                    }
                }
                totalHur = (totalSec / 3600).toFixed(1);
                watchedHur = (watchedSec / 3600).toFixed(1);

                //在页面中添加
                let tittle = document.querySelector(
                    "#multi_page > div.head-con > div.head-left > h3"
                );
                tittle.innerHTML = `${watchedHur}/${totalHur}h,${(
                    (watchedHur / totalHur) *
                    100
                ).toFixed(2)}%`;
                tittle.style.fontSize = "14px";
            }, 2000);
        }

        //当分集切换重新统计
        var targetNode = document.querySelector(".cur-list");

        var observerOptions = {
            childList: true, // 观察目标子节点的变化，是否有添加或者删除
            attributes: true, // 观察属性变动
            subtree: true, // 观察后代节点，默认为 false
        };

        var observer = new MutationObserver(() => {
            console.log("分集切换, 重新统计" + Math.random());
            count();
        });

        observer.observe(targetNode, observerOptions);
    }, 2500);
})();
