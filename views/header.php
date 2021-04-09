<header>
    <!-- Intro settings -->
    <style>
      #intro {
        /* Margin to fix overlapping fixed navbar */
        margin-top: 58px;
      }
      @media (max-width: 991px) {
        #intro {
          /* Margin to fix overlapping fixed navbar */
          margin-top: 45px;
        }
      }
    </style>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand" target="_blank" href="https://mdbootstrap.com/docs/standard/">
          <img src="assets/img/site-logo.png" height="16" alt="" loading="lazy"
            style="margin-top: -3px;" />
        </a>
        <button class="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarExample01"
          aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarExample01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <?php if($currentPage == 'home'){?>
              <li class="nav-item">
                <a 
                  data-mdb-toggle="modal"
                  data-mdb-target="#exampleModal" class="nav-link filterNavLink" aria-current="page" href="#!">Search & Filter</a>
                </li>
            <?php } ?>
          </ul>

        </div>
      </div>
    </nav>
    <!-- Navbar -->

    <!-- Jumbotron -->
  </header>
  <!--Main Navigation-->