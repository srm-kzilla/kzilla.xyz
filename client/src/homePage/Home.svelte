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
  .super-container {
    position: relative;
    min-height: 96vh;
  }
  .footer-container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .kz-main {
    position: relative;
    padding: 0;
  }
</style>

<div class="super-container">
  <Navbar {button_content}/>
  <div class="container-fluid kz-main">
    <HeroTag />
    <FormDesign on:submission={myLinksFetcher}/>
  </div>
  <div class="footer-container">
    <Footer />
  </div>
</div>
