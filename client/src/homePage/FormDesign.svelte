<script>

  import { Router, Link, Route } from "svelte-routing";
  import { shrinkUrlService } from '../services/APIservice';
  import { API } from '../constants';

  let tapped = false;
  let shortURL = "HeL0OlUc45";
  let analyticsCode = "YmcA5s";
  let longUrl = "";
  let data;
  let error;
  let myShrinker;

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
      myShrinker.innerHTML = '<div class="spinner-border text-light"><span class="sr-only">Loading...</span></div>';
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
    margin-top: 10vh;
    padding-left: 8vw;
    padding-right: 8vw;
  }
  .kz-input {
    font-family: UniSansBook;
    font-size: 2.5vh;
    width: 75.5vw;
    height: 8vh;
    line-height: 8vh;
    background-color: #f5f5f5;
    color: #696969;
    padding: 0px 10px 0px 10px;
    border-radius: 10px;
    border-style: none;
    overflow-x: auto;
  }
  .kz-input-done {
    width: 84vw;
    margin-right: 0px; 
    margin-bottom: 30px;
  }
  .shrinker {
    font-family: UniSansHeavy;
    color: var(--white);
    width: 8vw;
	  height: 8vh;
	  line-height: 8vh;
	  font-size: 2.5vh;
    background-color: var(--black);
    border-radius: 10px;
    float: right;
  }
  .shrinker:hover {
    color: var(--white);
    text-decoration: none;
  }
  .kz-shrinked-text {
    background-color: #f5f5f5;
    color: #696969;
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
  .kz-shrinked-text-2{
    background-color: #f5f5f5;
    color: #696969;
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
    .shrinker{
      width: 12vw;
    }
    .kz-shrinked-text {
      width: 31.5vw;
    }
    .kz-shrinked-text-2{
      width: 32vw;
    }
    .kz-alternate {
      width: 7vw;
    }
  }
  @media (max-width: 1100px) {
    .kz-form-des {
      margin-bottom: 100px;
    }
  }
  @media(max-width: 1000px){
    .kz-input{
      width: 67vw;
    }
    .shrinker{
      width: 16vw;
    }
    .kz-input-done {
      width: 84vw;
    }
    .kz-shrinked-text {
      width: 30.5vw;
    }
    .kz-shrinked-text-2{
      width: 31.5vw;
    }
    .kz-alternate {
      width: 9vw;
      margin-right: 3vw;
    }
  }
  @media (max-width: 920px) {
    .kz-form-des {
      padding-left: 5vw;
      padding-right: 5vw;
    }
    .kz-input{
      width: 73vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 33.5vw;
    }
    .kz-shrinked-text-2{
      width: 34vw;
    }
    .kz-alternate {
      width: 9vw;
    }
  }
  @media(max-width: 760px){
    .kz-input{
      width: 63.5vw;
    }
    .shrinker{
      width: 25vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 78vw;
    }
    .kz-shrinked-text-2{
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
    .kz-shrinked-text {
      width: 76vw;
    }
    .kz-shrinked-text-2{
      width: 76vw;
    }
    .kz-alternate {
      width: 12vw;
    }
  }
  @media(max-width: 470px){
    .kz-input{
      width: 59.5vw;
    }
    .shrinker{
      width: 29vw;
    }
    .kz-input-done {
      width: 90vw;
    }
    .kz-shrinked-text {
      width: 72vw;
    }
    .kz-shrinked-text-2{
      width: 72vw;
    }
    .kz-alternate {
      width: 16vw;
    }
  }
</style>

<div class="container-fluid kz-form-des">

  {#if !data}
    <form id="kz-form" on:submit|preventDefault={buttonClick}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input " />
      <div role="button" on:click={buttonClick} bind:this={myShrinker} class={tapped?"shrinker text-center":"shrinker text-center"}>Shrink</div>
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
      
      <div class="kz-shrinked-text-2" style="">{API.ANALYTICS_URL}{data.analyticsCode}</div>
      
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
