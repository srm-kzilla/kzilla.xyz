<script>
  import { onMount } from "svelte";
  import HeroTag from "./HeroTag.svelte";
  import FormDesign from "./FormStructure.svelte";
  import Footer from "../components/Footer.svelte";
  import Navbar from "../components/NavbarStructure.svelte";

  let button_content = "";
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

  <FormDesign />
  <br />

</div>

<Footer />
