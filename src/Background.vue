<template>
	<!-- <div>123</div> -->
	<search-header></search-header>
</template>
<script>
import searchHeader from "./background/search-header.vue";
import { getCurrentInstance } from "vue";
export default {
	// components: {
	// 	searchHeader
	// },
	setup() {
		const app = getCurrentInstance().appContext.app;
		app.component("search-header", searchHeader);
	}
};
</script>
