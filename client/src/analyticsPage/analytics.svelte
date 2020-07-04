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
  // Changed Start Date using Custom
  var changeStartDate = async value => {
    startdate = value;
    data = await getData();
  };
  // Change End Date using Custom
  var changeEndDate = async value => {
    enddate = value;
    data = await getData();
  };
  //Changed Dates Range
  var dateschanged = async value => {
    document.getElementById("dropdownMenuLink").innerHTML = value;
    enddate = formatDate(dateObj);
    if (value != "Custom") {
      selectedrange = "";
      if (value == "Today") {
        dateObj.setDate(dateObj.getDate());
      } else if (value == "Yesterday") {
        dateObj.setDate(dateObj.getDate() - 1);
      } else if (value == "Last 3 days") {
        dateObj.setDate(dateObj.getDate() - 2);
      } else if (value == "This  month") {
        dateObj.setDate(dateObj.getDate() - 29);
      } else if (value == "This week") {
        dateObj.setDate(dateObj.getDate() - 6);
      }
      startdate = formatDate(dateObj);
    } else {
      selectedrange = "Custom";
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
    left: 30px;
    top: 20px;
  }

  .startdate,
  .enddate {
    background-color: #f5f5f5;
    height: 60px;
    width: 160px;
    border-radius: 16px;
    border: none;
    padding: 10px;
  }
  .startdate {
    position: absolute;
    right: 480px;
    top: 10px;
    font-family: UniSansBook;
  }
  .enddate {
    position: absolute;
    right: 280px;
    top: 10px;
    font-family: UniSansBook;
  }

  .no-data {
    font-family: UniSansBook;
  }
  input:focus {
    border: none;
  }
  .dropdown {
    position: absolute;
    right: 80px;
    top: 10px;
    background-color: var(--black);
    color: var(--white);
    height: 60px;
    width: 160px;
    border-radius: 16px;
    border: none;
    padding: 10px;
    font-family: UniSansHeavy;
    font-weight: 200;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
  }
  #dropdownMenuLink {
    position: absolute;
    top: 34%;
    left: 16px;
  }
  .dropdown-toggle::after {
    position: absolute;
    right: -80px;
    top: 34%;
  }
  .dropdown-menu {
    font-family: UniSansHeavy;
    width: 160px;
    transform: translate3d(0px, 62px, 0px) !important;
    background-color: #f5f5f5;
    border: none;
    border-radius: 16px;
  }
  .dropdown-item:hover {
    background-color: var(--black);
    color: var(--white);
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
    .dropdown {
      position: absolute;
      right: 30px;
      top: 10px;
    }
  }
</style>
{#if data}
<div class="navigator">
  <img class="kz-logo" src="./icon.svg" alt="" />
</div>
{#if selectedrange == 'Custom'}
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
<div class="dropdown show">
  <span
    class="dropdown-toggle"
    role="button"
    id="dropdownMenuLink"
    data-toggle="dropdown">
    Today
  </span>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <span class="dropdown-item" on:click={() => dateschanged('Today')}>
      Today
    </span>
    <span class="dropdown-item" on:click={() => dateschanged('Last 3 days')}>
      Last 3 days
    </span>
    <span class="dropdown-item" on:click={() => dateschanged('This week')}>
      This Week
    </span>
    <span class="dropdown-item" on:click={() => dateschanged('This  month')}>
      This Month
    </span>
    <span class="dropdown-item" on:click={() => dateschanged('Yesterday')}>
      Yesterday
    </span>
    <span class="dropdown-item" on:click={() => dateschanged('Custom')}>
      Custom
    </span>
  </div>
</div>
  <div class="container">
    <HeroTag {analyticsId} />
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
      <div class="text-center no-data">Sorry no more data available!</div>
    {/if}
  </div>
  {:else}
  <p>Please wait while we load your data</p>
{/if}
