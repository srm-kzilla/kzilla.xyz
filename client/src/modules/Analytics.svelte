<script>
  import { onMount } from "svelte";

  import { Anbrowserbox } from "../components/An-browserbox";
  import { Annav } from "../components/an-nav";
  import { Ansmallbox } from "../components/an-smallbox.svelte";
  const data = (async () => {
    const response = await fetch(
      "https://kzilla-xyz.herokuapp.com/api/v1/analytics/DTpfX?startDate=2020-01-01&endDate=2020-05-16"
    );
    return await response.json();
  })();
</script>

{#await data}
  <p>waiting for data</p>
{:then data}
  <Annav />
  <Ansmallbox {data} />
  <Anbrowserbox {data} />
{:catch error}
  <p>An error occurred!</p>
{/await}
