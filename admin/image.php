<html>
	<head>
		<title>Image Upload with AJAX, PHP and MYSQL</title>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<link rel="stylesheet" href="../css/admin/image.css">
		<link rel="stylesheet" href="../css/admin/sidenav.css">
		<script src="https://code.jquery.com/jquery-3.6.0.min.js"
			integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
		<script src="js/image.js"></script>
	</head>

	<body>

		<div class="container-fluid">
			<div class="row flex-nowrap">
				<!-- SIDE NAV -->
				<?php include_once '../php/global/sidenav.php'; ?>
				
				<!-- 2ND COL -->
				<div class="col">
					<h1>Add Product</h1><hr>
					<form enctype="multipart/form-data" id="uploadForm">
						<img id="image" src="../images/200.jpg" width="100px" class="img-thumbnail" alt="..."><br>
						<input type="file" oninput="image.src=window.URL.createObjectURL(this.files[0])" name="file" id="file"> <br>
						
						<div class="row mt-3">
							<div class="col">
								<label>Product Name:</label>
								<input  name="name" value="name"/>
							</div>
		
							<div class="col">
								<label>Product Description:</label>
								<input name="description" value="description"/>
							</div>

							<div class="col">
								<label>Product Price:</label>
								<input name="price" value="10"/>
							</div>
						</div>

						<div class="row mt-3">
							<div class="col">
								<label>Product Color:</label>
								<input  name="color" value="color"/>
							</div>

							<div class="col">
								<label>Product Custom:</label>
								<input  name="custom" value="true"/>
							</div>

							<div class="col">
								<label>Product Quantity:</label>
								<input  name="stock" value="101"/>
							</div>
						</div>

						<input class="mt-3" type="submit" name="submit" value="Input Product">

					</form>
				</div>
			</div>
		</div>
		
	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>


	</body>

</html>