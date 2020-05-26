<script>
  export let data;
</script>

<style>
  .navigator {
    position: relative;
    height: 100px;
  }
  .kz-logo {
    position: absolute;
    height: 70px;
    left: 30px;
    top: 20px;
  }
  .date-box {
    width: 160px;
    height: 50px;
    border-radius: 16px;
    background-color: #f5f5f5;
    padding: 10px 18px;
    margin: 10px;
  }
  .date-box h4 {
    font-size: 20px;
  }
  .dropdown {
    width: 210px;
    padding: 10px 18px;
  }
  .dropdown .dropdown-toggle {
    height: 50px !important;
    width: 100%;
    border-radius: 16px;
    background-color: #000000;
  }
  .dropdown-item {
    text-transform: capitalize;
    color: #000;
    font-weight: 600;
    transition: 0.13s ease-in all;
    border: 1px solid transparent;
  }
  .dropdown-item:active {
    color: #f5f5f5;
    background-color: #000;
    box-shadow: none;
    outline: none;
    border: 1px solid #000;
  }
  .dropdown-item:focus {
    box-shadow: none;
    outline: none;
    border: 1px solid #000;
  }
  .dropdown-menu.show {
    background-color: #f5f5f5;
    color: #000;
  }

  /* Hero */
  .hero-tag {
    font-size: 70px;
    margin-top: 100px;
    position: relative;
    z-index: 10;
  }
  .hero-tag::after {
    position: absolute;
    content: "";
    width: 160px;
    height: 18px;
    background-color: #54a870;
    bottom: 0;
    left: 8.5%;
    z-index: -1;
  }
  .hero-div {
    margin-top: 112px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 16px;
    max-width: 400px;
    max-height: 65px;
  }
  /* Part 1 */
  .analytics-container {
    margin-top: 50px;
  }
  .box {
    border-radius: 16px;
    padding: 10px 13px 18px 13px;
  }
  .blackbg {
    background-color: #000000;
    color: #f5f5f5;
  }
  .lightbg {
    color: #000000;
    background-color: #f5f5f5;
  }
  /* P1 */
  .clicks-box {
    height: 120px;
    width: 200px;
  }
  .clicks-box p {
    margin-bottom: 30px;
  }
  .clicks-box h4 {
    font-size: 40px;
  }
  .heading {
    margin: 0;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 20px;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  .progress {
    margin-top: 10px;
    height: 7px !important;
    width: 100%;
  }
  .os-box {
    height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .smallbox1 {
    margin-top: 30px;
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .smallbox2 {
    margin-top: 30px;
    height: 250px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .browser-row {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .browser-box {
    height: 160px;
  }
  .browser-box i {
    font-size: 50px;
  }
  .browser-box .browser-count {
    font-weight: 400;
    margin-top: 20px;
  }
  .bg-green {
    background-color: #54a870 !important;
  }
  .bg-blue {
    background-color: #26baff !important;
  }
  .bg-red {
    background-color: #f0634d !important;
  }
  .smallbox1 .row .col-md-1 {
    margin-left: 0;
    padding-left: 0;
  }
  .smallbox2 .row .col-md-1 {
    margin-left: 0;
    padding-left: 0;
  }
  @media (max-width: 768px) {
    .clicks-box {
      margin-bottom: 30px;
    }
    .browser-box {
      height: 160px;
      width: 160px;
      margin-left: 40px;
      margin-bottom: 20px;
    }
  }
</style>

<div class="browser-row row">
  <div class="col-md-1" />
  {#each data.reports[2].data as { label, value }}
    <div class="col-md-2 col-xs-6 mx-auto ">
      <div class="box blackbg browser-box">
        <p class="heading">{label}</p>
        <i class="fa fa-chrome" />
        <h4 class="browser-count">{value}</h4>
      </div>
    </div>
  {/each}
</div>
<div class="col-md-1" />
