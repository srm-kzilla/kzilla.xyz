<script>

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
    padding-left: 0px;
  }
  .kz-input {
    width: 68%;
    background-color: #f5f5f5;
    color: #696969;
    padding: 15px 40px 15px 40px;
    border-radius: 10px;
    border-style: none;
    overflow-x: auto;
  }
  .kz-input-done {
    width: 98%;
  }
  .shrinker {
    font-size: 20px;
    color: #ffffff;
    background-color: #000000;
    padding: 15px 40px 15px 40px;
    text-transform: uppercase;
    border-radius: 10px;
  }
  .shrinker:hover {
    color: #ffffff;
    text-decoration: none;
  }
  .kz-shrinked-text {
    margin-top: 20px;
    margin-left: 0px;
    background-color: #f5f5f5;
    color: #696969;
    padding: 15px 40px 15px 40px;
    border-radius: 10px;
    border-style: none;
    overflow: hidden;
  }
  .kz-alternate {
    min-width: 100px;
    color: #ffffff;
    background-color: #000000;
    padding: 11px 20px 11px 20px;
    text-transform: uppercase;
    border-radius: 10px;
    margin-top: 20px;
  }
  .delete {
    display: none;
  }
  @media (max-width: 1100px) {
    .kz-form-des {
      margin-bottom: 100px;
    }
  }
  @media (max-width: 550px) {
    .kz-input {
      padding: 8px 20px 8px 20px;
      border-radius: 7px;
    }
    .shrinker {
      padding: 8px 10px 8px 10px;
      border-radius: 7px;
      font-size: 18px;
    }
    .kz-shrinked-text {
      overflow-x: auto;
      padding: 8px 20px 8px 20px;
    }
    .kz-alternate {
      padding: 5px 5px 5px 5px;
      width: 50px !important;
      font-size: 15px;
    }
    .kz-form-des {
      margin-bottom: 0px;
    }
  }
  @media (max-height: 640px) {
    .kz-form-des {
      margin-top: 10vh;
    }
  }
</style>

<div class="container text-center kz-form-des">

  {#if !data}
    <form id="kz-form" class={tapped ? 'delete' : ''}>
      <input type="text" bind:value={longUrl} required placeholder="Enter your link here..." class="kz-input" />
      <a on:click={buttonClick} class="shrinker">Shrink</a>
    </form>

  {:else}
    <div id="shrunkLink" class="container-fluid text-center" style="margin-top: 30px; padding: 0px;">
      <div class="container-fluid kz-input kz-input-done" style="margin-right: 0px; width: 100%;">
        {data.longUrl}
      </div>
      <div class="row justify-content-center" style="margin-left: 10px; padding: 0px !important;">
        <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
          <p class="kz-shrinked-text" id="shrink">{kzilla}{data.shortCode}</p>
        </div>
        <div class="col col-4 col-md-2" style="padding: 0px !important;">
          <button class="kz-alternate" on:click={copyExec}>
            <img height="28px" src="ic-round-content-copy.svg" alt="copy-btn" />
          </button>
        </div>
        <div class="col col-8 col-md-4 text-center" style="padding: 0px !important;">
          <div class="kz-shrinked-text" style=" ">{analytics}{data.analyticsCode}</div>
        </div>
        <div class="col col-4 col-md-2" style="padding: 0px !important;">
          <button class="kz-alternate">
            <img height="28px" src="./ic-baseline-bar-chart.svg" alt="stats-btn" />
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
