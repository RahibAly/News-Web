<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>News Blog</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css" />
    <!-- Google Fonts Roboto -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <!-- MDB -->
    <link rel="stylesheet" href="assets/css/mdb.min.css" />
    <!-- Custom styles -->
    <link rel="stylesheet" href="assets/css/style.css" />
    <!-- Site Icons -->
    <link rel="shortcut icon" href="assets/img/favicon.png" type="image/x-icon" />
    <link rel="apple-touch-icon" href="assets/img/favicon.png">
    
    <script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=606f6d624d1bac0012adf5f4&product=inline-share-buttons" async="async"></script>

    <script>
        window.pageName = 'details';
    </script>
</head>
<body>

  <?php
    $currentPage = 'details';
    include_once('views/header.php');
    include_once('views/newsDetails.php');
    include_once('views/footer.php');
  ?>

    <!-- jQuery CDN -->
    <script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"></script>
    
    <!-- jQuery UI -->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
    <!-- MDB -->
    <script type="text/javascript" src="assets/js/mdb.min.js"></script>
    
    <!-- Custom scripts -->
    <script type="text/javascript" src="assets/js/main.js"></script>


</body>
</html>