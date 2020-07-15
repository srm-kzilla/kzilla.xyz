<script>
  export let data;
</script>

<style>
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }
  .blackbg {
    background-color: var(--black);
    color: #f5f5f5;
  }
  .heading {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-family: UniSansHeavy;
    font-size: 12px;
    margin-bottom: 20px;
  }
  .browser-row {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .browser-box {
    height: 160px;
  }
  .browser-box i {
    font-size: 35px;
  }
  .browser-box .browser-count {
    font-weight: 400;
    margin-top: 20px;
    font-size: 35px;
    font-family: UniSansBook;
  }
  @media (max-width: 768px) {
    .browser-box {
      height: 160px;
      width: 160px;
      margin: 15px auto;
    }
  }
</style>

<div class="browser-row row">
  {#if data.reports.length != 0}
    {#each data.reports[2].data as { label, value }}
      <div class="col-md-2 col-xs-6 ">
        <div class="box blackbg browser-box">
          <p class="heading">{label}</p>
          <i class="fa fa-chrome" />
          <h4 class="browser-count">{value}</h4>
        </div>
      </div>
    {/each}
  {/if}
</div>
