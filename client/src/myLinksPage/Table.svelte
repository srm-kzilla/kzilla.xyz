<script>
  import { Link } from "svelte-routing";
  import { API ,toastSuccess} from '../constants';
  import QRCode from "./Qrjs.svelte";
  import { updateUrlService, enableUrlService } from '../services/APIservice';
  import { SvelteToast , toast  } from '@zerodevx/svelte-toast';

  //importing details of each individual link.

  // export let enabled;
  let isEnabled = false;
  export let data;
  let response = [];

  //QR Download button

  function QRDownload(e) {
    let myDiv = document.getElementById("https://"+API.KZILLA_URL+data.shortCode);
    let canvas = myDiv.children[0];
    let hr = document.getElementById(data.shortCode);
    hr.href = canvas.toDataURL()
    return false;
  }

  //Opening and closing the edit and QR modals.

  function showEditor(e){
    let editor = this.parentElement;
    window.$(editor).find('.kz-modalId').removeClass('d-none');
  };

  function showQREditor(e){
    let editor = this.parentElement;
    window.$(editor).find('.kz-qr-modalId').removeClass('d-none');
  };

  function toggleSettings(){
    let editor = this.parentElement.parentElement.parentElement;
    window.$(editor).find('.kz-options').toggleClass('d-none');
  };

  function hideEditor(){
    let editor = document.querySelectorAll(".kz-modalId");
    editor.forEach(
      function(e){
        window.$(e).addClass('d-none')
      }
    )
  };

  function hideQREditor(){
    let editor = document.querySelectorAll(".kz-qr-modalId");
    editor.forEach(
      function(e){
        window.$(e).addClass('d-none')
      }
    )
  };

  //Enable or disable link buttons.

  function defaultChecker(){
    if (data.enabled){
      isEnabled = true;
    }

  }

  defaultChecker();

  //Copy button:

  function copyToClipboard(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    toast.pop();
    toast.push('Link Copied',toastSuccess);
  }

  function copyBtn(){
    copyToClipboard(API.KZILLA_URL + data.shortCode);
  }

  //Put API attachment

  function putUpdate(e) {
    e.preventDefault();
    grecaptcha.ready(async function() {
      const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";

      const token = await grecaptcha.execute(
        siteKey,
        { action: "update" }
      );

      data.enabled = true;
      isEnabled = true;
      response = await updateUrlService( token, data.linkId, data.longUrl );
      if(!response.status){
        hideEditor();
      }
    });
  }

  function switchButton(e) {
    isEnabled = !isEnabled;
    grecaptcha.ready(async function() {
      const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";

      const token = await grecaptcha.execute(
        siteKey,
        { action: "enable" }
      );


      if(data.enabled){
        await enableUrlService( token, data.linkId, false );
        isEnabled = false;
        data.enabled = false;
      }
      else{
        await enableUrlService( token, data.linkId, true );
        isEnabled = true;
        data.enabled = true;
      }
    });
  }
</script>

<div class="kz-container">
<div class="kz-row-design">
  <div class="kz-flex kz-title">
    <div>{API.KZILLA_URL}{data.shortCode}</div>
    <img on:click={copyBtn} class="kz-copy" src="/icons/copy.svg" alt="copy button" />
  </div>
  <div class="kz-flex kz-clicks">
    {data.clicks}
  </div>
  <div class="kz-flex"><img on:click={toggleSettings} src="/icons/option.svg" alt="settings" class="kz-options-btn" /></div>
