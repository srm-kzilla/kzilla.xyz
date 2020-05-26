<script>
	import Navbar from '../components/Navbar.svelte';
	import HeroTag from '../components/HeroTag.svelte';
	import FormDesign from '../components/FormDesign.svelte';
</script>

<style>
	.kz-main{
		min-height: 100vh;
		position: relative;
		padding: 0px;
	}
	.kz-crafted{
		position: absolute;
		bottom: 0px;
		width: 100%;
	}
	.kz-para{
		font-size: 20px;
	}
	@media(max-width: 600px){
		.kz-para{
			font-size: 3.7vw;
		}
	}
</style>

<div class="container-fluid kz-main">
	<Navbar/>

	<HeroTag/>

	<FormDesign/>
	<br>

	<div class="text-center kz-crafted">
		<p class="kz-para">Crafted with <span style="color: red;">&hearts</span> by your friends on the SRMKZILLA team</p>
	</div>

</div>