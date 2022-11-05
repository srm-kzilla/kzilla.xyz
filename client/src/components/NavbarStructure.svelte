<script>
  import { Link, Route } from "svelte-routing";
  import Button from "../components/Button.svelte";
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
        min-height: 50px;
    }
    .nav-structure {
        height: 20vh;
        display: flex;
        justify-content: space-between;
        padding: 6vh 4vw;
    }
    .custom-dates {
        display: flex;
        gap: 0.7vw;
        margin: 0 0.7vw 0 auto;
    }
    .startdate,
    .enddate {
        background-color: #f5f5f5;
        border: none;
        padding: 10px;
        z-index: 999;
        min-width: 10vw;
        height: 8vh;
        min-height: 50px;
        font-family: UniSansBook;
        border-radius: 12px;
        outline: none;
    }
    .startdate::selection,
    .enddate::selection {
        background-color: #be0d0d;
    }
    ::selection {
        background-color: #be0d0d;
    }

    @media (max-width: 920px) {
        .image {
            margin-left: 2vh;
        }
    }

    @media (max-width: 558px) {
        .startdate {
            position: absolute;
            left: 7vw;
            top: 16vh;
        }
        .enddate {
            position: absolute;
            right: 7vw;
            top: 16vh;
        }
    }
    .datepicker::-webkit-datetime-edit-day-field:focus,
    .datepicker::-webkit-datetime-edit-month-field:focus,
    .datepicker::-webkit-datetime-edit-year-field:focus {
        background-color: var(--black);
        color: white;
        outline: none;
    }
    @media (max-height: 610px) and (min-width: 550px) {
        .image {
            min-height: 50px;
        }
    }
</style>

<div class="nav-structure">
  <Link to="/">
    <img src="https://kzilla.xyz/icon.svg" class="image" alt="logo" />
  </Link>
  {#if local === 'analytics'}
    {#if button_content === 'custom'}
      <div class="custom-dates">
        <input
          class="startdate linker datepicker"
          bind:value={startdate}
          on:change={changeStartDate}
          type="date" />
        <input
          class="enddate linker datepicker"
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
    <Link to="me">
      <Button {button_content} />
    </Link>
  {/if}
</div>
