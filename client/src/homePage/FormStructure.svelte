<script>

  import { Router, Link, Route } from "svelte-routing";
  import { shrinkUrlService } from '../services/APIservice';
  import { createEventDispatcher } from "svelte";
  import { API , toastFail ,toastSuccess} from '../constants';
  import Button from "../components/Button.svelte";
  import { SvelteToast , toast  } from '@zerodevx/svelte-toast';
  import QRCode from "../myLinksPage/Qrjs.svelte";

  
  const dispatch = createEventDispatcher();

  let button_content = "Shrink";

  let tapped = false;
  let toShowCustomCodeInput = false;
  let shortURL = "HeL0OlUc45";
  let analyticsCode = "YmcA5s";
  let longUrl = "";
  let customCode = undefined;
  let data;
  let error;

  //Copy Button functionality...

  function copyExec() {
    toast.pop();
    toast.push('Link Copied',toastSuccess);
    var $temp = window.$("<input>");
    window.$("body").append($temp);
    $temp.val("https://" + window.$("#shrink").text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  function resetData() {
    data = "";
    longUrl = "";
    customCode = undefined;
    toShowCustomCodeInput = false;
    button_content = "Shrink";
  }
  
  //Validate URL (Check whether a URL is a kzilla.xyz link)

  function validateURL(url) {

    const validUrl = new RegExp('^((https?|ftp):\\/\\/)?'+ // validate protocol
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
	    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    const isKzillaUrl = /^((https?|ftp):\/\/)?kzilla.xyz\/\w+\/?$/;
    if(!validUrl.test(url)) {
      return {valid:false, msg:"Invalid URL."};
    } else if(isKzillaUrl.test(url)) {
      return {valid:false, msg:"Cannot re-shrink kzilla.xyz links."};
    } else {
      return {valid:true};
    }
  }

  function showCustomCodeInput() {
    customCode = undefined;
    toShowCustomCodeInput = !toShowCustomCodeInput;
  }

  function handleError(data) {
    if(data.details){
      if (data.details[0].context.key === "longUrl") {
        error = "The URL you entered is not valid. Please refresh and try again with a valid URL.";
        toast.push('Invalid URL', toastFail);
      }
      else if (data.details[0].context.key === "customCode") {
        error = "Length of custom code must be between 4 and 25, may contain only letters, numbers, hyphens(-) and underscores(_)"
        toast.push('Invalid custom code', toastFail);
      }
    }
    else if(data.code === 409) {
      error = "Custom code already exist. Please try again with a different custom code"
      toast.push('Custom code already exist', toastFail);
    }
    else{
      error = "";
      dispatch("submission");
    }
    return error;
  }

  //function to show the qr code
  function showQREditor(e) {
  var editor = document.getElementById("qrContainer");
  console.log(editor);
  editor.classList.remove("d-none");
}
  //function to hide the qr code 
function hideQREditor() {
  var editor =document.getElementById("qrContainer");
  editor.classList.add("d-none");
}

//function to download the qr
function QRdownload(e) {
  var myDiv = document.getElementById(API.KZILLA_URL + data.shortCode);
  var myImage = myDiv.children[1];
  var hr = document.getElementById(data.shortCode);
  hr.href = myImage.src;
  return false;
}
  //Attach URL shortener API...

  function buttonClick(e) {
    tapped = true;
    if(longUrl){
      if (toShowCustomCodeInput && customCode === undefined) {
        toast.push('Enter a valid custom code', toastFail);
        return
      }
      button_content = "Shrunk";
      e.preventDefault();
      const checkUrl =  validateURL(longUrl);
      if(checkUrl.valid) {
        grecaptcha.ready(async function() {
          const url = "https://kzilla-xyz.herokuapp.com/api/v1/links";
          const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";
          const token = await grecaptcha.execute(
            siteKey,
            { action: "shrink" }
          );
          data = await shrinkUrlService( token, longUrl, customCode );
          error = handleError(data)
        });
      }
      else {
        data = {}
        error = `${checkUrl.msg} Please refresh and try again with a different URL.`
        toast.push(checkUrl.msg, toastFail);
      }
    }
  }

</script>

<style>
  .kz-form-des {
    margin-top: 15vh;
    padding-left: 8vw;
    padding-right: 8vw;
  }
  .kz-form {
    display: flex;
    gap: 0.5vw;
  }
  .kz-form-buttons {
    display: flex;
    gap: 0.5vw;
    justify-content: center;
  }
  .kz-links {
    display: flex;
    flex-direction: column;
  }
  .kz-input {
    font-family: UniSansBook;
    font-size: 3vh;
    width: 71.5vw;
    height: 8vh;
    line-height: 8vh;
    background-color: var(--grey);
    color: var(--black);
    padding: 0px 10px 0px 10px;
    border-radius: 12px;
    border-style: none;
    overflow-x: auto;
  }
  .kz-input-done {
    width: 84vw;
    margin-right: 0px; 
    margin-bottom: 30px;
  }
  .kz-shrinked-text {
    background-color: var(--grey);
    color: var(--black);
    line-height: 8vh;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 2.5vh;
    height: 8vh;
    width: 34vw;
    float: left;
    overflow: auto;
  }
  .kz-shrinked-text-alternate{
    background-color: var(--grey);
    color: var(--black);
    line-height: 8vh;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    border-style: none;
    font-size: 2.5vh;
    height: 8vh;
    width: 34vw;
    float: left;
    overflow: auto;
  }
  .kz-alternate {
    height: 8vh;
    width: 5vw;
    line-height: 8vh;
    margin-left: 0.5vw;
    margin-right: 4vw;
    color: var(--white);
    background-color: var(--black);
    padding: 0px 20px 0px 20px;
    border-radius: 10px;
    float: left;
  }
  /* .kz-error{
    color: var(--orange);
    font-family: UniSansHeavy;
    font-size: 1.5rem;
  } */
  .kz-edit{
      top: 0;
      left: 0;
      width: 100%;
      background-color: transparent;
      z-index: 999;
  }
  .kz-modal-body{
      position: relative;
  }
  .kz-modal-bg{
      border-radius: 5px;
      width: 100%;
      background-color: #f5f5f5;
      box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.05);
  }
  .kz-modal-heading{
      padding-top: 10px;
      padding-left: 10px;
      padding-bottom: 0px; 
      margin-bottom: 30px;
      position: relative;
  }

  .kz-close{
      position: absolute;
      right: 0px;
      top: 5px;
  }

  .kz-close button{
      background-color: transparent;
      padding: 0px;
  }
  .kz-absolute{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: transparent;
  }
  .shrink-another {
    font-family: UniSansHeavy;
    font-size: 2vh;
    letter-spacing: 1px;
    height: 8vh;
    text-align: center;
    line-height: 8vh;
    color: #ffffff;
    background-color: #000000;
    text-transform: uppercase;
    border-radius: 12px;
    padding-left: 1vw;
    padding-right: 1vw;
  }
  .text-center {
    text-align: start !important;
  }
  .kz-download {
        font-family: UniSansHeavy;
        font-size: 20px;
        color: var(--white);
        background-color: var(--black);
        padding: 15px 40px 15px 40px;
        text-transform: uppercase;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .kz-QR-bg{
        margin: auto;
        width: 290px;
        height: 290px;
        padding: 20px 10px 20px 10px;
        border-radius: 15px;
        background-color: var(--white);
    }
    .kz-QR{
        padding: 0; 
        padding-bottom: 20px; 
    }
    #qrcode {
        width:160px;
        height:160px;
        margin-top:15px;
    }
  .kz-qr-absolute{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: transparent;
    }
    
  #qr-btn{
    margin-right: 1rem;    
  }
  .kz-alt-btn{
    margin-top: 3vh;
    display: flex;
    flex-direction: row;
    height: 8vh;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    
    
  }


  @media(max-width: 1400px){
    .kz-input{
      width: 71vw;
    }
    .kz-input-done {
      width: 84vw;
    }
    .kz-shrinked-text {
      width: 31.5vw;
    }
    .kz-shrinked-text-alternate{
      width: 32vw;
    }
    .kz-alternate {
      width: 7vw;
    }

  }
  @media(max-width: 1200px){
    .kz-input{
      width: 69vw;
    }
    .kz-input-done {
      width: 84vw;
    }
  }
  @media (max-width: 1100px) {
    .kz-form-des {
      margin-bottom: 100px;
    }
    .kz-alternate {
      margin-right: 4vw;
    }
  }
  @media(max-width: 1000px){
    .kz-input{
      width: 65vw;
    }
    .kz-input-done {
      width: 84vw;
    }
    .kz-shrinked-text {
      width: 30.5vw;
    }
    .kz-shrinked-text-alternate{
      width: 31.5vw;
    }
    .kz-alternate {
      width: 9vw;
      margin-right: 2vw;
    }
    #qr-btn{
      margin-right: 0.9rem;
    }
  }
  @media (max-width: 920px) {
    .kz-input{
      width: 71vw;
    }
    .kz-form {
      gap: 1vw;
    }
    .kz-form-des {
      padding-left: 5vw;
      padding-right: 5vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 33.5vw;
    }
    .kz-shrinked-text-alternate{
      width: 34vw;
    }
    .kz-alternate {
      width: 9vw;
    }
    #qr-btn{
      margin-right: 0.8rem;
    }
  }
  @media(max-width: 760px){
    .kz-input{
      width: 66.5vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 78vw;
    }
    .kz-shrinked-text-alternate{
      width: 78vw;
    }
    .kz-alternate {
      margin-right: 0px;
      margin-left: 6px;
      margin-bottom: 1vh;
      width: 10vw;
    }
    #qr-btn{
      margin-right: 0.7rem;
    }
  }
  @media (max-width: 700px) {
    .kz-shrinked-text {
      width: 76vw;
    }
    .kz-shrinked-text-alternate{
      width: 76vw;
    }
    .kz-alternate {
      margin-left: 1vw;
      width: 10vw;
    }
    .shrink-another {
      margin-top: 1.5vh;
      font-size: 1.6vh;
      letter-spacing: 1px;
      height: 8vh;
      line-height: 8vh;
      padding-left: 1.4vw;
      padding-right: 1.4vw;
      border-radius: 8px;
    }
    #qr-btn{
      margin-right: 1.3rem;
    }
  }
  @media (max-height: 640px) {
    .kz-form-des {
      margin-top: 10vh;
    }
  }
  @media(max-width: 550px){
    .kz-form-des {
      margin-bottom: 0px;
    }
    .kz-form-buttons {
      gap: 1vw;
    }
    .kz-input{
      width: 90vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 74vw;
    }
    .kz-shrinked-text-alternate{
      width: 74vw;
    }
    .kz-alternate {
      margin-left: 1vw;
      width: 12vw;
    }
    .shrink-another {
      margin-top: 1.5vh;
      font-size: 1.6vh;
      letter-spacing: 1px;
      height: 6vh;
      line-height: 6vh;
      padding-left: 1.4vw;
      padding-right: 1.4vw;
      border-radius: 8px;
    }
    #qr-btn{
      margin-right: 1.2rem;
    }
  }
  @media(max-width: 470px){
    .kz-form {
      flex-direction: column;
      gap: 1vh;
    }
    .kz-input{
      width: 90vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 72vw;
    }
    .kz-shrinked-text-alternate{
      width: 72vw;
    }
    .kz-alternate {
      width: 14vw;
    }
    .text-center {
      text-align: center !important;
    }
    #qr-btn{
      margin-right: 0.9rem;
    }
  }
  @media(max-width: 400px){
    .kz-input{
      width: 90vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    #qr-btn{
      margin-right: 0.6rem;
    }
  }
  @media (max-height: 610px) and (min-width: 550px){
    .kz-form-des {
      margin-top: 50px;
      margin-bottom: 100px;
    }
    .kz-input{
      font-size: 15px;
      line-height: 50px;
      min-height: 50px;
    }
    .kz-shrinked-text{
      font-size: 15px;
      line-height: 50px;
      min-height: 50px;
    }
    .kz-shrinked-text-alternate{
      font-size: 15px;
      line-height: 50px;
      min-height: 50px;
    }
  }
