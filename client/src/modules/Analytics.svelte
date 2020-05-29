<script>
  import { onMount } from "svelte";

  import Anbrowserbox from "../components/an-browserbox.svelte";
  import Annav from "../components/an-nav.svelte";
  import Ansmallbox from "../components/an-smallbox.svelte";
  import Anupperow from "../components/an-upperrow.svelte";
  import Anhero from "../components/an-hero.svelte";
  const data = (async () => {
    const response = await fetch(
      "https://kzilla-xyz.herokuapp.com/api/v1/analytics/DTpfX?startDate=2020-01-01&endDate=2020-05-18"
    );
    return await response.json();
  })();
</script>

<style>

</style>

{#await data}
  <p>waiting for data</p>
{:then data}
  <Annav />
  <div class="container">
    <Anhero />
    <Anupperow {data} />
    <div class="row">
      <div class="col-md-6">
        <Ansmallbox sdata={data.reports[0]} />
      </div>
      <div class="col-md-6">
        <Ansmallbox sdata={data.reports[1]} />
      </div>
    </div>
    <Anbrowserbox {data} />
  </div>
{:catch error}
  <p>An error occurred!</p>
{/await}
