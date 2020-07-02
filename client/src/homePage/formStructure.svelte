<script>

  import { Router, Link, Route } from "svelte-routing";
  import { shrinkUrlService } from '../services/APIservice';
  import { API } from '../constants';
  import Button from "../components/button.svelte";

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
    $temp.val(window.$("#shrink").text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  //Attach URL shortener API...

  function buttonClick(e) {
    tapped = true;
    if(longUrl){
      // myShrinker.innerHTML = '<div class="spinner-border text-light"><span class="sr-only">Loading...</span></div>';
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
  .kz-error{
    color: var(--orange);
    font-family: UniSansHeavy;
    font-size: 1.5rem;
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
      width: 66.5vw;
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
      width: 58vw;
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
      width: 54vw;
    }
    .kz-input-done {
      width: 90vw;
    }
  }
</style>

<div class="container-fluid kz-form-des">

  {#if !data}
    <form id="kz-form" on:submit|preventDefault={buttonClick}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input"/>
      <Button on:buttonClick={buttonClick} {button_content}/>
    </form>

  {:else if !error}
    <div id="shrunkLink" class="container-fluid" style="margin-top: 60px; padding: 0px;">
      <div class="container-fluid text-center kz-input kz-input-done">
        {data.longUrl}
      </div>

      <div class="kz-shrinked-text" id="shrink">{API.KZILLA_URL}{data.shortCode}</div>
      
      <button class="kz-alternate" on:click={copyExec}>
        <img height="20px" src="ic-round-content-copy.svg" alt="copy-btn" />
      </button>
      
      <div class="kz-shrinked-text-alternate" style="">{API.ANALYTICS_URL}{data.analyticsCode}</div>
      
      <Link to="analytics/{data.analyticsCode}">
        <button class="kz-alternate" style="margin-right: 0;">
          <img height="15px" src="./ic-baseline-bar-chart.svg" alt="stats-btn" />
        </button>
      </Link>

    </div>
  {:else}
    <div class="container-fluid kz-error">
      <span>{error}</span>
    </div>
  {/if}
</div>
