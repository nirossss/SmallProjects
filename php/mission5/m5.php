<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./m5.css">
    <title>Mission 5</title>
</head>
<body>
    <h1>
        <img src="./googleLogo.png" alt="">
        Search
    </h1>

    <form action="" method="GET">
        <input type="text" name="search" placeholder="Search"><br/>
        <button type="submit" title="Search">
            <i class="fa fa-search fa-lg"></i>
        </button>
    </form>

    <?php
        if(isset($_GET['search'])) {
            $search = $_GET['search'];

            if(empty($search)) {
                echo "<p>*Empty search input</p>";

            } else {
                header('Location: https://www.google.com/search?q=' . $search);
                exit;
            };
        };
    ?>
</body>
</html>