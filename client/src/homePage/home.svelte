<script>
  import { onMount } from "svelte";
  import HeroTag from "./heroTag.svelte";
  import FormDesign from "./formStructure.svelte";
  import Footer from "../components/footer.svelte";
  import Navbar from "../components/navbarStructure.svelte";

  let button_content = "My Links";
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
