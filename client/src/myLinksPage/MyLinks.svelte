<style>

    .kz-table-design{
        width: 95vw;
        overflow-x: auto;
        padding-left: 8vw;
        padding-right: 8vw;
    }

    .row{
        max-width: 99vw !important;
        overflow-x: auto;
        min-width: 1000px;
    }

    .uni-sans-heavy{
        font-family: UniSansHeavy;
    }

    .kz-head{
        font-weight: 999;
        padding-left: 15px;
    }

    @media(max-width: 1000px){
        .kz-table-design{
            padding-left: 2vw;
            padding-right: 2vw;
        }
    }

    @media(max-width: 600px){
        .kz-table-design{
            padding-left: 10px;
            padding-right: 10px;
        }
    }

</style>

<script>

    import { Router, Link, Route } from "svelte-routing";
    import { onMount } from "svelte";
    import { fetchMyLinks } from "../services/APIservice";
    import Table from './Table.svelte';
    import Navbar from "../components/NavbarStructure.svelte";

    let button_content = "";

    let loading = true;

    //Attaching my links API...

    let dataset = [];

    onMount(async () => {
        dataset = (await fetchMyLinks()).links
       loading = false;
    });

</script>
    <Navbar {button_content}/>

    <div class="container-fluid kz-table-design">
        {#if loading}
            <p class="text-center">
                Computing the secret to life, the universe, and everything...
            </p>
        {:else}
            {#if dataset.length > 0}
                <div class="row justify-content-center">
                    <div class="col col-4 kz-head uni-sans-heavy">
                        Title
                    </div>
                    <div class="col col-3 kz-head uni-sans-heavy">
                        Clicks
                    </div>
                    <div class="col col-5 kz-head uni-sans-heavy">
                        Actions
                    </div>
                </div>
                {#each dataset as data }
                    <Table data = {data}/>
                {/each}
            {:else}
                <p class="text-center">
                    We went to the moon and back, but could not find any more data.
                </p>
            {/if}
        {/if}
    </div>
