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

  window.$('#kz-form').keydown(function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        return false;
    }
  });

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
    if(longUrl){
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
    padding-left: 150px;
    padding-right: 150px;
  }
  .kz-input {
    font-family: UniSansBook;
    width: 85%;
    background-color: #f5f5f5;
    color: #696969;
    padding: 15px 40px 15px 40px;
    border-radius: 10px;
    border-style: none;
    overflow-x: auto;
  }
  .kz-enter{
    height: 2.5em;
    font-size: 32px;
  }
  .kz-input-done {
    width: 98%;
  }
  .shrinker {
    font-family: UniSansHeavy;
    font-size: 20px;
    color: var(--white);
    background-color: var(--black);
    padding: 15px 40px 15px 40px;
    text-transform: uppercase;
    border-radius: 10px;
  }
  .kz-enter-btn{
    padding: 30px 40px 25px 40px;
  }
  .shrinker:hover {
    color: var(--white);
    text-decoration: none;
  }
  .kz-shrinked-text {
    /* margin-top: 10px; */
    margin-left: 0px;
    background-color: #f5f5f5;
    color: #696969;
    padding: 15px 40px 15px 40px;
    border-radius: 10px;
    border-style: none;
    /* height: 55px; */
    overflow: auto;
  }
  .kz-alternate {
    min-width: 80px;
    height: 4.7em;
    margin-left: 10px;
    color: var(--white);
    background-color: var(--black);
    padding: 13px 20px 13px 20px;
    text-transform: uppercase;
    border-radius: 10px;
  }
  .delete {
    display: none;
  }
  .kz-error{
    color: var(--orange);
    font-family: UniSansHeavy;
    font-size: 1.5rem;
  }
  
  @media(max-width: 1365px){
      .kz-input{
          width: 75%;
      }
      .kz-form-des{
        margin-top: 4.5vh;
      }
  }
  @media (max-width: 1100px) {
    .kz-form-des {
      margin-bottom: 100px;
    }
  }
  @media (max-width: 920px) {
    .kz-form-des {
      padding-left: 5vw;
      padding-right: 20px;
    }
    .kz-input{
        width: 75%;
    }
  }
  @media (max-width: 920px) {
    .kz-form-des {
      padding-left: 5vw;
      padding-right: 20px;
    }
    .kz-input{
        width: 70%;
    }
  }
  @media (max-width: 550px) {
    .kz-input {
      padding: 8px 20px 8px 20px;
      border-radius: 7px;
      width: 75%;
    }
    .kz-enter{
      height: 60px;
      font-size: 20px;
    }
    .shrinker {
      padding: 20px 10px 20px 10px;
      border-radius: 7px;
      font-size: 18px;
    }
    .kz-shrinked-text {
      overflow-x: auto;
      padding: 8px 20px 8px 20px;
    }
    .kz-alternate {
      padding: 15px 5px 15px 5px;
      min-width: 70px !important;
      max-height: 3.7rem;
      font-size: 15px;
    }
    .kz-form-des {
      margin-bottom: 0px;
    }
  }
  @media (max-width: 392px) {
    .kz-input{
        width: 70%;
    }
  }
  @media (max-height: 640px) {
    .kz-form-des {
      margin-top: 10vh;
    }
  }
</style>

<div class="container-fluid kz-form-des">

  {#if !data}
    <form id="kz-form" class={tapped ? 'delete' : ''}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input kz-enter" />
      <a role="button" on:click={buttonClick} class="shrinker kz-enter-btn">Shrink</a>
    </form>

  {:else if !error}
    <div id="shrunkLink" class="container-fluid" style="margin-top: 60px; padding: 0px;">
      <div class="container-fluid kz-input kz-input-done text-center kz-enter" style="margin-right: 0px; margin-bottom: 30px; width: 100%;">
        {data.longUrl}
      </div>
      <div class="row justify-content-center" style="margin-left: 0px; padding: 0px;">
        <div class="col col-9 col-md-4 col-xl-5 text-center" style="padding: 0px;">
          <p class="kz-shrinked-text kz-enter" id="shrink">{API.KZILLA_URL}{data.shortCode}</p>
        </div>
        <div class="col col-3 col-md-2 col-xl-1 text-center" style="padding: 0px;">
          <button class="kz-alternate" on:click={copyExec}>
            <img height="20px" src="ic-round-content-copy.svg" alt="copy-btn" />
          </button>
        </div>
        <div class="col col-9 col-md-4 col-xl-5 text-center" style="padding: 0px;">
          <div class="kz-shrinked-text kz-enter" style=" ">{API.ANALYTICS_URL}{data.analyticsCode}</div>
        </div>
        <div class="col col-3 col-md-2 col-xl-1 text-center" style="padding: 0px;">
          <Link to="analytics/{data.analyticsCode}">
            <button class="kz-alternate">
              <img height="15px" src="./ic-baseline-bar-chart.svg" alt="stats-btn" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  {:else}
    <div class="container-fluid kz-error">
      <span>{error}</span>
    </div>
  {/if}
</div>
