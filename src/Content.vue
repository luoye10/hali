<template>
	<div class="boxs-content">
		<div class="btns info">
			<div class="btn" @click.stop="refresh">刷新</div>
			<div class="num-info">
				正在播放第 <span class="no-val">{{ no }}</span> 集
			</div>
		</div>
		<div class="play-control" @click.stop="void 0">
			<div class="btn prev" @click="prev">上一集</div>
			<div class="btn next" @click="next">下一集</div>
			<div class="input">
				<span class="desc">跳转</span
				><input
					class="num"
					@focus="startFocus"
					@blur="beNumber"
					v-model="linkNumber"
					type="text"
				/>
			</div>
		</div>
		<!-- 晚间模式 -->
		<div class="drak">
			<div class="btn" @click="switchDark">黑夜模式</div>
		</div>
		<!-- 网页全屏 -->
		<!-- <div class="fullscreen">
			<div class="btn" @click="changeFullScreen">进入网页全屏</div>
		</div> -->
	</div>
</template>
<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
export default {
	setup() {
		const getTheNum = () => {
			let url = location.href;
			const reg = /(\d+)\.html$/;
			if (!url.match(reg)) {
				return -1;
			}
			let n = RegExp.$1;
			return n;
		};
		const goto = (type) => {
			let n = getTheNum();
			if (n === -1) {
				return;
			}
			if (type === "prev") {
				console.log("上一集");
				if (n <= 1) {
					n = 1;
				} else {
					n--;
				}
			}
			if (type === "next") {
				console.log("下一集");
				n++;
			}
			selectNo(n);
		};
		const selectNo = (num) => {
			if (num === -1) {
				return;
			}
			const reg = /(\d+)\.html$/;
			let url = location.href;
			url = url.replace(reg, `${num}.html`);
			location.href = url;
		};
		const prev = () => {
			goto("prev");
		};
		const next = () => {
			goto("next");
		};
		const isFocus = ref(false);
		const linkNumber = ref(0);
		const no = ref(0);
		const beNumber = () => {
			let _v = parseInt(linkNumber.value);
			if (_v !== _v) {
				_v = "";
			}
			if (_v <= 0) {
				_v = 1;
			}
			if (_v >= 10000) {
				_v = 10000;
			}
			linkNumber.value = _v;
			isFocus.value = false;
		};
		const startFocus = () => {
			isFocus.value = true;
		};
		const refresh = () => {
			location.reload();
		};
		const findVideo = () => {
			let el = document.querySelector("video");
			if (!el) {
				let iframe = document.querySelector("iframe");
				if (iframe) {
					let _v = iframe.contentDocument.querySelector("video");
					if (_v) {
						el = _v;
					} else {
						iframe = iframe.contentDocument.querySelector("iframe");
						if (iframe) {
							_v = iframe.document.querySelector("video");
							if (_v) {
								el = _v;
							}
						}
					}
				}
			}
			console.log(el);
		};

		// 绑定输入数字，enter跳转
		const inputNumber = (e) => {
			if (e.key === "Enter" && isFocus.value) {
				const num = linkNumber.value;
				selectNo(num);
			}
		};

		// 网页全屏切换
		const isFullScreen = ref(false);
		const changeFullScreen = () => {
			const iframe = document.querySelector("#player");
			if (!iframe) return;
			if (isFullScreen.value) {
				// 退出全屏
				iframe.classList.remove("input-full-screen");
			} else {
				iframe.classList.add("input-full-screen");
			}
		};

		const isDark = ref(false);
		const addStyle = () => {
			const style = document.createElement("style");
			style.id = "dark-mode";
			style.innerText = `
				body,.topall{
					background: #000;
				}
				.playding.clearfix {
					background: #000;
				}
				.playding.mb.clearfix,.taba-down .pfromd,.footer.clearfix{
					background: #000;
				}
				.plugin.box.container {
					background: #1f1e1e !important;
				}
			`;
			document.body.appendChild(style);
		};
		const removeStyle = () => {
			const style = document.getElementById("dark-mode");
			document.body.removeChild(style);
		};
		const switchDark = () => {
			if (isDark.value) {
				removeStyle();
				localStorage.removeItem("isDark");
			} else {
				addStyle();
				localStorage.setItem("isDark", true);
			}
			isDark.value = !isDark.value;
		};
		const initDarkMode = () => {
			const is_dark = localStorage.getItem("isDark") === "true";
			if (is_dark) {
				isDark.value = true;
				addStyle();
			}
		};

		onMounted(() => {
			// findVideo();
			linkNumber.value = getTheNum();
			no.value = getTheNum();
			document.addEventListener("keyup", inputNumber);
			initDarkMode();
		});
		onBeforeUnmount(() => {
			document.removeEventListener("keyup", inputNumber);
		});
		return {
			prev,
			next,
			refresh,
			beNumber,
			linkNumber,
			no,
			startFocus,
			changeFullScreen,
			switchDark
		};
	}
};
</script>
<style lang="less">
.input-full-screen {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 22333;
	height: 100vh;
}
#divplay {
	height: 100%;
}
</style>
<style lang="less" scoped>
.boxs-content {
	text-align: left;
	.btn {
		padding: 10px 15px;
		cursor: pointer;
		border-radius: 3px;
		background: #6cf;
		color: #fff;
		margin: 10px;
		display: inline-block;
		&:active {
			background: rgb(25, 127, 179);
		}
	}
	.info {
		display: flex;
		align-items: center;
	}
	.play-control {
		display: flex;
		align-items: center;
	}
	.num {
		height: 30px;
		line-height: 30px;
		border: none;
		border-bottom: 2px solid #6cf;
		outline: none;
		width: 50px;
		padding: 0 5px;
		margin-left: 10px;
		text-align: center;
		font-size: 14px;
		&:focus {
			box-shadow: 5px 5px 20px 2px #6cf;
		}
	}
}
</style>
