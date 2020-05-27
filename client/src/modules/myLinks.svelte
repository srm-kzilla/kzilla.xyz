<style>

    .kz-notUsed{
        margin-top: 25vh;
    }

    .kz-table-design{
        padding-left: 50px;
        padding-right: 50px;
    }

    .kz-head{
        font-weight: 999;
    }

    .kz-row-design{
        background-color: #f5f5f5;
        margin-top: 10px;
        margin-bottom: 5px;
        border-radius: 10px;
        padding: 5px 10px 5px 10px;
    }

    @media(max-width: 600px){
        .kz-table-design{
            padding-left: 20px;
            padding-right: 20px;
        }
    }

</style>

<script>

    import Table from '../components/table.svelte';

    let datas = [
		{ name: 'Goblet of Fire', count: '43345', shortURL: 'kzdou5', longURL: 'gobletoffire.edu/fkdsfkdsnnfjnwejnwkn'},
		{ name: 'Svelte Developer', count: '365', shortURL: 'kz5Og5', longURL: 'svelte.dev/learnsvelte/oashfdjshfijohiuhewon'},
		{ name: 'KZilla', count: '17', shortURL: 'kz3Un4', longURL: 'Kzilla.com/events/oashfdjshfijohiuhewon'}
	];

</script>

<div class="kz-notUsed"></div>

<div class="container-fluid kz-table-design">
    <div class="row justify-content-center">
        <div class="col col-5 kz-head">
            TITLE
        </div>
        <div class="col col-4 kz-head">
            CLICKS
        </div>
        <div class="col col-3 kz-head">
            ACTIONS
        </div>
    </div>
    {#each datas as { name, count, shortURL, longURL }}
        <div class="row justify-content-center kz-row-design">
            <Table count={count} name={name} shortURL={shortURL} longURL={longURL}/>
        </div>
    {/each}
</div>