</style>

<div class="container-fluid kz-form-des">

  {#if !data}
    <form class="kz-form" id="kz-form" on:submit|preventDefault={buttonClick}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input"/>
      {#if toShowCustomCodeInput}
        <input type="text" bind:value={customCode} required placeholder="Enter custom code..." class="kz-input"/>
      {/if}
      <div class="kz-form-buttons">
        <Button on:click={showCustomCodeInput} button_content={toShowCustomCodeInput ? "Randomize" : "Customize"}/>
        <Button on:submission on:buttonClick={buttonClick} {button_content}/>
      </div>
    </form>

  {:else if !error}

  <div>
    <div id="shrunkLink" class="container-fluid kz-links" style="margin-top: 60px; padding: 0px;">
      <div class="container-fluid text-center kz-input kz-input-done">
        {data.longUrl}
      </div>
      <div>
        <div class="kz-shrinked-text" id="shrink">
          {API.KZILLA_URL}{data.shortCode}
        </div>

        <button class="kz-alternate" on:click={copyExec}>
          <img height="20px" src="/icons/copy-light.svg" alt="copy-btn" />
        </button>


        <div class="kz-shrinked-text-alternate" style="">
          {API.ANALYTICS_URL}{data.analyticsCode}
        </div>
  
        <Link to="analytics/{data.analyticsCode}">
          <button class="kz-alternate " style="margin-right: 0;">
            <img src="/icons/analytics.svg" alt="edit link"/>
          </button>
        </Link>
      </div>

        <div class=" kz-alt-btn">
          <button on:click={resetData} class="shrink-another">Shrink another url</button>
          <button on:click={showQREditor} class="shrink-another" id="qr-btn">
            <img src="/icons/qr.svg" alt="download qr"/>
            QR-CODE
          </button>
        </div>
    </div>
  </div>
    <div class="d-none kz-qr-absolute " id="qrContainer">
      <div class="container-fluid kz-edit  kz-qr-modalId" >
        <div class="row align-items-center justify-content-center kz-modal-body">
            <div class="kz-qr-absolute" on:click={hideQREditor}></div>
            <div class="col col-12 col-sm-8 col-lg-6 col-xl-5 kz-modal-bg">
                <h3 class="kz-modal-heading kz-uni-sans">
                    {API.KZILLA_URL}{data.shortCode}
                    <div class="kz-close">
                        <button on:click={hideQREditor}>
                            <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>
                        </button>
                    </div>
                </h3>
                <div class="container-fluid text-center kz-QR">
                    <div class="kz-QR-bg">
                        <QRCode  codeValue="https://{API.KZILLA_URL}{data.shortCode}" squareSize=250/>    
                    </div>                    
                </div>
                <div class="text-center">
                    <a id="{data.shortCode}" href=" " on:click={QRdownload} download="qr.png"><button class="kz-download">Download</button></a>
                </div>
            </div>
        </div>
    </div>
    </div>
  {:else}
    <div class="container-fluid kz-edit kz-modalId">
      <div class="row align-items-center justify-content-center kz-modal-body">
        <a href="/"><div class="kz-absolute"></div></a>
        <div class="col col-12 col-sm-11 col-lg-8 col-xl-6 kz-modal-bg">
            <h3 class="kz-modal-heading kz-uni-sans">
              <div class="kz-close">
                <button>
                  <a href="/">
                    <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>
                  </a>
                </button>
              </div>
                <br>
                {error}
            </h3>
        </div>
      </div>
    </div>
    <!-- <div class="container-fluid kz-error">
      <span>{error}</span>
    </div> -->
  {/if}
  <SvelteToast/>
</div>
