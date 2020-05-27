<script>
    import { Router, Link, Route } from "svelte-routing";
    import HomePage from '../modules/home.svelte';
    import myLinks from '../modules/myLinks.svelte';
	  export let url = "";
</script>

<Router url="{url}">
    <nav>
        <div class="container-fluid" style="">
            <Link to="/"><img src="./icon.svg" class="image" alt="logo"></Link>
            <Link to="myLinks"><p class="linker">My Links</p></Link>
        </div>
    </nav>
    <div>
        <Route path="myLinks" component="{myLinks}" />
        <Route path="/"><HomePage/></Route>
    </div>
</Router>
<br>
