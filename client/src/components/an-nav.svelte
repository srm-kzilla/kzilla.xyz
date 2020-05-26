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
</style>

<!-- Navbar -->
<div class="navigator">
  <div class="row">
    <div class="col-md-6">
      <img class="kz-logo" src="./icon.svg" alt="" />
    </div>
    <div class="col-md-2">
      <div class="date-box">
        <h4>May 31,2000</h4>
      </div>
    </div>
    <div class="col-md-2">
      <div class="date-box">
        <h4>May 31,2000</h4>
      </div>
    </div>
    <div class="col-md-2">
      <div class="dropdown">
        <button
          class="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Custom
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item">Today</a>
          <a class="dropdown-item">Last 3 days</a>
          <a class="dropdown-item">This Week</a>
          <a class="dropdown-item">This Month</a>
          <a class="dropdown-item">Yesterday</a>
          <a class="dropdown-item">Custom</a>
        </div>
      </div>
    </div>
  </div>
</div>
