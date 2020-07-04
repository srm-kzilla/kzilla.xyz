<script>
  import { Router, Link, Route } from "svelte-routing";
  import HomePage from "../homePage/home.svelte";
  import myLinks from "../myLinksPage/myLinks.svelte";
  import Analytics from "../analyticsPage/analytics.svelte";

  export let url = "";
</script>

<Router {url}>
  <div style="z-index: 999">
    <Route path="myLinks" component={myLinks} />
    <Route path="/">
      <HomePage />
    </Route>
    <Route path="analytics/:id" component={Analytics} />
  </div>
</Router>
<br />
