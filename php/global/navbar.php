<nav class="navbar navbar-expand-lg">
   <div class="container-fluid">
      <a class="navbar-brand mx-4" href="/4MS/home"><img class="logo" src="assets/imgs/logo.png"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item mx-3">
               <a class="nav-link active" aria-current="page" href="/4MS/home">Home</a>
            </li>

            <li class="nav-item mx-3">
               <a class="nav-link" href="#">About</a>
            </li>

            <li class="nav-item mx-3">
               <a class="nav-link" href="#">Products</a>
            </li>

            <li class="nav-item mx-3">
               <a class="nav-link" href="#">To-Receive</a>
            </li>
         </ul>

         <div class="input-group searchbox">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search"
               aria-describedby="search-addon" list="datalistOptions" id='search' />
            <datalist id="datalistOptions">
               <!-- Dynamic Search -->
            </datalist>
            <button type="button" class="btn btn-outline-light">
               <i class="fa-solid fa-magnifying-glass"></i>
            </button>
         </div>

         <!-- <button type="button" class="btn position-relative"> -->
         <a href="/4MS/cart" class="top-icons position-relative cart-badge">
            <i class="fa-solid fa-cart-shopping"></i>

            <?php 
            require_once 'php/config.php';
            if (isset($_SESSION['userid'])) {
            
            $sql = "SELECT * FROM cart WHERE userid =".$_SESSION['userid'];
            $query = $dbh -> query($sql);
            $count = $query->rowCount();

            if ($count > 0) {
               // show badge
           
          ?>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger badge"><?php echo htmlspecialchars($count);?>
            </span>
         </a>

         <?php 
          }
         }?>
           
         <!-- </button> -->

      
         <a href="/4MS/profile" class="top-icons">
            <i class="fa-solid fa-user-tie"></i>
         </a>
      </div>
   </div>
</nav>
