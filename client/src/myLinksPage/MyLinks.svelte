<script>
  import { onMount } from "svelte";
  import { fetchMyLinks } from "../services/APIservice";
  import Table from './Table.svelte';
  import Navbar from "../components/NavbarStructure.svelte";

  let button_content = "";
  let loading = true;

  //Attaching my links API...
  let dataset = [];
  onMount(async () => {
    dataset = (await fetchMyLinks()).links;
    dataset = dataset.reverse();
    loading = false;
  });
</script>

<Navbar {button_content}/>

<div class="kz-table-design">
  {#if loading}
    <p class="no-data">
      Computing the secret to life, the universe, and everything...
    </p>
  {:else}
    {#if dataset.length > 0}
      <div class="kz-table-title">
        <div class="kz-title">
          Title
        </div>
        <div>
          Clicks
        </div>
        <div>
          Options
        </div>
      </div>
      {#each dataset as data }
        <Table data = {data}/>
      {/each}
    {:else}
      <p class="no-data">
        We went to the moon and back, but could not find any more data.
      </p>
    {/if}
  {/if}
</div>

<style>
  .kz-table-design {
    display: grid;
    padding: 0 12vw;
    font-family: "UniSansBook", sans-serif;
    font-size: 14px;
  }

  .kz-table-title {
    display: flex;
    font-family: "UniSansHeavy", sans-serif;
    justify-content: space-between;
  }

  .kz-title {
    flex-basis: 86%;
  }

  .no-data {
    height: 65vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }

  @media (max-width: 820px) {
    .kz-title {
      flex-basis: 62%;
    }
    .kz-table-design {
      padding: 0 5vw;
    }
  }

</style>
