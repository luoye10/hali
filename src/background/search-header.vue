<template>
	<div class="header">
		<div class="search">
			<input type="text" v-model="word" class="name" />
			<button class="btn" @click="startSearch">查询</button>
		</div>
	</div>
</template>
<script>
import { ref } from "vue";
export default {
	setup() {
		const word = ref("");
		const startSearch = () => {
			console.log(word.value);
		};
		return {
			word,
			startSearch
		};
	}
};
</script>
<style lang="less" scoped>
@h: 30px;
@p: 10px;
.header {
	display: flex;
	justify-content: center;
	margin: 10px 0;
	.name {
		width: 300px;
		height: @h;
		padding: @p;
		margin-right: 10px;
		outline: 1px solid rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
	.btn {
		color: #fff;
		cursor: pointer;
		height: @h;
		line-height: @h;
		vertical-align: middle;
		padding: 0 15px;
		background: #6cf;
		border-radius: 3px;
		&:active {
			background: rgb(61, 128, 161);
		}
	}
}
</style>
