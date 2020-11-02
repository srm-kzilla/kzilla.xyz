<script>

  import { Router, Link, Route } from "svelte-routing";
  import { shrinkUrlService } from '../services/APIservice';
  import { createEventDispatcher } from "svelte";
  import { API } from '../constants';
  import Button from "../components/Button.svelte";

  
  const dispatch = createEventDispatcher();

  let button_content = "Shrink";

  let tapped = false;
  let shortURL = "HeL0OlUc45";
  let analyticsCode = "YmcA5s";
  let longUrl = "";
  let data;
  let error;

  //Copy Button functionality...

  function copyExec() {
    var $temp = window.$("<input>");
    window.$("body").append($temp);
    $temp.val("https://" + window.$("#shrink").text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  //Attach URL shortener API...

  function buttonClick(e) {
    tapped = true;
    if(longUrl){
      button_content = "Shrunk";
      e.preventDefault();
      grecaptcha.ready(async function() {
      const url = "https://kzilla-xyz.herokuapp.com/api/v1/links";
      const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";
      const token = await grecaptcha.execute(
        siteKey,
        { action: "shrink" }
      );
      data = await shrinkUrlService( token, longUrl );
      if(!data.linkId){
        error = 'The URL you entered is not valid. Please refresh and try again with a valid URL.';
        }
      else{
        error = "";
        dispatch("submission");
        }
      });
    }
  }

</script>

<style>
  .kz-form-des {
    margin-top: 15vh;
    padding-left: 8vw;
    padding-right: 8vw;
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
    margin-right: 5vw;
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
  .kz-display-none{
    display: none;
  }
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
      margin-right: 3vw;
    }
  }
  @media (max-width: 920px) {
    .kz-input{
      width: 71vw;
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
      margin-left: 2vw;
      margin-bottom: 1vh;
      width: 10vw;
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
    .kz-input{
      width: 90vw;
    }
    .kz-display-none{
      display: block;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 76vw;
    }
    .kz-shrinked-text-alternate{
      width: 76vw;
    }
    .kz-alternate {
      width: 12vw;
    }
  }
  @media(max-width: 470px){
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
      width: 16vw;
    }
  }
  @media(max-width: 400px){
    .kz-input{
      width: 90vw;
    }
    .kz-input-done {
      width: 90vw;
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
    <form id="kz-form" on:submit|preventDefault={buttonClick}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input"/>
      <div class="kz-display-none">
        <br>
      </div>
      <Button on:submission on:buttonClick={buttonClick} {button_content}/>
    </form>

  {:else if !error}
    <div id="shrunkLink" class="container-fluid" style="margin-top: 60px; padding: 0px;">
      <div class="container-fluid text-center kz-input kz-input-done">
        {data.longUrl}
      </div>
      <div class="kz-shrinked-text" id="shrink">
        {API.KZILLA_URL}{data.shortCode}
      </div>
      
      <button class="kz-alternate" on:click={copyExec}>
        <img height="20px" src="ic-round-content-copy.svg" alt="copy-btn" />
      </button>
      
      <div class="kz-shrinked-text-alternate" style="">
        {API.ANALYTICS_URL}{data.analyticsCode}
      </div>
      
      <Link to="analytics/{data.analyticsCode}">
        <button class="kz-alternate" style="margin-right: 0;">
          <img height="15px" src="./ic-baseline-bar-chart.svg" alt="stats-btn" />
        </button>
      </Link>

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
</div>
