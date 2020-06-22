<style>

    .kz-notUsed{
        margin-top: 25vh;
    }

    .kz-table-design{
        padding-left: 50px;
        padding-right: 50px;
    }

    .uni-sans-heavy{
        font-family: UniSansHeavy;
    }

    .kz-head{
        font-weight: 999;
    }

    @media(max-width: 600px){
        .kz-table-design{
            padding-left: 20px;
            padding-right: 20px;
        }
    }

</style>

<script>

    import { Router, Link, Route } from "svelte-routing";
    import { onMount } from "svelte";
    import { fetchMyLinks } from "../services/APIservice";
    import Table from './table.svelte';

    //Attaching my links API...

    let dataset;

    async function myLinksFetcher(){
        dataset = await fetchMyLinks();
    }

    myLinksFetcher();
</script>

    <nav>
        <div class="container-fluid">
            <Link to="/"><img src="./icon.svg" class="image" alt="logo"></Link>
            <Link to="myLinks"><p class="linker">My Links</p></Link>
        </div>
    </nav>

    <div class="kz-notUsed"></div>

    <div class="container-fluid kz-table-design">
        <div class="row justify-content-center">
            <div class="col col-5 kz-head uni-sans-heavy">
                Title
            </div>
            <div class="col col-4 kz-head uni-sans-heavy">
                Clicks
            </div>
            <div class="col col-3 kz-head uni-sans-heavy">
                Actions
            </div>
        </div>
        {#each dataset as data }
                <Table data = {data}/>
        {/each}
    </div>