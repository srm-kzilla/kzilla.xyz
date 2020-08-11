<script>
  export let data;
</script>

<style>
  .analytics-container {
    margin-top: 50px;
  }
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }
  .blackbg {
    background-color: var(--black);
    color: #f5f5f5;
  }
  .lightbg {
    color: #000000;
    background-color: #f5f5f5;
  }
  /* P1 */
  .clicks-box {
    height: 110px;
    margin-top: 10px;
    max-width: 140px;
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
    font-family: UniSansHeavy;
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
  .clicks-p {
    font-family: UniSansBook;
    padding-top: 27px;
    font-size: 32px;
  }
  .label-p,
  .value-p {
    font-family: UniSansBook;
  }
  @media (max-width: 768px) {
    .clicks-box {
      margin-bottom: 20px;
    }
    .analytics-container {
      margin-top: 20px;
    }
  }
</style>

<div class="analytics-container">
  <div class="row">
    <div class="col-md-2">
      <div class="blackbg clicks-box box">
        <p class="heading">Clicks</p>
        <h4 class="clicks-p">{data.clicks}</h4>
      </div>
    </div>
    {#if data.reports.length != 0}
      <div class="col-md-10">
        <div class="box lightbg ">
          <p class="heading">Operating System</p>
          <ul>

            {#each data.reports[3].data as { label, value }}
              <li>
                <div class="row">
                  <div class="col-sm-4 label-p">{label}</div>
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
                  <div class="col-sm-2 value-p">{value}</div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/if}
  </div>
</div>
