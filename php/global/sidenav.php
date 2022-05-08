<!-- SIDE NAV -->
<div class="d-flex flex-column vh-100 flex-shrink-0 p-3 text-white" style="width: 250px;"><img class="logo" src="../assets/imgs/logo.png"><h3 class="mt-2">Admin</h3>
   <hr>
   <ul class="nav nav-pills flex-column mb-auto">
      <li> <a href="dashboard.php" class="nav-link text-white" aria-current="page"> <i class="fa fa-home"></i><span class="ms-2">Dashboard</span> </a> </li>
      <li> <a href="orders.php" class="nav-link text-white"> <i class="fa fa-dashboard"></i><span class="ms-2">Orders</span> </a> </li>
      <li> <a href="image.php" class="nav-link text-white"> <i class="fa fa-cog"></i><span class="ms-2">Add Product</span> </a> </li>
      <li> <a href="items.php" class="nav-link text-white"> <i class="fa fa-bookmark"></i><span class="ms-2">Product List</span> </a> </li>
      <li> 
         <a class="nav-link dropdown-toggle" href="sales.php" class="nav-link text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"> 
            <i class="fa fa-bookmark"></i><span class="ms-2">Sales</span> 
         </a> 
         <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="tables/daily.php">Daily Sales</a></li>
            <li><a class="dropdown-item" href="tables/weekly.php">Weekly Sales</a></li>
            <li><a class="dropdown-item" href="tables/monthly.php">Monthly Sales</a></li>
            <li><a class="dropdown-item" href="tables/yearly.php">Yearly Sales</a></li>
         </ul>
      </li>
   </ul>
   <hr>
   <a href="#" class="btn btn-danger">Logout</a>
</div>