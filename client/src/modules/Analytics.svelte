<script>
  import { onMount } from "svelte";
  import Anbrowserbox from "../components/an-browserbox.svelte";
  import Ansmallbox from "../components/an-smallbox.svelte";
  import Anupperow from "../components/an-upperrow.svelte";
  import Anhero from "../components/an-hero.svelte";

  let selectedrange;
  var dateObj = new Date();
  dateObj.setDate(dateObj.getDate());
  let startdate = formatDate(dateObj);
  let enddate = startdate;

  var changeStartDate = value => {
    alert(value);
    startdate = value;
  };
  var changeEndDate = value => {
    alert(value);
    enddate = value;
  };

  var dateschanged = value => {
    var enddate = formatDate(dateObj);
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
      var startdate = formatDate(dateObj);
      alert("Start Date: " + startdate + "\n" + "End date: " + enddate);
    }
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const data = (async () => {
    const response = await fetch(
      `https://kzilla-xyz.herokuapp.com/api/v1/analytics/DTpfX?startDate=${startdate}&endDate=${enddate}`
    );
    var res = await response.json();
    console.log(res);
    return res;
  })();
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
  .startdate {
    position: absolute;
    right: 180px;
    top: 10px;
  }
  .enddate {
    position: absolute;
    right: 360px;
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

{#await data}
  <p>waiting for data</p>
{:then data}
  <div class="container">
    <Anhero />
    <Anupperow {data} />
    <div class="row">
      <div class="col-md-6">
        <Ansmallbox sdata={data.reports[0]} heading={'source'} />
      </div>
      <div class="col-md-6">
        <Ansmallbox sdata={data.reports[1]} heading={'city'} />
      </div>
    </div>
    <Anbrowserbox {data} />
  </div>
{:catch error}
  <p>An error occurred!</p>
{/await}
