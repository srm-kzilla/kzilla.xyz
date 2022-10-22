<script>
  import { onMount } from "svelte";

  export let codeValue;
  onMount(async () => {
    let script = document.createElement("script");
    script.src =
      "https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js";
    document.head.append(script);
    script.onload = function () {
      const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "canvas",
        data: codeValue,
        image: "/kz_logo.png",
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        backgroundOptions: {
          color: "#FFFFFF",
        },
        imageOptions: {
          crossOrigin: "anonymous",
        },
      });
      qrCode.append(document.getElementById(codeValue));
    };
  });
</script>

<div class="qrcode" id={codeValue} />

<style>
  .qrcode {
    width: 250px;
    height: 250px;
    margin-top: 15px;
    margin: auto;
  }
</style>
