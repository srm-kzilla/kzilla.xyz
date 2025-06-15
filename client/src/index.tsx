import "virtual:uno.css";
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import App from "./pages/Home";
import "./index.css";

const wrapper = document.getElementById("app");

if (!wrapper) {
  throw new Error("Wrapper div not found");
}

render(
  () => (
    <Router>
      <Route path="/" component={App} />
    </Router>
  ),
  wrapper,
);
