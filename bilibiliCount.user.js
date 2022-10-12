// ==UserScript==
// @name         自动统计视频总时长
// @namespace    https://github.com/cuicui-V5/BilibiliCount
// @version      0.1
// @description  一个相当简单的油猴脚本, 统计bilibili合集总时长, 观看百分比, 统计后展示在页面上
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         data:image/x-icon;base64,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PP8dHB//GBYZ/wMDBP8BAAGyAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCAAAA5AAAAP8AAAD/AAAA/wAAAP8DAwL/Dg4N/xkaG/8bHB3/FxgY/wsKCv8CAQH/AAAA/wAAAP8AAAD/AAAA4wAAAUEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABKAAAAxAAAAOIAAADhAAAA4QAAAOEAAADhAAAA4QAAAOEAAADhAAAA4QAAAOEAAADhAAAA4gAAAMMAAABIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAAAAHgAAAB4AAAAeAAAAHgAAAB4AAAAeAAAAHgAAAB4AAAAeAAAAHgAAAB4AAAAeAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////+AAf/+AAB//gAAf/wAAD/8AAA/+AAAH/gAAB/wAAAP8AAAD+AAAAfgAAAHwAAAA8AAAAOAAAABgAAAAYAAAAGAAAABwAAAA8AAAAPgAAAH4AAAB/AAAA/wAAAP+AAAH/gAAB/8AAA//AAAP/4AAH/+AAB//4AB//////8=
// @grant        none
// @updateURL      https://github.com/cuicui-V5/BilibiliCount/raw/master/bilibiliCount.user.js
// @downloadURL    https://github.com/cuicui-V5/BilibiliCount/raw/master/bilibiliCount.user.js
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
                let rate = 0;
                let flag = true; //假如为假, 就不再计算已看时间

                for (let i = 0; i < lis.length; i++) {
                    const TimeStr = lis[i].querySelector(".duration").innerHTML;
                    const TimeArr = TimeStr.split(":");
                    // console.log(TimeArr); //['02', '34']
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
                        // console.log("正在观看" + i);
                    }

                    if (lis[i].className == "watched on" || lis[i].className == "on") {
                        flag = false;
                    }
                }
                totalHur = (totalSec / 3600).toFixed(1);
                watchedHur = (watchedSec / 3600).toFixed(1);
                rate = ((watchedHur / totalHur) * 100).toFixed(2);
                //在页面中添加文字
                let tittle = document.querySelector(
                    "#multi_page > div.head-con > div.head-left > h3"
                );
                tittle.innerHTML = `${watchedHur}/${totalHur}h,${rate}%`;
                tittle.style.fontSize = "14px";
                // 绘制进度条
                let bar = document.querySelector(".head-con");
                let progress = document.createElement("div");
                progress.style.backgroundColor = "#03a0d6";
                let barWidth = bar.offsetWidth * (rate / 100) - 32;
                console.log(barWidth);
                progress.style.width = barWidth + "px";
                progress.style.height = "6px";
                bar.style.position = "relative";
                progress.style.position = "absolute";
                progress.style.bottom = "-6px";
                bar.appendChild(progress);
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
