<script>
  export let data;
</script>

<style>
  .analytics-container {
    margin-top: 50px;
    width: 100%;
  }
  .analytics-container .row {
    margin-left: 20px;
  }
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }
  .blackbg {
    background-color: #000000;
    color: #f5f5f5;
  }
  .lightbg {
    color: #000000;
    background-color: #f5f5f5;
  }
  /* P1 */
  .clicks-box {
    height: 80px;
    max-width: 120px;
  }
  .clicks-box p {
    margin-bottom: 0;
  }
  .heading {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  .progress {
    margin-top: 10px;
    height: 7px !important;
  }
  ul li:nth-child(1) .progress-bar,
  ul li:nth-child(3) .progress-bar {
    background-color: #54a870;
  }
  ul li:nth-child(4) .progress-bar,
  ul li:nth-child(5) .progress-bar {
    background-color: #26baff;
  }
  .os-box {
    width: 120%;
  }
</style>

<!-- Navbar -->
<!-- Analytics -->
<!-- Part 1 -->
<div class="container analytics-container">
  <!-- OS -->
  <div class="row">
    <div class="col-md-3 blackbg clicks-box box">
      <p class="heading">Clicks</p>
      <h4>{data.clicks}</h4>
    </div>
    <div class="col-md-9">
      <div class="box lightbg os-box">
        <p class="heading">Operating System</p>
        <ul>
          {#each data.reports[3].data as { label, value }}
            <li>
              <div class="row">
                <div class="col-sm-4">{label}</div>
                <div class="col-sm-6">
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width:{(value / data.reports[3]._total) * 100}%"
                      aria-valuenow={(value / data.reports[3]._total) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100" />
                  </div>
                </div>
                <div class="col-sm-2">{value}</div>
              </div>
            </li>
          {/each}
        </ul>
        <ul />
      </div>
    </div>
  </div>
</div>
