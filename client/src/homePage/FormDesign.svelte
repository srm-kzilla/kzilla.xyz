<script>

  import { Router, Link, Route } from "svelte-routing";
  import { shrinkUrl } from '../services/longUrl';

  const kzilla = "kzilla.xyz/";
  const analytics = "kzilla.xyz/analytics/";
  let tapped = false;
  let shortURL = "HeL0OlUc45";
  let analyticsCode = "YmcA5s";
  let longUrl = "";
  let data;

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
    e.preventDefault();
    grecaptcha.ready(async function() {
      const url = "https://kzilla-xyz.herokuapp.com/api/v1/links";
      const siteKey = "6LfQuOoUAAAAAJ6GHFvllghVXunXJYfpezpEJOEp";
      const token = await grecaptcha.execute(
        siteKey,
        { action: "shrink" }
      );
      data = await shrinkUrl( token, longUrl );
    });
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
    height: 80px;
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
    height: 55px;
    overflow: auto;
  }
  .kz-alternate {
    min-width: 80px;
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
  
  @media(max-width: 1350px){
      .kz-input{
          width: 75%;
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
      min-width: 80px !important;
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

  {:else}
    <div id="shrunkLink" class="container-fluid" style="margin-top: 60px; padding: 0px;">
      <div class="container-fluid kz-input kz-input-done text-center" style="margin-right: 0px; margin-bottom: 30px; width: 100%;">
        {data.longUrl}
      </div>
      <div class="row justify-content-center" style="margin-left: 0px; padding: 0px !important;">
        <div class="col col-9 col-md-4 col-xl-5 text-center" style="padding: 0px !important;">
          <p class="kz-shrinked-text" id="shrink">{kzilla}{data.shortCode}</p>
        </div>
        <div class="col col-3 col-md-2 col-xl-1 text-center" style="padding: 0px !important;">
          <button class="kz-alternate" on:click={copyExec}>
            <img height="20px" src="ic-round-content-copy.svg" alt="copy-btn" />
          </button>
        </div>
        <div class="col col-9 col-md-4 col-xl-5 text-center" style="padding: 0px !important;">
          <div class="kz-shrinked-text" style=" ">{analytics}{data.analyticsCode}</div>
        </div>
        <div class="col col-3 col-md-2 col-xl-1 text-center" style="padding: 0px !important;">
          <button class="kz-alternate">
            <Link to="analytics/{data.analyticsCode}"><img height="15px" src="./ic-baseline-bar-chart.svg" alt="stats-btn" /></Link>
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
