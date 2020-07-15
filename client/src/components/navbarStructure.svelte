<script>
  import { Link, Route } from "svelte-routing";
  import Button from "../components/button.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let button_content;
  let startdate, enddate;
  let customClicked = false;
  let windowlocation = window.location.href;
  var local = windowlocation.split("/")[3];

  function customChanger() {
    customClicked = true;
  }

  function changeStartDate() {
    dispatch("changeStartDate", {
      startdate: startdate,
    });
  }
  function changeEndDate() {
    dispatch("changeEndDate", {
      enddate: enddate,
    });
  }
</script>

<style>
  .image {
    height: 8vh;
    margin-top: 5vh;
    margin-left: 5vh;
  }
  .nav-structure {
    height: 20vh;
    padding: 1vh 0px 1vh 1vh;
    position: relative;
    /* overflow: hidden; */
  }
  .custom-dates {
    margin-left: auto;
    margin-right: 15vw;
    margin-top: -8vh;
    width: 23vw;
  }
  .startdate,
  .enddate {
    background-color: #f5f5f5;
    border: none;
    padding: 10px;
    z-index: 999;
    width: 10.7vw;
    height: 8vh;
    font-family: UniSansBook;
    border-radius: 16px;
    outline: none;
  }
  .startdate {
    margin-right: 10px;
  }
  .enddate {
    margin-left: auto;
  }

  @media (max-width: 920px) {
    .image {
      margin-left: 2vh;
    }
  }

  @media (max-width: 1024px) {
    .custom-dates {
      margin-right: 22vw;
      width: 37vw;
    }
    .startdate,
    .enddate {
      width: 17.7vw;
      height: 8vh;
    }
    .startdate {
      margin-right: 10px;
    }
  }
  @media (max-width: 987px) {
    .custom-dates {
      margin-right: 22vw;
      width: 49.5vw;
    }
    .startdate,
    .enddate {
      width: 22vw;
      height: 8vh;
    }
    .startdate {
      margin-right: 10px;
    }
  }
  @media (max-width: 730px) {
    .custom-dates {
      margin-right: 24vw;
      width: 59.5vw;
    }
    .startdate,
    .enddate {
      width: 28vw;
      height: 8vh;
    }
    .startdate {
      margin-right: 10px;
    }
  }
  @media (max-width: 558px) {
    .startdate {
      position: absolute;
      left: 10px;
      top: 100px;
      width: 160px;
    }
    .enddate {
      position: absolute;
      right: 10px;
      top: 100px;
      width: 160px;
    }
  }
</style>

<div class="nav-structure">
  <Link to="/">
    <img src="../icon.svg" class="image" alt="logo" />
  </Link>
  {#if local === 'analytics'}
    {#if button_content === 'Custom'}
      <div class="custom-dates">
        <input
          class="startdate linker"
          bind:value={startdate}
          on:change={changeStartDate}
          type="date" />
        <input
          class="enddate linker"
          bind:value={enddate}
          on:change={changeEndDate}
          type="date" />
      </div>
    {/if}
    <Button
      on:dropDown
      on:custom={customChanger}
      {customClicked}
      {button_content} />
  {:else}
    <Link to="myLinks">
      <Button {button_content} />
    </Link>
  {/if}
</div>
