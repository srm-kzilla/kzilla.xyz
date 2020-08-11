<script>
  import { onMount } from "svelte";
  import { fetchMyLinks } from "../services/APIservice";
  import HeroTag from "./HeroTag.svelte";
  import FormDesign from "./FormStructure.svelte";
  import Footer from "../components/Footer.svelte";
  import Navbar from "../components/NavbarStructure.svelte";

  let button_content = "";
  let dataset;
	
  onMount(async () => {
    await myLinksFetcher()
  });
  
  async function myLinksFetcher(){
    dataset = await fetchMyLinks();
    if(dataset){
      button_content="My Links"
    }
  }

</script>

<style>
  .kz-main {
    position: relative;
    padding: 0px;
  }
</style>

<Navbar {button_content}/>


<div class="container-fluid kz-main">

  <HeroTag />

  <FormDesign on:submission={myLinksFetcher}/>
  <br />

</div>

<Footer />
