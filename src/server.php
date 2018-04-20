<?php
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $housing = $_POST['housing'];
    $app = $_POST['app'];
    $floor = $_POST['floor'];
    $pay = $_POST['pay'];
    $text = $_POST['text'];

    $callback = $_POST['callback'];
    $callback = isset($callback) ? 'NO' : 'YES';

    $mail_message = '
        <html>
        <head>
            <title>Новая заявка</title>
        </head>
        <body>
            <h2>Подробности заказа</h2>
            <ul>
                <li> Имя: '.$name.' </li>
                <li> Телефон: '.$phone.' </li>
                <li> Адрес: цлица '.$street.', дом '.$house.', корпус '.$housing.', квартира '.$app.', этаж '.$floor.' </li>
                <li> Способ оплаты: '.$pay.' </li>
                <li> Перезванивать?: '.$callback.' </li>
                <li> Дополнительная информация: '.$text.' </li>
            </ul>
        </body>
        </html>
    
    ';

    $headers =  "From: Ever Best Burger <ors_step.obj@mail.ru>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('ors_step.obj@mail.ru', 'Новый заказ', $mail_message, $headers);
    $data = [];

    if ($mail){
        $data['status'] = "OK";
        $data['resp'] = "Message was sent";
    }else{
        $data['status'] = "error";
        $data['resp'] = "Where is some server error";
    }

    echo $data['resp'];
?>