<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ex php</title>
</head>
<body>
    <form action="./postDetails.php" method="get">
        <select name="complainType" >
            <?php
                $typeArr = array(
                    "phone" => "Phone problem",
                    "internet" => "Internet problem",
                    "cables" => "Cables problem"
                );

            foreach($typeArr as $type => $problem):?>
                <option value="<?php echo $type;?>">
                    <?php echo $problem;?>
                </option>
            <?php endforeach;?>
        </select>
        <input type="submit" value="submit">
    </form>
</body>
</html>