<script>
  export let analyticsData;
  export let heading;
</script>

<style>
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }

  .lightbg {
    color: #000000;
    background-color: #f5f5f5;
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
    width: 100%;
  }
  .smallbox {
    margin-top: 30px;
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .smallbox::-webkit-scrollbar {
    width: 8px;
  }
  .smallbox::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ul li:nth-child(4n + 1) .progress-bar,
  ul li:nth-child(4n + 3) .progress-bar {
    background-color: #54a870;
  }
  ul li:nth-child(4n + 2) .progress-bar {
    background-color: #f0634d;
  }
  ul li:nth-child(4n + 4) .progress-bar,
  ul li:nth-child(4n + 5) .progress-bar {
    background-color: #26baff;
  }
  .label-p,
  .value-p {
    font-family: UniSansBook;
  }
</style>

{#if analyticsData != null}
  <div class="box lightbg smallbox">
    <p class="heading">{heading}</p>
    <ul>
      {#each analyticsData.data as { label, value }}
        <li>
          <div class="row">
            <div class="col-sm-4 label-p">{label}</div>
            <div class="col-sm-6">
              <div class="progress">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width:{(value / analyticsData._total) * 100}%"
                  aria-valuenow={(value / analyticsData._total) * 100}
                  aria-valuemax="100" />
              </div>
            </div>
            <div class="col-sm-2 value-p">{value}</div>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{/if}
