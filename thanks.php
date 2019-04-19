<?php
	$link = mysqli_connect("localhost", "ismith_08c855_cg", "=M&8HxL}ss2h", "ismith_isfeedback");

	if(mysqli_connect_error()) {
		die("Couldn't connect to the database.");
	} else {
		$query = 'INSERT INTO feedback(email, firstname, lastname, message) values("", "", "", "")';
		echo('Connection succeeded.');
	}
?>

