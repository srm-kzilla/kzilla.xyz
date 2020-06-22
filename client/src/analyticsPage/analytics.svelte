<script>
  import { onMount } from "svelte";
  import BrowserBox from "./BrowserBox.svelte";
  import SmallBox from "./SmallBox.svelte";
  import UpperRow from "./UpperRow.svelte";
  import HeroTag from "./HeroTag.svelte";
  // Variables declaration
  var data;
  let selectedrange;
  var dateObj = new Date();
  dateObj.setDate(dateObj.getDate());
  var startdate = formatDate(dateObj);
  var enddate = startdate;
  var analyticsId = window.location.href.split("analytics/")[1];

  //   Initialize onMount
  onMount(async function initialise() {
    data = await getData();
  });
  // Changed Start Date using custom
  var changeStartDate = async value => {
    startdate = value;
    data = await getData();
  };
  // Change End Date using custom
  var changeEndDate = async value => {
    enddate = value;
    data = await getData();
  };
  //Changed Dates Range
  var dateschanged = async value => {
    enddate = formatDate(dateObj);
    if (value != "custom") {
      if (value == "today") {
        dateObj.setDate(dateObj.getDate());
      } else if (value == "yesterday") {
        dateObj.setDate(dateObj.getDate() - 1);
      } else if (value == "threedays") {
        dateObj.setDate(dateObj.getDate() - 2);
      } else if (value == "month") {
        dateObj.setDate(dateObj.getDate() - 29);
      } else if (value == "week") {
        dateObj.setDate(dateObj.getDate() - 6);
      }
      startdate = formatDate(dateObj);
    }
    data = await getData();
  };
  // Format the date
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  // Api call to get data from api
  async function getData() {
    var response = await fetch(
      `https://kzilla-xyz.herokuapp.com/api/v1/analytics/${analyticsId}?startDate=${startdate}&endDate=${enddate}`
    );
    return await response.json();
  }
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
  .form-group {
    position: absolute;
    right: 20px;
    top: 10px;
  }
  select {
    background-color: #000000;
    color: #fff;
    padding: 15px;
    height: 60px;
    width: 150px;
    border-radius: 16px;
  }
  .startdate,
  .enddate {
    background-color: #f5f5f5;
    height: 60px;
    width: 160px;
    border-radius: 16px;
    border: none;
    padding-left: 10px;
  }
  .startdate {
    position: absolute;
    right: 360px;
    top: 10px;
  }
  .enddate {
    position: absolute;
    right: 180px;
    top: 10px;
  }
  @media (max-width: 768px) {
    .startdate {
      position: absolute;
      left: 10px;
      top: 80px;
    }
    .enddate {
      position: absolute;
      right: 10px;
      top: 80px;
    }
  }
</style>

<div class="navigator">
  <img class="kz-logo" src="./icon.svg" alt="" />
</div>
{#if selectedrange == 'custom'}
  <input
    class="startdate"
    type="date"
    bind:value={startdate}
    on:change={changeStartDate(startdate)} />
  <input
    class="enddate"
    type="date"
    bind:value={enddate}
    on:change={changeEndDate(enddate)} />
{/if}
<div class="form-group">
  <select
    class="form-control"
    id="exampleFormControlSelect1"
    bind:value={selectedrange}
    on:change={dateschanged(selectedrange)}>
    <option value="today">Today</option>
    <option value="threedays">Last 3 days</option>
    <option value="week">This Week</option>
    <option value="month">This Month</option>
    <option value="yesterday">Yesterday</option>
    <option value="custom">Custom</option>
  </select>

</div>
{#if data}
  <div class="container">
    <HeroTag />
    <UpperRow {data} />
    <div class="row">
      <div class="col-md-6">
        <SmallBox sdata={data.reports[0]} heading={'source'} />
      </div>
      <div class="col-md-6">
        <SmallBox sdata={data.reports[1]} heading={'city'} />
      </div>
    </div>
    <BrowserBox {data} />
    {#if data.reports.length <= 0}
      <div class="text-center">Sorry no more data available!</div>
    {/if}
  </div>
{/if}
