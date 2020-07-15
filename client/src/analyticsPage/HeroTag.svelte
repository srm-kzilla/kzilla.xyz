<script>
  export let analyticsId;
  import { API } from "../constants";
</script>

<style>
  /* Hero */
  .hero-tag {
    font-size: 70px;
    margin-top: 60px;
    position: relative;
    font-family: UniSansBook;
    z-index: 10;
  }
  .hero-tag::after {
    position: absolute;
    content: "";
    width: 160px;
    height: 18px;
    background-color: var(--green);
    bottom: 10px;
    left: 8.5%;
    z-index: -1;
  }
  .hero-div {
    font-family: UniSansBook;
    margin-top: 70px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 10px;
    width: 400px;
    max-height: 65px;
    float: right;
  }
  @media (max-width: 768px) {
    .hero-tag {
      font-size: 70px;
      margin-top: 30px;
      position: relative;
      font-family: UniSansBook;
      z-index: 10;
    }
    .hero-div {
      width: 300px;
      margin-top: 30px;
      float: none;
    }
  }
  /* .hero-url {
    font-size: 30px;
  } */
</style>

<!-- Navbar -->
<!-- Analytics -->
<div class="row">
  <div class="col-md-6">
    <h1 class="hero-tag">Analytics</h1>
  </div>
  <div class="col-md-6">
    <div class="hero-div">
      <h5 class="hero-url">{API.KZILLA_URL}/{analyticsId}</h5>
    </div>

  </div>
</div>