</div>
  <div class="kz-options d-none">
    <div class="container-fluid kz-edit d-none kz-modalId">
      <div class="row align-items-center justify-content-center kz-modal-body">
        <div class="kz-absolute" on:click={hideEditor}></div>
        <div class="col col-12 col-sm-11 col-lg-8 col-xl-6 kz-modal-bg">
          <h3 class="kz-modal-heading kz-uni-sans">
            {API.KZILLA_URL}{data.shortCode}
            <div class="kz-close">
              <button on:click={hideEditor}>
                <svg height="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="window-close" class="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"></path></svg>
              </button>
            </div>
          </h3>
          <h3 class="kz-redirect uni-sand-heavy">REDIRECTS TO</h3>
          <div class="container-fluid kz-div-form text-center">
            <form>
              <input type="text" bind:value={data.longUrl} required placeholder="Enter the new link here..." class="kz-input kz-uni-sans">
              <button on:click={putUpdate} type="submit" name="userLink" class="shrinker uni-sand-heavy">Update</button>
            </form>
          </div>
          {#if response.status}
            {#if response.status === 429}
              <p class="text-center no-data error-message">
                Our systems believe you are on to something bad so they have temporarily
                blocked you. Please try again in a while.
              </p>
            {:else if response.status === 400}
              <p class="text-center no-data error-message">
                Something has gone wrong. The link is broken, or the world is ending.
                Either way, we're investigating the cause.
              </p>
            {:else if response.status === 404}
              <p class="text-center no-data error-message">
                We went to the moon and back, but could not find any more data.
              </p>
            {/if}
          {/if}
        </div>
      </div>
    </div>
    <div class="container-fluid kz-edit d-none kz-qr-modalId">
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
              <QRCode codeValue="https://{API.KZILLA_URL}{data.shortCode}" id="https://{API.KZILLA_URL}{data.shortCode}"/>
            </div>
          </div>
          <div class="text-center">
            <a id="{data.shortCode}" href=" " on:click={QRDownload} download="qr.png"><button class="kz-download">Download</button></a>
          </div>
        </div>
      </div>
    </div>
    <div on:click={showEditor} class="kz-button"><img src="/icons/edit.svg" alt="edit link"/>Edit Link</div>
    <Link to="analytics/{data.analyticsCode}"><div class="kz-button"><img src="/icons/analytics.svg" alt="view analytics"/>Analytics</div></Link>
    <div on:click={showQREditor} class="kz-button"><img src="/icons/qr.svg" alt="download qr"/>QR Code</div>
    <div on:click={switchButton} class={isEnabled ? "kz-button kz-link-enabled" : "kz-button kz-link-disabled" }>{isEnabled ? "Disable Link" : "Enable Link" }</div>
  </div>
  <SvelteToast/>
</div>

<style>
    .kz-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        row-gap: 2vh;
    }

    .kz-row-design {
        display: flex;
        justify-content: space-between;
        padding: 2vh 0 0;
    }

    .kz-flex {
        display: flex;
        justify-content: space-between;
        font-family: UniSansBook,sans-serif;
        font-size: 24px;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 10px;
    }

    .kz-title {
        flex-basis: 85%;
    }

    .kz-title div {
        overflow: hidden;
    }

    .kz-copy {
        width: 25px;
        cursor: pointer;
        user-select: none;
    }

    .kz-copy:active {
        transform: scale(1.2);
    }

    .kz-clicks {
        flex-basis: 5%;
        min-width: 50px;
        justify-content: center;
    }

    .kz-options-btn {
        flex-basis: 5%;
        width: 25px;
        cursor: pointer;
    }

    .kz-edit{
        font-size: 24px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 999 !important;
    }

    .kz-modal-body{
        height: 100vh;
        position: relative;
    }

    .kz-absolute{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: transparent;
    }

    .kz-qr-absolute{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: transparent;
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
        padding-bottom: 0;
        margin-bottom: 30px;
        position: relative;
    }

    .kz-close{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0;
        top: 10px;
    }

    .kz-close button {
        background-color: transparent;
        padding: 0 !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .kz-redirect {
        font-size: 15px;
        font-weight: 999;
        padding-left: 15px;
    }

    .kz-div-form {
        padding: 0 0 20px 10px;
        display: block;
        margin: auto;
    }

    .kz-input{
        min-width: 67%;
        min-height: 40px;
        background-color: var(--white);
        color: #696969;
        padding: 11px 40px 11px 40px;
        border-radius: 10px;
        border-style: none;
        margin-right: 2%;
        overflow-x: auto;
    }

    .uni-sand-heavy{
        font-family: UniSansHeavy,sans-serif;
    }

    .shrinker{
        font-size: 20px;
        min-width: 30%;
        min-height: 40px;
        color: var(--white);
        background-color: var(--black);
        padding: 12px 40px 12px 40px;
        text-transform: uppercase;
        border-radius: 10px;
        margin-right: auto;
    }

    .kz-QR{
        padding: 0 0 20px;
    }

    .kz-QR-bg{
        margin: auto;
        width: 290px;
        height: 290px;
        padding: 20px 10px 20px 10px;
        border-radius: 15px;
        background-color: var(--white);
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

    .error-message{
        margin-bottom: 5px;
    }

    .kz-options {
        display: flex;
        row-gap: 2vh;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .kz-button {
        display: flex;
        user-select: none;
        justify-content: center;
        column-gap: 7px;
        font-family: UniSansHeavy, sans-serif;
        width: 120px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: var(--white);
        background-color: var(--black);
        cursor: pointer;
        text-transform: uppercase;
        border-radius: 12px;
    }

    .kz-link-disabled {
        color: var(--green);
        background-color: var(--black);
    }

    .kz-link-enabled {
        color: var(--orange);
        background-color: var(--black);
    }

    .kz-button img {
        width: 16px;
    }

    @media(max-width: 820px) {
        .kz-flex {
            font-size: 20px;
        }
        .kz-title div {
            max-width: 230px;
        }
        .kz-title {
            flex-basis: 60%;
        }
        .kz-input{
            min-width: 98%;
        }
        .shrinker{
            padding: 15px 20px 15px 20px;
        }
    }

    @media (max-width: 624px) {
        .kz-title div {
            max-width: 180px;
        }
        .kz-options {
            padding: 2vh 8vw 0;
            justify-content: space-around;
        }
    }

    @media(max-width: 410px) {
        .kz-title div {
            max-width: 150px;
        }
        .kz-options {
            padding: 2vh 0 0;
        }
        .kz-div-form{
            padding-left: 0;
        }
        .kz-input{
            width: 96%;
        }
        .shrinker{
            margin: 10px 0 0;
        }
    }
    
    @media (max-width: 350px) {
        .kz-title div {
            max-width: 120px;
        }
    }

</style>