<script>
    import { Router, Link, Route } from "svelte-routing";
    import HomePage from '../homePage/home.svelte';
    import myLinks from '../myLinksPage/myLinks.svelte';
    
    export let url = "";
    console.log(url);
</script>

<Router url="{url}">
    <div style="z-index: 999 !important;">
        <Route path="myLinks" component="{myLinks}" />
        <Route path="/"><HomePage/></Route>
        <Route path="analytics/:id" component="{myLinks}" />
    </div>
</Router>
<br>
