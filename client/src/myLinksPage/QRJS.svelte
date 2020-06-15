<script>
  import { onMount } from 'svelte';
	
	export let codeValue;
	export let squareSize; 
	
  let qrcode;
			
	onMount(() => {

		let script = document.createElement('script');
    script.src = "https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js";
    document.head.append(script);
	
		script.onload = function() {

			qrcode = new QRCode(codeValue, {
				text: codeValue,
		  	width: squareSize,
        height: squareSize,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
			});		
			
    };
  });
  
</script>

<style>
  .qrcode {
    width:250px;
    height:300px;
    margin-top:15px;
    margin: auto;
  }
</style>

<div class="qrcode" id="{codeValue}"></div>

