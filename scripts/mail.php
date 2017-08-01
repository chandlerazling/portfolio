<?php
$name = $_POST['name1'];
$email = $_POST['email1'];
$phone = $_POST['phone1'];
$message = $_POST['message1'];
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
	$formcontent=" From: $name \n Phone: $phone\n Message: $message";
	$recipient = "chandlerazling@gmail.com";
	$subject = "Contact Form";
	$mailheader = "From: $email \r\n";
	mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
	echo "Your message has been received! I will get back to you ASAP.";
	} else {
		echo "Sorry! There was an issue with your email address, please fix it or try another one.";
}
?>