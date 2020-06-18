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
    // import { onMount } from "svelte";
    // import { fetchMyLinks } from "../services/APIservice";
    import Table from './table.svelte';

    //Attaching my links API...

    // let datas;

    // async function myLinksFetcher(){
    //     datas = await fetchMyLinks();
    // }

    let datas = [
		{ count: 5435, linkId: 'hIsKKTcXpsaT', shortUrl: 'asdsadc', longUrl: 'https://kissanime.ru/Anime/Sin-Nanatsu-no-Taizai?__cf_chl_jschl_tk__=d7c3264f6a46bc8ddf8514ee1b58ee1fe47d86e1-1591171698-0-AQPlkD-xcjyGgS975E3-rj4iei0VpbS5HopcA-Fd65Id-55eRKCsHQtRhXVWW5AoIcBfMLFRtpR2abIo2NvpI9ukiFeRpXzg-m0ESBpbsdAOLdX0atTaDI00FmE1eZvKBdYwDuTJYL-Cvv1lyOYQsYfe3oyQS-20AYDaZghPm0bs6kxIreSGLlme6laxwYG7ee-bZXKWAofKTFRmxoaQEnEaYXfT74B89Qb6LyM5AVSMAtsdke1vwy0lYkyPGTmy_fVPHPGUtarNr5S4lliq2XvZAUArghWu_2e-dZtM4aAytViADqqi6ks5ziTnHQV6pw', name: 'Keyboard Cat', enabled: true },
		{ count: 23, linkId: 'nzjUkHldvinV', shortUrl: 'hvgjh', longUrl: 'https://svelte.dev/repl/72d3ca877047468db8bb3a68f25a8b92?version=3.14.1', name: 'Mouse pad', enabled: false },
        { count: 11043, linkId: 'rytryrty', shortUrl: 'kjkojo', longUrl: 'https://app.swaggerhub.com/apis-docs/srmkzilla/kzilla.xyz/1.0.0#/', name: 'Monitor Dog', enabled: true },
        { count: 11043, linkId: 'ZjeoRPDSWDos', shortUrl: 'RRDNd', longUrl: 'https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard', name: 'Stack Overflow Copy Button', enabled: true }
	];

    // myLinksFetcher();
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
        <!-- {#each datas as { name, count, shortUrl, longUrl, linkId, enabled }}
                <Table count={count} name={name} shortUrl={shortUrl} longUrl={longUrl} linkId={linkId} enabled={enabled}/>
        {/each} -->
        {#each datas as data }
                <Table data = {data}/>
        {/each}
    </div>