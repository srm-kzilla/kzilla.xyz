<script>
  import { onMount } from "svelte";
  import BrowserBox from "./BrowserBox.svelte";
  import SmallBox from "./SmallBox.svelte";
  import UpperRow from "./UpperRow.svelte";
  import HeroTag from "./HeroTag.svelte";
  import { getAnalyticsData } from "../services/APIservice.js";
  import Navbar from "../components/navbarStructure.svelte";
  let button_content = "today";
  // Variables declaration
  var data;
  let selectedrange;
  var dateObj = new Date();
  dateObj.setDate(dateObj.getDate());
  var startdate = formatDate(dateObj);
  var enddate = startdate;
  // hello comments

  let abc;

  //end comments
  var analyticsId = window.location.href.split("analytics/")[1];
  let ddToggler = false;

  //   Initialize onMount
  onMount(async function initialise() {
    data = await getAnalyticsData(analyticsId, startdate, enddate);
  });
  // Changed Start Date using Custom
  var changeStartDate = async event => {
    startdate = event.detail.startdate;
    data = await getAnalyticsData(analyticsId, startdate, enddate);
  };
  // Change End Date using Custom
  var changeEndDate = async event => {
    enddate = event.detail.enddate;
    data = await getAnalyticsData(analyticsId, startdate, enddate);
  };
  //Changed Dates Range
  var datesChanged = async value => {
    // document.getElementById("dropdownMenuLink").innerHTML = value;
    enddate = formatDate(dateObj);
    ddToggler = false;
    if (value != "Custom") {
      selectedrange = "";
      if (value == "Today") {
        button_content = "Today";
        dateObj.setDate(dateObj.getDate());
      } else if (value == "Yesterday") {
        button_content = "Yesterday";
        dateObj.setDate(dateObj.getDate() - 1);
      } else if (value == "Last 3 days") {
        button_content = "Last 3 days";
        dateObj.setDate(dateObj.getDate() - 2);
      } else if (value == "This  month") {
        button_content = "This Month";
        dateObj.setDate(dateObj.getDate() - 29);
      } else if (value == "This week") {
        button_content = "This week";
        dateObj.setDate(dateObj.getDate() - 6);
      }
      startdate = formatDate(dateObj);
    } else {
      button_content = "Custom";
      selectedrange = "Custom";
    }
    data = await getAnalyticsData(analyticsId, startdate, enddate);
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

  function toggleDropDown() {
    ddToggler = !ddToggler;
    console.log("Hello " + ddToggler);
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
    height: 50px;
    widows: 50px;
  }

  .startdate,
  .enddate {
    background-color: #f5f5f5;
    border: none;
    padding: 10px;
    z-index: 9999;
    /* padding-right: 10px; */
    /* height: 60px;
    width: 160px;
    border-radius: 16px;
    padding: 10px; */
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
    margin-left: auto;
    margin-right: 30px;
    background-color: var(--black);
    color: var(--white);
    border-radius: 16px;
    border: none;
    padding: 10px;
    font-family: UniSansHeavy;
    position: relative;
  }
  #dropdownMenuLink {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
  }
  .dropdown-toggle {
    position: relative;
  }
  .dropdown-toggle::after {
    position: absolute;
    right: -100%;
    top: 50%;
    transform: translateY(-50%);
  }
  .dropdown-menu {
    font-family: UniSansHeavy;
    width: 160px !important;
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
  .linker {
    letter-spacing: 1px;
    width: 12vw;
    height: 8vh;
    text-align: left;
    text-transform: uppercase;
    border-radius: 12px;
  }

  .kz-dropdown {
    position: fixed;
    right: 4.5vw;
    top: 14vh;
    width: 12vw;
  }

  .kz-dropdown ul {
    list-style-type: none;
  }
  @media (max-width: 1400px) {
    .linker {
      width: 12vw;
    }
  }
  @media (max-width: 1200px) {
    .linker {
      width: 14vw;
    }
  }
  @media (max-width: 1000px) {
    .linker {
      width: 22vw;
    }
  }
  @media (max-width: 920px) {
    .linker {
      margin-right: 2vh;
    }
  }
  @media (max-width: 760px) {
    .linker {
      width: 30vw;
    }
  }
  @media (max-width: 470px) {
    .linker {
      width: 36vw;
    }
    .dropdown-toggle::after {
      right: -30px;
    }
  }
  @media (max-width: 400px) {
    .linker {
      width: 36vw;
    }
  }
</style>

<Navbar
  on:changeStartDate={changeStartDate}
  on:changeEndDate={changeEndDate}
  on:dropDown={toggleDropDown}
  {button_content} />
<!-- <div class="navigator">
  <img class="kz-logo" src="../icon.svg" alt="" />
</div>
{#if selectedrange == 'Custom'}
  <input
    class="startdate linker"
    type="date"
    bind:value={startdate}
    on:change={changeStartDate(startdate)} />
  <input
    class="enddate linker"
    type="date"
    bind:value={enddate}
    on:change={changeEndDate(enddate)} />
{/if} -->
<!-- <div class="dropdown show linker">
  <span
    class="dropdown-toggle"
    role="button"
    id="dropdownMenuLink"
    data-toggle="dropdown">
    Today
  </span>

  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <span class="dropdown-item" on:click={() => datesChanged('Today')}>
      Today
    </span>
    <span class="dropdown-item" on:click={() => datesChanged('Last 3 days')}>
      Last 3 days
    </span>
    <span class="dropdown-item" on:click={() => datesChanged('This week')}>
      This Week
    </span>
    <span class="dropdown-item" on:click={() => datesChanged('This  month')}>
      This Month
    </span>
    <span class="dropdown-item" on:click={() => datesChanged('Yesterday')}>
      Yesterday
    </span>
    <span class="dropdown-item" on:click={() => datesChanged('Custom')}>
      Custom
    </span>
  </div>
</div> -->

{#if ddToggler}
  <div class="kz-dropdown">
    <ul>
      <li role="button" on:click={() => datesChanged('Today')}>Today</li>
      <li role="button" on:click={() => datesChanged('Last 3 days')}>
        Last 3 days
      </li>
      <li role="button" on:click={() => datesChanged('This week')}>
        This Week
      </li>
      <li role="button" on:click={() => datesChanged('This month')}>
        This Month
      </li>
      <li role="button" on:click={() => datesChanged('Yesterday')}>
        Yesterday
      </li>
      <li role="button" on:click={() => datesChanged('Custom')}>Custom</li>
    </ul>
  </div>
{/if}
{#if data}
  <div class="container">
    <HeroTag {analyticsId} />
    <UpperRow {data} />
    <div class="row">
      <div class="col-md-6">
        <SmallBox sdata={data.reports[0]} heading={'sources'} />
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
