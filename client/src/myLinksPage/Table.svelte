<style>

    svg{
        cursor: pointer;
    }
    
    .kz-row-design{
        margin-top: 10px;
        margin-bottom: 5px;
        margin-left: 0px;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 15px 10px 10px 10px;
        min-width: 1000px;
    }

    .kz-edit{
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
        /* height: 30vh; */
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
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0px;
        top: 10px;
    }

    .kz-close button{
        background-color: transparent;
        padding: 0px !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .kz-redirect{
        font-size: 15px;
        font-weight: 999;
        padding-left: 15px;
    }

    .kz-div-form1{
        padding: 0;
        padding-left: 10px;
        padding-bottom: 20px;
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

    .kz-uni-sans{
        font-family: UniSansBook;
        font-size: 24px !important;
    }

    .uni-sand-heavy{
        font-family: UniSansHeavy;
    }

    .shrinker{
        font-size: 20px;
        min-width: 30%;
        /* height: 6vh; */
        min-height: 40px;
        color: var(--white);
        background-color: var(--black);
        padding: 12px 40px 12px 40px; 
        text-transform: uppercase;
        border-radius: 10px;
        margin-right: auto;
    }

    #qrcode {
        width:160px;
        height:160px;
        margin-top:15px;
    }
    
    .kz-QR{
        padding: 0; 
        padding-bottom: 20px; 
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

    .kz-finder{
        display: flex;
        align-items: center;
        height: 30px;
    }

    input[type="checkbox"].kz-switch{
        position: relative;
        margin-right: 10px;
        width: 60px;
        height: 30px;
        appearance: none;
        -webkit-appearance: none;
        background-color: var(--white);
        outline: none;
        border-style: solid;
        border-color: var(--white);
        border-width: 2px;
        border-radius: 5px;
        box-shadow: inset 0 0 5px var(--white);
        transition: 0.5s;
    }

    /* input:checked[type="checkbox"].kz-switch{
        background-color: var(--black);
    } */

    input[type="checkbox"].kz-switch:before{
        position: absolute;
        content: '';
        padding-left: 4px;
        width: 30px;
        height: 30px;
        border-radius: 5px;
        transform: scale(0.8);
        top: -2px;
        left: 0;
        background-color: #f5f5f5;
        transition: 0.5s;
    }

    input:checked[type="checkbox"].kz-switch:before{
        left: 29px;
        transform: scale(0.9);
        background-color: var(--black);
        padding-left: 8px;
        font-size: 20px;
        content: '\2713';
        color: var(--white);
        font-weight: 999;
    }
    .marginer{
        margin-right: 10px;
    }
    .error-message{
        margin-bottom: 5px;
    }

    @media(max-width: 640px){
        .kz-input{
            min-width: 98%;
        }
        .shrinker{
            padding: 15px 20px 15px 20px; 
        }
    }

    @media(max-width: 410px){
        .kz-div-form1{
            padding-left: 0px;
        }
        .kz-input{
            width: 96%;
        }
        .shrinker{
            margin: 0px;
            margin-top: 10px;
        }
        .marginer{
            margin-right: 5px;
        }
    }

</style>

<script>

import { Router, Link, Route } from "svelte-routing";
import { API } from '../constants';
import QRCode from "./Qrjs.svelte";
import { updateUrlService } from '../services/APIservice';
import { enableUrlService } from '../services/APIservice';
import { SvelteToast , toast  } from '@zerodevx/svelte-toast';

//importing details of each individual link.

// export let enabled;
let checked = false;
export let data;
let response = [];

//QR Download button

function QRdownload(e) {
    var myDiv = document.getElementById(API.KZILLA_URL+data.shortCode);
    var myImage = myDiv.children[1];
    var hr = document.getElementById(data.shortCode);
    hr.href = myImage.src;
    return false;
}

//Opening and closing the edit and QR modals.

function showEditor(e){
    var editor = this.parentElement;
    window.$(editor).find('.kz-modalId').removeClass('d-none');
};

function showQREditor(e){
    var editor = this.parentElement;
    window.$(editor).find('.kz-qr-modalId').removeClass('d-none');
};

function hideEditor(){
    var editor = document.querySelectorAll(".kz-modalId");
    editor.forEach(
        function(e){
            window.$(e).addClass('d-none')
        }
    )
};

function hideQREditor(){
    var editor = document.querySelectorAll(".kz-qr-modalId");
    editor.forEach(
        function(e){
            window.$(e).addClass('d-none')
        }
    )
};

//Enable or disable link buttons.

function defaultChecker(){
    if (data.enabled){
        checked = true;
    }
    
}

defaultChecker();

//Copy button:

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    toast.push('Link Copied',{
      theme:{
        '--themeBackground':'cyan',
        '--toastColor':'white',
        '--toastBarBackground': '#54a870'
      }
    });
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
        checked = true;
        response = await updateUrlService( token, data.linkId, data.longUrl );
        if(!response.status){
            hideEditor();
        }
    });
  }

    function switchButton(e) {
        checked = !checked;
        grecaptcha.ready(async function() {
            const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";

            const token = await grecaptcha.execute(
            siteKey,
            { action: "enable" }
            );


            if(data.enabled){
                await enableUrlService( token, data.linkId, false );
                checked = false;
                data.enabled = false;
            }
            else{
                await enableUrlService( token, data.linkId, true );
                checked = true;
                data.enabled = true;
            }
        });
  }


