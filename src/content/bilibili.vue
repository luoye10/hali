<template>
	<div class="bili-box">
		<!-- <h1>22, 33 你好~</h1> -->
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted() {
		const div = document.createElement("div");
		const styl = {
			background:
				'url("https://i0.hdslb.com/bfs/album/522e3bdb8807477adeabf17ec822a3a8839bee86.jpg")',
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundAttachment: "fixed",
			filter: "blur(1px)",
			position: "fixed",
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			zIndex: -1
		};
		Object.keys(styl).forEach((key) => {
			div.style[key] = styl[key];
		});
		const style = document.createElement("style");
		style.id = "img-model";
		style.innerText = `
            *{
                color: #fff !important;
            } 
            .storey-box.b-wrap .item.sortable{
                background-color: aqua;
            }
            .contact-help{
                background-color: aqua;
            }
        `;
		document.body.appendChild(div);
		document.body.appendChild(style);
	}
};
</script>
