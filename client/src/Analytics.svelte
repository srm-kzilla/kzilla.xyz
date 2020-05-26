<script>
  import { onMount } from "svelte";
  const data = (async () => {
    const response = await fetch(
      "https://kzilla-xyz.herokuapp.com/api/v1/analytics/DTpfX?startDate=2020-01-01&endDate=2020-05-16"
    );
    return await response.json();
  })();
  let osData = [
    { name: "Windows", clicks: "200", percent: "20", classname: "bg-green" },
    { name: "Windows", clicks: "200", percent: "20", classname: "bg-red" },
    { name: "Windows", clicks: "200", percent: "20", classname: "bg-green" },
    { name: "Windows", clicks: "200", percent: "20", classname: "bg-blue" },
    { name: "Windows", clicks: "200", percent: "20", classname: "bg-blue" },
  ];
  let browserData = [
    {
      name: "Chrome",
      iconname: "fa-chrome",
      clicks: "200",
    },
    {
      name: "Firefox",
      iconname: "fa-firefox",
      clicks: "200",
    },
    {
      name: "Safari",
      iconname: "fa-safari",
      clicks: "200",
    },
    {
      name: "Edge",
      iconname: "fa-edge",
      clicks: "200",
    },
    {
      name: "Others",
      iconname: "",
      clicks: "200",
      othersclass: "other-box",
    },
  ];
</script>

<style>
  .navigator {
    position: relative;
    height: 100px;
  }
  .kz-logo {
    position: absolute;
    height: 70px;
    left: 30px;
    top: 20px;
  }
  .date-box {
    width: 160px;
    height: 50px;
    border-radius: 16px;
    background-color: #f5f5f5;
    padding: 10px 18px;
    margin: 10px;
  }
  .date-box h4 {
    font-size: 20px;
  }
  .dropdown {
    width: 210px;
    padding: 10px 18px;
  }
  .dropdown .dropdown-toggle {
    height: 50px !important;
    width: 100%;
    border-radius: 16px;
    background-color: #000000;
  }
  .dropdown-item {
    text-transform: capitalize;
    color: #000;
    font-weight: 600;
    transition: 0.13s ease-in all;
    border: 1px solid transparent;
  }
  .dropdown-item:active {
    color: #f5f5f5;
    background-color: #000;
    box-shadow: none;
    outline: none;
    border: 1px solid #000;
  }
  .dropdown-item:focus {
    box-shadow: none;
    outline: none;
    border: 1px solid #000;
  }
  .dropdown-menu.show {
    background-color: #f5f5f5;
    color: #000;
  }

  /* Hero */
  .hero-tag {
    font-size: 70px;
    margin-top: 100px;
    position: relative;
    z-index: 10;
  }
  .hero-tag::after {
    position: absolute;
    content: "";
    width: 160px;
    height: 18px;
    background-color: #54a870;
    bottom: 0;
    left: 8.5%;
    z-index: -1;
  }
  .hero-div {
    margin-top: 112px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 16px;
    max-width: 400px;
    max-height: 65px;
  }
  /* Part 1 */
  .analytics-container {
    margin-top: 50px;
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
    height: 120px;
    width: 200px;
  }
  .clicks-box p {
    margin-bottom: 30px;
  }
  .clicks-box h4 {
    font-size: 40px;
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
  .os-box {
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
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
  .bg-green {
    background-color: #54a870 !important;
  }
  .bg-blue {
    background-color: #26baff !important;
  }
  .bg-red {
    background-color: #f0634d !important;
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
    .clicks-box {
      margin-bottom: 30px;
    }
    .browser-box {
      height: 160px;
      width: 160px;
      margin-left: 40px;
      margin-bottom: 20px;
    }
  }
</style>

<!-- Navbar -->
<div class="navigator">
  <div class="row">
    <div class="col-md-6">
      <img class="kz-logo" src="./icon.svg" alt="" />
    </div>
    <div class="col-md-2">
      <div class="date-box">
        <h4>May 31,2000</h4>
      </div>
    </div>
    <div class="col-md-2">
      <div class="date-box">
        <h4>May 31,2000</h4>
      </div>
    </div>
    <div class="col-md-2">
      <div class="dropdown">
        <button
          class="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Custom
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item">Today</a>
          <a class="dropdown-item">Last 3 days</a>
          <a class="dropdown-item">This Week</a>
          <a class="dropdown-item">This Month</a>
          <a class="dropdown-item">Yesterday</a>
          <a class="dropdown-item">Custom</a>
        </div>
      </div>
    </div>
  </div>
</div>
{#await data}
  <!-- Analytics -->
{:then data}
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 class="hero-tag">Analytics</h1>
      </div>
      <div class="col-md-6">
        <div class="hero-div">
          <h6 class="hero-url">kzill.xyz/somerandom</h6>
        </div>
      </div>
    </div>
  </div>
  <!-- Part 1 -->
  <div class="container analytics-container">
    <!-- OS -->
    <div class="row">
      <div class="col-md-3">
        <div class="blackbg clicks-box box">
          <p class="heading">Clicks</p>
          <h4>{data.clicks}</h4>
        </div>
      </div>
      <div class="col-md-9">
        <div class="box lightbg os-box">
          <p class="heading">Operating System</p>
          <ul>
            {#each data.reports[3].data as { label, value }}
              <li>
                <div class="row">
                  <div class="col-sm-4">{label}</div>
                  <div class="col-sm-7">
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
                  <div class="col-sm-1">{value}</div>
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
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
    <!-- Browser -->
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
  </div>
  }
{:catch error}
  <p>An error occurred!</p>
{/await}
