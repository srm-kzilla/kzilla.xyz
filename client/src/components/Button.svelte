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
    font-family: UniSansHeavy,sans-serif;
    user-select: none;
    font-size: 0.9em;
    letter-spacing: 1px;
    text-align: center;
    color: #ffffff;
    background-color: #000000;
    text-transform: uppercase;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 20px;
  }
  
  .linker:hover {
    text-decoration: none !important;
    color: #ffffff;
  }
  .spinner-border {
    margin-top: 2.5vh;
  }
</style>

{#if button_content === 'Shrink'}
  <div
    role="button"
    on:click={shrinkUrl}
    bind:this={myShrinker}
    class={button_content ? 'linker' : 'd-none'}>
    {button_content}
  </div>
{:else if button_content === 'Shrunk'}
  <div class={button_content ? 'linker' : 'd-none'}>
    <div class="spinner-border spinner-border-sm text-light">
      <span class="sr-only">Loading...</span>
    </div> 
  </div>
{:else if button_content === "My Links"}
  <div role="button" class="linker">
    {button_content}
  </div>
{:else if button_content === "Customize" || button_content === "Randomize"}
  <div role="button" on:click class="linker">
    {button_content}
  </div>
{:else if button_content}
  <div
    role="button"
    on:click={showAlert}
    class={button_content ? 'linker analytics-btn' : 'd-none'}>
    {button_content}
    <i class="fa fa-caret-down" />
  </div>
{:else}
  <div role="button" class="d-none">
    {button_content}
  </div>
{/if}
