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

    //Attaching my links API...

    let dataset = [
        {
            "linkId":"PVKOIplrpqIE",
            "shortCode":"JKQMc",
            "analyticsCode":"OkFJl",
            "clicks":0,
            "creatorIpAddress":"::1",
            "enabled":true,
            "longUrl":"https://ishanchhabra.com",
            "timestamp":1597089848795
        },
        {   
            "linkId":"otKPXDeOgbpm",
            "shortCode":"WNKNL",
            "analyticsCode":"mxmxh",
            "clicks":0,
            "creatorIpAddress":"::1",
            "enabled":true,
            "longUrl":"https://ishanchhabra.com",
            "timestamp":1597137112953
        },
        {
            "linkId":"NFGECxnJMyVx",
            "shortCode":"tbSVN",
            "analyticsCode":"yEpQR",
            "clicks":2,
            "creatorIpAddress":"::1",
            "enabled":true,
            "longUrl":"https://ishanchhabra.com",
            "timestamp":1597137280220
        },
        {
            "linkId":"frMkkggloXDO",
            "shortCode":"LzYwR",
            "analyticsCode":"XLSPP",
            "clicks":0,
            "creatorIpAddress":"::ffff:127.0.0.1",
            "enabled":true,
            "longUrl":"https://google.com",
            "timestamp":1597140255692
        },
        {
            "linkId":"xGoaLDtmHSBd",
            "shortCode":"xrbTU",
            "analyticsCode":"bIWqf",
            "clicks":1,
            "creatorIpAddress":"::1",
            "enabled":true,
            "longUrl":"https://facebook.com",
            "timestamp":1597089819171
        }
    ];

    // onMount(async () => {
    //     dataset = (await fetchMyLinks()).links
    // });
</script>
    <Navbar {button_content}/>

    <div class="container-fluid kz-table-design">
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
    </div>
