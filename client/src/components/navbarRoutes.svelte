<script>
  import { Router, Link, Route } from "svelte-routing";
  import HomePage from "../homePage/Home.svelte";
  import MyLinks from "../myLinksPage/MyLinks.svelte";
  import Analytics from "../analyticsPage/Analytics.svelte";

  export let url = "";
</script>

<Router {url}>
  <div style="z-index: 999">
    <Route path="myLinks" component={MyLinks} />
    <Route path="/">
      <HomePage />
    </Route>
    <Route path="analytics/:id" component={Analytics} />
  </div>
</Router>
<br />
