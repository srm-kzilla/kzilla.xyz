<script>
  export let data;
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
  .smallbox1 {
    margin-top: 30px;
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .smallbox2 {
    margin-top: 30px;
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>

<!-- 2 small boxes -->
<div class="row">
  <div class="col-md-6">
    <div class="box lightbg smallbox1">
      <p class="heading">Sources</p>
      <ul>
        {#each data.reports[0].data as { label, value }}
          <li>
            <div class="row">
              <div class="col-sm-4">{label}</div>
              <div class="col-sm-6">
                <div class="progress">
                  <div
                    class="progress-bar "
                    role="progressbar"
                    style="width: 57%"
                    aria-valuenow="57"
                    aria-valuemin="0"
                    aria-valuemax="100" />
                </div>
              </div>
              <div class="col-sm-2">{value}</div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <div class="col-md-6">
    <div class="box lightbg smallbox2">
      <p class="heading">City</p>
      <ul>
        {#each data.reports[1].data as { label, value }}
          <li>
            <div class="row">
              <div class="col-sm-4">{label}</div>
              <div class="col-sm-6">
                <div class="progress">
                  <div
                    class="progress-bar"
                    role="progressbar"
                    style="width: 57%"
                    aria-valuenow="57"
                    aria-valuemin="0"
                    aria-valuemax="100" />
                </div>
              </div>
              <div class="col-sm-2">{value}</div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
