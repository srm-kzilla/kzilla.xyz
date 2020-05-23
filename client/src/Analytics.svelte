<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <style>
      body {
        overflow-x: hidden;
      }

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
      .date-boxes-container {
        position: absolute;
        right: 30px;
        top: 20px;
        width: 550px;
        display: flex;
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
        width: 100%;
      }
      .analytics-container .row {
        margin-left: 20px;
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
        height: 80px;
        max-width: 120px;
      }
      .clicks-box p {
        margin-bottom: 0;
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
      }
      .progress-bar:nth-child(1) {
        background-color: #54a870;
      }
      .os-box {
        width: 120%;
      }
      .smallbox1 {
        margin-top: 30px;
      }
      .smallbox2 {
        margin-top: 30px;
      }
      .browser-row {
        display: flex;
      }
      .browser-box {
        width: 18%;
        margin: 20px;
      }
      .browser-box i {
        font-size: 50px;
      }
      .browser-box .browser-count {
        font-weight: 400;
        margin-top: 10px;
      }
      .browser-box:nth-last-child(1) .browser-count {
        margin-top: 80px;
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
    </style>
  </head>

  <body>

    <!-- Navbar -->
    <div class="navigator">
      <img class="kz-logo" src="./icon.svg" alt="" />
      <div class="date-boxes-container">
        <div class="date-box">
          <h4>May 31,2000</h4>
        </div>
        <div class="date-box">
          <h4>May 31,2000</h4>
        </div>
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
            <a class="dropdown-item" href="#">Today</a>
            <a class="dropdown-item" href="#">Yesterday</a>
            <a class="dropdown-item" href="#">Last 3 days</a>
            <a class="dropdown-item" href="#">This Week</a>
            <a class="dropdown-item" href="#">This Month</a>
            <a class="dropdown-item" href="#">Custom</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Analytics -->
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1 class="hero-tag">Analytics</h1>
        </div>
        <div class="col-md-6">
          <div class="hero-div">
            <h6 class="hero-url">kzill.xyz/somerandom</h6>
          </div>

        </div>
      </div>
    </div>
    <!-- Part 1 -->
    <div class="container analytics-container">
      <!-- OS -->
      <div class="row">
        <div class="col-md-3 blackbg clicks-box box">
          <p class="heading">Clicks</p>
          <h4>1234</h4>
        </div>
        <div class="col-md-9">
          <div class="box lightbg os-box">
            <p class="heading">Operating System</p>
            <ul>
              <li>
                <div class="row">
                  <div class="col-md-4">Windows</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 57%"
                        aria-valuenow="57"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">iOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-red"
                        role="progressbar"
                        style="width: 78%"
                        aria-valuenow="78"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Android</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 34%"
                        aria-valuenow="34"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">macOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 81%"
                        aria-valuenow="81"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Ubuntu</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 34%"
                        aria-valuenow="34"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <!-- 2 small boxes -->
      <div class="row">
        <div class="col-md-6">
          <div class="box lightbg smallbox1">
            <p class="heading">Operating System</p>
            <ul>
              <li>
                <div class="row">
                  <div class="col-md-4">Windows</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 71%"
                        aria-valuenow="71"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">iOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-red"
                        role="progressbar"
                        style="width: 34%"
                        aria-valuenow="34"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Android</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 89%"
                        aria-valuenow="89"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">macOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 13%"
                        aria-valuenow="13"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Ubuntu</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 18%"
                        aria-valuenow="18"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="box lightbg smallbox2">
            <p class="heading">Operating System</p>
            <ul>
              <li>
                <div class="row">
                  <div class="col-md-4">Windows</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 28%"
                        aria-valuenow="28"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">iOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-red"
                        role="progressbar"
                        style="width: 83%"
                        aria-valuenow="83"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Android</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-green"
                        role="progressbar"
                        style="width: 10%"
                        aria-valuenow="10"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">macOS</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 18%"
                        aria-valuenow="18"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>
              <li>
                <div class="row">
                  <div class="col-md-4">Ubuntu</div>
                  <div class="col-md-7">
                    <div class="progress">
                      <div
                        class="progress-bar bg-blue"
                        role="progressbar"
                        style="width: 85%"
                        aria-valuenow="85"
                        aria-valuemin="0"
                        aria-valuemax="100" />
                    </div>
                  </div>
                  <div class="col-md-1">40</div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <!-- Browser -->
      <div class="browser-row">
        <div class="box blackbg browser-box">
          <p class="heading">CHROME</p>
          <i class="fa fa-chrome" />
          <h4 class="browser-count">100</h4>
        </div>
        <div class="box blackbg browser-box">
          <p class="heading">FIREFOX</p>
          <i class="fa fa-firefox" />
          <h4 class="browser-count">100</h4>
        </div>
        <div class="box blackbg browser-box">
          <p class="heading">SAFARI</p>
          <i class="fa fa-safari" />
          <h4 class="browser-count">100</h4>
        </div>
        <div class="box blackbg browser-box">
          <p class="heading">EDGE</p>
          <i class="fa fa-edge" />
          <h4 class="browser-count">100</h4>
        </div>
        <div class="box blackbg browser-box">
          <p class="heading">OTHERS</p>
          <h4 class="browser-count">100</h4>
        </div>
      </div>
    </div>

  </body>
  <script
    src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
    crossorigin="anonymous">

  </script>
  <script
    src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous">

  </script>
  <script
    src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous">

  </script>
</html>
