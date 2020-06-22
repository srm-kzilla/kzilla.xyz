<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import HeroTag from "./HeroTag.svelte";
  import FormDesign from "./FormDesign.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<style>
  .kz-main {
    max-height: 70vh;
    position: relative;
    padding: 0px;
  }
</style>

<nav>
  <div class="container-fluid">
    <Link to="/">
      <img src="./icon.svg" class="image" alt="logo" />
    </Link>
    <Link to="myLinks">
      <p class="linker">My Links</p>
    </Link>
  </div>
</nav>

<div class="container-fluid kz-main">

  <HeroTag />

  <FormDesign />
  <br />

</div>

<Footer />
