<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import HeroTag from "./HeroTag.svelte";
  import FormDesign from "./FormDesign.svelte";
</script>

<style>
  .kz-main {
    max-height: 70vh;
    position: relative;
    padding: 0px;
  }
  .kz-crafted {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
  .kz-para {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .kz-deepBlue{
    color: var(--deepBlue);
  }
  @media (max-width: 600px) {
    .kz-para {
      font-size: 3.7vw;
    }
  }
</style>

<nav>
  <div class="container-fluid">
      <Link to="/"><img src="./icon.svg" class="image" alt="logo"></Link>
      <Link to="myLinks"><p class="linker">My Links</p></Link>
  </div>
</nav>

<div class="container-fluid kz-main">

  <HeroTag />

  <FormDesign />
  <br />
</div>

<div class="text-center kz-crafted">
  <p class="kz-para kz-deepBlue">
    Crafted with
    <span style="color: red;">&hearts</span>
    by your friends on the SRMKZILLA team
  </p>
</div>
