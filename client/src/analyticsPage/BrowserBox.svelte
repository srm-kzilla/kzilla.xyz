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
    padding-bottom: 40px;
    display: flex;
    align-items: flex-start;
  }
  .browser-box {
    height: 160px;
    width: 160px;
    margin-right: 30px;
    position: relative;
  }
  .browser-box i {
    font-size: 35px;
  }
  .browser-box .browser-count {
    position: absolute;
    bottom: 10px;
    left: 12px;
    font-weight: 400;
    font-size: 35px;
    font-family: UniSansBook;
  }
  @media (max-width: 768px) {
    .browser-row {
      margin-top: 40px;
      padding-bottom: 40px;
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .browser-box {
      height: 178px;
      flex: 2 0 40%;
      width: 45%;
      flex-grow: inherit;
      margin-bottom: 8px;
    }
  }
</style>

{#if data.reports.length != 0}
  <div class="browser-row">

    {#each data.reports[2].data as { label, value }}
      <div class="box blackbg browser-box">
        <p class="heading">{label}</p>
        <i class="fa fa-{label.toLowerCase()}" />
        <h4 class="browser-count">{value}</h4>
      </div>
    {/each}

  </div>
{/if}
