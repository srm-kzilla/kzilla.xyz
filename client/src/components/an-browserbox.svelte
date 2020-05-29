<script>
  export let data;
</script>

<style>
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }
  .blackbg {
    background-color: #000000;
    color: #f5f5f5;
  }
  .heading {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
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
    font-size: 50px;
  }
  .browser-box .browser-count {
    font-weight: 400;
    margin-top: 20px;
  }
  .smallbox1 .row .col-md-1 {
    margin-left: 0;
    padding-left: 0;
  }
  .smallbox2 .row .col-md-1 {
    margin-left: 0;
    padding-left: 0;
  }
  @media (max-width: 768px) {
    .browser-box {
      height: 160px;
      width: 160px;
      margin-left: 40px;
      margin-bottom: 20px;
    }
  }
</style>

<div class="browser-row row">
  <div class="col-md-1" />
  {#each data.reports[2].data as { label, value }}
    <div class="col-md-2 col-xs-6 mx-auto ">
      <div class="box blackbg browser-box">
        <p class="heading">{label}</p>
        <i class="fa fa-chrome" />
        <h4 class="browser-count">{value}</h4>
      </div>
    </div>
  {/each}
</div>
<div class="col-md-1" />
