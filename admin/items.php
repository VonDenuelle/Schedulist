<!DOCTYPE html>
<html lang="en" dir="ltr">


<head>

    <meta charset="utf-8">
    <meta name=”title” content="4MS Flower Shop" />
    <meta name="description" content="This is meta description Sample. We can add up to 158.">
    <meta name="geo.region" content="PH-ZMB" />
    <meta name="geo.placename" content="Olongapo" />
    <meta name="geo.position" content="14.831468;120.283521" />
    <meta name="ICBM" content="14.831468, 120.283521" />

    <meta name=”keywords” content=”4MS, Flower Shop, flower, rose, bouquet, olongapo city, 4ms flower shop, custom flowers, different flowers, petals” />
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title>4MS Flower Shop</title>
    <link rel="stylesheet" href="../assets/css/home.css">
    <link rel="stylesheet" href="../css/admin/image.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/items.css">
    <link rel="stylesheet" href="../css/admin/sidenav.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="../js/items.js" charset="utf-8"></script>
</head>

<body>

    <div class="container-fluid">
        <div class="row flex-nowrap">
            <!-- SIDE NAV -->
            <?php include_once '../php/global/sidenav.php'; ?>
            
            <!-- 2ND COL -->
            <div class="col">
                <div class="container flower-flex">

                    <?php
                    require_once '../php/config.php';

                    $sql ="SELECT * FROM items ORDER BY date_added DESC";
                    $query = $dbh -> query($sql);
                    $results=$query->fetchAll(PDO::FETCH_ASSOC);
                    $rowcount=$query->rowCount();

                    if ($rowcount > 0) {
                        foreach ($results as $item) {
                            # code...?>

                    <a href="/4MS/comments?itemid=<?php echo htmlspecialchars($item['id']); ?>">
                        <div class="card  mx-auto mb-2" style="width: 18rem;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="../images/flowers/<?php echo htmlspecialchars($item['image']); ?>" class="card-img-top" alt="...">
                                </div>

                                <div class="col-md-10">
                                    <div class="card-body">
                                        <h5 class="card-title"><?php echo htmlspecialchars($item['name']); ?></h5>
                                        <p class="card-text"><?php echo htmlspecialchars($item['description']); ?></p>
                                    </div>

                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"><?php echo htmlspecialchars($item['price']); ?></li>
                                        <li class="list-group-item"><?php echo htmlspecialchars($item['stock']); ?></li>
                                        <li class="list-group-item">
                                            <?php 
                                                $date=date_create(htmlspecialchars($item['date_added']));
                                                $formattedDate = date_format($date, 'D M j-Y, g:i a');
                                                echo $formattedDate;
                                            ?>
                                        </li>

                        
                                            <a class="btn btn-danger" href="php/includes/admin/delete_item?itemid=<?php echo htmlspecialchars($item['id']);?>&image=<?php echo htmlspecialchars($item['image']); ?>" id="delete">
                                            Delete</a>
    
                                </div>
                            </div>    
                        </div>
                    </a>

                    <?php          
                        }
                    }
                    ?>
                    
                </div>
            </div>
        </div>
    </div>
    
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>

</html>