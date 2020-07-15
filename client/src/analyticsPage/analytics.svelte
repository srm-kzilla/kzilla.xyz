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
    console.log(data);
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
  }
</script>

<style>
  .no-data {
    font-family: UniSansBook;
  }
  .waiting-for-data {
    margin-top: 50px;
  }
  .kz-dropdown {
    position: fixed;
    right: 3.4vw;
    top: 14.4vh;
    width: 11.6vw;
    border-radius: 16px;
    background-color: #f5f5f5;
    border: none;
    border-radius: 16px;
    padding-top: 8px;
    z-index: 99;
  }
  .kz-dropdown ul {
    list-style-type: none;
    font-family: UniSansHeavy;
    margin-left: -40px;
  }
  .kz-dropdown ul li {
    list-style-type: none;
    padding: 2px 0px;
    padding-left: 20px;
  }
  .kz-dropdown ul li:hover {
    background-color: var(--black);
    color: var(--white);
  }

  @media (max-width: 768px) {
    .kz-dropdown {
      right: 3.4vw;
      top: 14.4vh;
      width: 40vw;
    }
  }
  @media (max-width: 1024px) {
    .kz-dropdown {
      right: 2vw;
      top: 14.4vh;
      width: 18vw;
    }
  }

  @media (max-width: 987px) {
  }
  @media (max-width: 760px) {
    .kz-dropdown {
      right: 2.2vw;
      top: 14.4vh;
      width: 23vw;
    }
  }
  @media (max-width: 500px) {
    .kz-dropdown {
      right: 2.2vw;
      top: 14.4vh;
      width: 30vw;
    }
  }
</style>

<Navbar
  on:changeStartDate={changeStartDate}
  on:changeEndDate={changeEndDate}
  on:dropDown={toggleDropDown}
  {button_content} />

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
  <p class="text-center no-data waiting-for-data">
    Please wait while we load your data
  </p>
{/if}
