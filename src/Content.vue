<template>
	<component :is="activeCom"></component>
</template>
<script>
import bilibili from "./content/bilibili.vue";
import halihali from "./content/halihaili.vue";
export default {
	components: {
		bilibili,
		halihali
	},
	data() {
		return {
			activeCom: ""
		};
	},
	mounted() {
		this.selectActive();
	},
	methods: {
		selectActive() {
			const host = location.host;
			if (host.includes("bilibili")) {
				this.activeCom = "bilibili";
			} else {
				this.activeCom = "halihali";
			}
		}
	}
};
</script>
