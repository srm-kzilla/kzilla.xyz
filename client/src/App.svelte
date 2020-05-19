<script>
	import Navbar from './Navbar.svelte';
	import HeroTag from './HeroTag.svelte';
	import FormDes from './FormDes.svelte';
	let name = 'world';
</script>

<style>
	.kz-crafted{
		position: fixed;
		bottom: 20px;
	}
	.kz-para{
		font-size: 20px;
	}
</style>

<Navbar/>

<HeroTag/>

<FormDes/>

<div class="container-fluid text-center kz-crafted">
	<p class="kz-para">Crafted with <span style="color: red;">&hearts</span> by your friends on the SRMKZILLA team</p>
</div>