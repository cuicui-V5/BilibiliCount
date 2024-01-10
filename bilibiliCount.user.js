// ==UserScript==
// @name         统计bilibili合集总时长与观看百分比
// @namespace    https://github.com/cuicui-V5/BilibiliCount
// @version      0.2.0
// @description  统计bilibili合集总时长与观看百分比
// @author       You
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// @updateURL      https://github.com/cuicui-V5/BilibiliCount/raw/master/bilibiliCount.user.js
// @downloadURL    https://github.com/cuicui-V5/BilibiliCount/raw/master/bilibiliCount.user.js
// @license MIT
// ==/UserScript==

(function () {
    "use strict";

    setTimeout(function () {
        let isNewType = false; // 是否为新版合集
        // 查找普通分p
        let lis = document.querySelectorAll(".list-box>li");
        // 查找新版合集
        if (lis.length === 0) {
            lis = document.querySelectorAll(
                ".video-section-list>.video-episode-card",
            );
            if (lis.length > 0) {
                isNewType = true;
            }
        }
        let timer = null;
        if (lis.length > 0) {
            count();
        }
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
                    let TimeStr;
                    if (isNewType) {
                        TimeStr = lis[i].querySelector(
                            ".video-episode-card__info-duration",
                        ).innerHTML;
                    } else {
                        TimeStr = lis[i].querySelector(".duration").innerHTML;
                    }
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

                    if (
                        lis[i].className == "watched on" ||
                        lis[i].className == "on" ||
                        (isNewType &&
                            lis[i].childNodes[0].className ==
                                "video-episode-card__info video-episode-card__info-playing")
                    ) {
                        flag = false;
                    }
                }
                totalHur = (totalSec / 3600).toFixed(1);
                watchedHur = (watchedSec / 3600).toFixed(1);
                rate = ((watchedHur / totalHur) * 100).toFixed(2);
                //在页面中添加文字
                let tittle;
                if (isNewType) {
                    tittle = document.querySelector(".second-line_left");
                } else {
                    tittle = document.querySelector(
                        "#multi_page > div.head-con > div.head-left > h3",
                    );
                }

                tittle.innerHTML = `${watchedHur}/${totalHur}h,${rate}%`;
                tittle.style.fontSize = "14px";
                // 绘制进度条
                let bar;
                if (isNewType) {
                    bar = document.querySelector(
                        ".video-sections-head_second-line",
                    );
                } else {
                    bar = document.querySelector(".head-con");
                }
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
                document.querySelector(
                    "#multi_page > div.head-con > div.head-right",
                ).style.display = "none";
            }, 2000);
        }

        //当分集切换重新统计
        let targetNode;
        if (isNewType) {
            targetNode = document.querySelector(".video-sections-content-list");
        } else {
            targetNode = document.querySelector(".cur-list");
        }
        if (targetNode) {
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
        }
    }, 2500);
})();
