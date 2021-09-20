import "./assets/css/common.less";
import { createApp } from "vue";
import Background from "./Background.vue";
createApp(Background).mount("#background");
/**
    * 添加点击事件
    */

chrome.browserAction.onClicked.addListener(tab => {
    chrome.tabs.create({
        url: chrome.extension.getURL("background.html")
    }, new_tab => {
        // Tab opened.
        console.log("click");
    });
});
/**
    * 模拟请求头
    *
    */

function hack_referer_header(details) {
    const replace_referer = true;
    let replace_origin = true;
    let add_referer = true;
    let add_origin = true;
    let referer_value = "";
    let origin_value = "";
    let ua_value = "";

    if (details.url.includes("://music.163.com/")) {
        referer_value = "https://music.163.com/";
    }

    if (details.url.includes("://gist.githubusercontent.com/")) {
        referer_value = "https://gist.githubusercontent.com/";
    }

    if (details.url.includes(".xiami.com/")) {
        add_origin = false;
        add_referer = false; // referer_value = "https://www.xiami.com";
    }

    if (details.url.includes("c.y.qq.com/")) {
        referer_value = "https://y.qq.com/";
        origin_value = "https://y.qq.com";
    }

    if (details.url.includes("i.y.qq.com/") || details.url.includes("qqmusic.qq.com/") || details.url.includes("music.qq.com/") || details.url.includes("imgcache.qq.com/")) {
        referer_value = "https://y.qq.com/";
    }

    if (details.url.includes(".kugou.com/")) {
        referer_value = "http://www.kugou.com/";
    }

    if (details.url.includes(".kuwo.cn/")) {
        referer_value = "http://www.kuwo.cn/";
    }

    if (details.url.includes(".bilibili.com/") || details.url.includes(".bilivideo.com/")) {
        referer_value = "https://www.bilibili.com/";
        replace_origin = false;
        add_origin = false;
    }

    if (details.url.includes(".migu.cn")) {
        referer_value = "http://music.migu.cn/v3/music/player/audio?from=migu";
    }

    if (details.url.includes("m.music.migu.cn")) {
        referer_value = "https://m.music.migu.cn/";
    }

    if (details.url.includes("app.c.nf.migu.cn") || details.url.includes("d.musicapp.migu.cn")) {
        ua_value = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        add_origin = false;
        add_referer = false;
    }

    if (details.url.includes("jadeite.migu.cn")) {
        ua_value = "okhttp/3.12.12";
        add_origin = false;
        add_referer = false;
    }

    if (origin_value === "") {
        origin_value = referer_value;
    }

    let isRefererSet = false;
    let isOriginSet = false;
    let isUASet = false;
    const headers = details.requestHeaders;
    const blockingResponse = {};

    for (let i = 0, l = headers.length; i < l; i += 1) {
        if (replace_referer && headers[i].name === "Referer" && referer_value !== "") {
            headers[i].value = referer_value;
            isRefererSet = true;
        }

        if (replace_origin && headers[i].name === "Origin" && origin_value !== "") {
            headers[i].value = origin_value;
            isOriginSet = true;
        }

        if (headers[i].name === "User-Agent" && ua_value !== "") {
            headers[i].value = ua_value;
            isUASet = true;
        }
    }

    if (add_referer && !isRefererSet && referer_value !== "") {
        headers.push({
            name: "Referer",
            value: referer_value
        });
    }

    if (add_origin && !isOriginSet && origin_value !== "") {
        headers.push({
            name: "Origin",
            value: origin_value
        });
    }

    if (!isUASet && ua_value !== "") {
        headers.push({
            name: "User-Agent",
            value: ua_value
        });
    }

    blockingResponse.requestHeaders = headers;
    return blockingResponse;
}

const urls = ["*://music.163.com/*", "*://*.xiami.com/*", "*://i.y.qq.com/*", "*://c.y.qq.com/*", "*://*.kugou.com/*", "*://*.kuwo.cn/*", "*://*.bilibili.com/*", "*://*.bilivideo.com/*", "*://*.migu.cn/*", "*://*.githubusercontent.com/*"];

try {
    chrome.webRequest.onBeforeSendHeaders.addListener(hack_referer_header, {
        urls
    }, ["requestHeaders", "blocking", "extraHeaders"]);
} catch (err) {
    // before chrome v72, extraHeader is not supported
    chrome.webRequest.onBeforeSendHeaders.addListener(hack_referer_header, {
        urls
    }, ["requestHeaders", "blocking"]);
}
/***
    * 开发模式
    * 保存代码自动刷新逻辑处理
    *
    */


function link() {
    let es = new EventSource("http://192.168.10.3:2233");
    es.onmessage = dealRes;
}

function dealRes(e) {
    console.log(e);

    if (e.data !== "refresh") {
        return;
    } // 发消息给content-script，让它刷新页面


    sendMessageToContentScript({
        cmd: "reload-page",
        value: "插件已经刷新，开始刷新页面!"
    }, response => {
        if (response) {
            console.log("收到来自content-script的回复：" + response);
        }
    });
    setTimeout(() => {
        chrome.runtime.reload();
    }, 1000);
}

link(); // 获取当前选项卡ID

function getCurrentTabId(callback) {
    // chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.query({
        active: true
    }, function (tabs) {
        // 暂时不考虑多个窗口应用组件的问题
        if (tabs && tabs.length) {
            if (callback) callback(tabs.length ? tabs[0].id : null);
        }
    });
} // 向content-script主动发送消息


function sendMessageToContentScript(message, callback) {
    getCurrentTabId(tabId => {
        console.log(message);
        console.log(tabId);
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}