// import './css/content.css';
import { createApp } from "vue";
import Content from "./Content.vue";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log(request);
	if (request.value) {
		console.log(request);
		// console.log(sender);
		// 发送的信息似乎可以直接发送对象
		sendResponse("content-script已经接收到你的消息");
		if (request.cmd === "reload-page") {
			// 先把操作存起来,此时插件会刷新
			// localStorage.setItem('refresh', true);
			// 不需要保存起来，延时刷新即可
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		}
	}
});
const style = {
	position: "fixed",
	right: "100px",
	top: "100px",
	"z-index": 10,
	padding: "10px",
	background: "#fff",
	"border-radius": "3px",
	"box-shadow": "5px 5px 20px 2px rgba(0, 0, 0, .4)"
};
const pluginDom = Object.assign(document.createElement("div"), {
	className: "plugin box container",
	style: Object.entries(style)
		.map((attr) => {
			return attr[0] + ":" + attr[1];
		})
		.join(";")
});

createApp(Content).mount(pluginDom);
document.body.appendChild(pluginDom);
