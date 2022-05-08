<!DOCTYPE html>
<html lang="en">
   <head>
      <title>Daily Sales</title>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <link rel="stylesheet" href="../../css/admin/sidenav.css">

      <script src="https://code.jquery.com/jquery-3.6.0.min.js"
			integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
   </head>

   <body>
		<div class="container-fluid">
			<div class="row flex-nowrap">
				<!-- SIDE NAV -->
            <?php include_once '../../php/global/sidenavtb_page.php'; ?>
				
				<!-- 2ND COL -->
				<div class="col">
					<h1>Monthly Sales Report</h1><hr>
               <table class="table table-hover">
                  <thead>
                     <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Customer Address</th>
                        <th scope="col">Date Purchased</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                     </tr>
                  </tbody>
               </table>
				</div>
			</div>
		</div>

      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
	   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
   </body>
</html>