<template>
	<div class="boxs-content">
		<div class="btns">
			<div class="btn" @click="refresh">刷新</div>
		</div>
		<div class="play-control">
			<div class="btn prev" @click="prev">上一集</div>
			<div class="btn next" @click="next">下一集</div>
			<div class="input">
				<span class="desc">跳转</span
				><input
					class="num"
					@focus="startFocus"
					@blur="beNumber"
					v-model="num"
					type="text"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { onMounted, ref } from 'vue';
export default {
	setup() {
		const goto = (type) => {
			if (type === 'prev') {
				console.log('上一集');
			}
			if (type === 'next') {
				console.log('下一集');
			}
			let url = location.href;
			// location.href = url;
		};
		const prev = () => {
			goto('prev');
		};
		const next = () => {
			goto('next');
		};
		const isFocus = ref(false);
		const num = ref('');
		const beNumber = () => {
			let _v = parseInt(num.value);
			if (_v !== _v) {
				_v = '';
			}
			if (_v <= 0) {
				_v = 1;
			}
			if (_v >= 10000) {
				_v = 10000;
			}
			num.value = _v;
			isFocus.value = false;
		};
		const startFocus = () => {
			isFocus.value = true;
		};
		const refresh = () => {
			location.reload();
		};
		onMounted(() => {
			console.log('mounted');
		});
		return {
			prev,
			next,
			refresh,
			beNumber,
			num,
			startFocus
		};
	}
};
</script>
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
