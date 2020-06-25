<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import HeroTag from "./HeroTag.svelte";
  import FormDesign from "./FormDesign.svelte";
  import Footer from "../components/Footer.svelte";
</script>

<style>
  .hello-nav{
    height: 15vh;
  	padding: 1vh 0px 1vh 1vh;
    position: relative;
    overflow: hidden;
  }
  .kz-main {
    position: relative;
    padding: 0px;
  }
</style>


  <div class="hello-nav">
      <Link to="/">
        <img src="./icon.svg" class="image" alt="logo" />
      </Link>
      <Link to="myLinks">
        <p class="linker">My Links</p>
      </Link>
  </div>

<div class="container-fluid kz-main">

  <HeroTag />

  <FormDesign />
  <br />

</div>

<Footer />