</script>

<div class="row justify-content-center kz-row-design">
    <div class="col col-4 kz-uni-sans">
        {API.KZILLA_URL}{data.shortCode}
    </div>
    <div class="col col-3 kz-uni-sans">
        {data.clicks}
    </div>
    <div class="col col-5 kz-finder">
        <input id="{data.linkId}" on:click={switchButton} class="kz-switch marginer" type="checkbox" {checked}>
        <svg on:click={showEditor} height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pen" class="marginer svg-inline--fa fa-pen fa-w-16 kz-edit-btn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
        <svg on:click={copyBtn} class="marginer" height="24px" viewBox="0 0 29 34" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
            <g id="Screens" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="shrunk" transform="translate(-605.000000, -813.000000)" fill-rule="nonzero">
                    <g id="Group-4">
                        <g id="Group-5" transform="translate(140.000000, 790.000000)">
                            <g id="Group-Copy" transform="translate(420.000000, 0.000000)">
                                <g id="ic-round-content-copy" transform="translate(42.000000, 22.000000)">
                                    <g id="Icon" fill="black">
                                        <path d="M22.5,1.5 C23.3284271,1.5 24,2.17157288 24,3 C24,3.82842712 23.3284271,4.5 22.5,4.5 L6,4.5 L6,24 C6,24.8284271 5.32842712,25.5 4.5,25.5 C3.67157288,25.5 3,24.8284271 3,24 L3,4.5 C3,2.85 4.35,1.5 6,1.5 L22.5,1.5 Z" id="Icon-Path"></path>
                                        <path d="M12,7.5 L28.5,7.5 C30.1568542,7.5 31.5,8.84314575 31.5,10.5 L31.5,31.5 C31.5,33.1568542 30.1568542,34.5 28.5,34.5 L12,34.5 C10.3431458,34.5 9,33.1568542 9,31.5 L9,10.5 C9,8.84314575 10.3431458,7.5 12,7.5 Z" id="Icon-Path"></path>
                                    </g>
                                    <rect id="ViewBox" x="0" y="0" width="36" height="36"></rect>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        <svg on:click={showQREditor} height="20px" width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="qrcode" class="marginer svg-inline--fa fa-qrcode fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 224h192V32H0v192zM64 96h64v64H64V96zm192-64v192h192V32H256zm128 128h-64V96h64v64zM0 480h192V288H0v192zm64-128h64v64H64v-64zm352-64h32v128h-96v-32h-32v96h-64V288h96v32h64v-32zm0 160h32v32h-32v-32zm-64 0h32v32h-32v-32z"></path></svg>
        <Link to="analytics/{data.analyticsCode}">
            <svg width="15px" height="15px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                <g id="Screens" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="shrunk" transform="translate(-1229.000000, -819.000000)" fill-rule="nonzero">
                        <g id="Group-4">
                            <g id="Group-5-Copy" transform="translate(760.000000, 790.000000)">
                                <g id="Group-Copy" transform="translate(420.000000, 0.000000)">
                                    <g id="ic-baseline-bar-chart" transform="translate(42.000000, 22.000000)">
                                        <g id="Icon" fill="black">
                                            <path d="M7.5,13.8 L12,13.8 L12,28.5 L7.5,28.5 L7.5,13.8 Z M15.9,7.5 L20.1,7.5 L20.1,28.5 L15.9,28.5 L15.9,7.5 Z M24.3,19.5 L28.5,19.5 L28.5,28.5 L24.3,28.5 L24.3,19.5 Z" id="Icon-Shape"></path>
                                        </g>
                                        <rect id="ViewBox" x="0" y="0" width="36" height="36"></rect>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        </Link>
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
                    <div class="container-fluid kz-div-form1 text-center">
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
                            <QRCode codeValue="{API.KZILLA_URL}{data.shortCode}" squareSize=250/>    
                        </div>                    
                    </div>
                    <div class="text-center">
                        <a id="{data.shortCode}" href=" " on:click={QRdownload} download="qr.png"><button class="kz-download">Download</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <SvelteToast/>
</div>


