<script>
	import { onMount } from 'svelte';

	export let codeValue;
	export let squareSize;

	let qrcode;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
		document.head.append(script);

		script.onload = function () {
			qrcode = new QRCode(codeValue, {
				text: codeValue,
				width: squareSize,
				height: squareSize,
				colorDark: '#000000',
				colorLight: '#ffffff',
				correctLevel: QRCode.CorrectLevel.H
			});
		};
	});
</script>

<div class="qrcode" id={codeValue} />

<style>
	.qrcode {
		width: 250px;
		height: 300px;
		margin-top: 15px;
		margin: auto;
	}
</style>
