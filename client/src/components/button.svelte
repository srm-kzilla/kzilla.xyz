<script>
  export let button_content;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let myShrinker;
  let showDropDown = false;

  function shrinkUrl() {
    dispatch("buttonClick", {
      text: "Hello!",
    });
  }
  function showAlert() {
    dispatch("custom");
    dispatch("dropDown");
    if (showDropDown) {
      showDropDown = false;
    } else {
      showDropDown = true;
    }
  }
</script>

<style>
  .linker {
    font-family: UniSansHeavy;
    margin-left: auto;
    margin-top: -8vh;
    margin-right: 6vh;
    font-size: 2vh;
    letter-spacing: 1px;
    width: 12vw;
    height: 8vh;
    text-align: center;
    line-height: 8vh;
    color: #ffffff;
    background-color: #000000;
    text-transform: uppercase;
    border-radius: 12px;
  }
  .margin-0 {
    margin-right: 0 !important;
  }
  .linker:hover {
    text-decoration: none !important;
    color: #ffffff;
  }
  .spinner-border {
    margin-top: 2.5vh;
  }

  @media (max-width: 1400px) {
    .linker {
      width: 12vw;
    }
  }
  @media (max-width: 1200px) {
    .linker {
      width: 14vw;
    }
  }
  @media (max-width: 1000px) {
    .linker {
      width: 18vw;
    }
  }
  @media (max-width: 920px) {
    .linker {
      margin-right: 2vh;
    }
  }
  @media (max-width: 760px) {
    .linker {
      width: 22vw;
    }
  }
  @media (max-width: 470px) {
    .linker {
      width: 30vw;
    }
  }
  @media (max-width: 400px) {
    .linker {
      width: 34vw;
    }
  }
</style>

{#if button_content === 'Shrink'}
  <div
    role="button"
    on:click={shrinkUrl}
    bind:this={myShrinker}
    class={button_content ? 'linker margin-0' : 'd-none'}>
    {button_content}
  </div>
{:else if button_content === 'Shrunk'}
  <div class={button_content ? 'linker margin-0' : 'd-none'}>
    <div class="spinner-border text-light">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
{:else if button_content}
  <div
    role="button"
    on:click={showAlert}
    class={button_content ? 'linker' : 'd-none'}>
    {button_content}
  </div>
{:else}
  <div role="button" class={button_content ? 'linker' : 'd-none'}>
    {button_content}
  </div>
{/if}

