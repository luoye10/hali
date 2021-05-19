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
	left: 0,
	top: 0,
	"z-index": 2233,
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

let isCanMove = false;
let x = 0;
let y = 0;
let clientX, clientY;
pluginDom.addEventListener("mousedown", (e) => {
	isCanMove = true;
	clientX = e.clientX;
	clientY = e.clientY;
});
document.addEventListener("mousemove", (e) => {
	if (!isCanMove) {
		return;
	}
	const _x = e.clientX - clientX;
	const _y = e.clientY - clientY;
	pluginDom.style.transform = `translate(${x + _x}px, ${y + _y}px)`;
});
document.addEventListener("mouseup", () => {
	isCanMove = false;
	const transform = pluginDom.style.transform;
	const reg = /translate\((\d+)px, (\d+)px\)/;
	if (transform.match(reg)) {
		let a = parseInt(RegExp.$1);
		let b = parseInt(RegExp.$2);
		if (a !== a) {
			a = 0;
		}
		if (b !== b) {
			b = 0;
		}
		x = a;
		y = b;
	}
});

createApp(Content).mount(pluginDom);
document.body.appendChild(pluginDom);
