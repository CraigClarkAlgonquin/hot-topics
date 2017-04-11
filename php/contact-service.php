<?php 	
	$EmailFrom = Trim(stripslashes($_POST['user_name']));
	$EmailTo = "clark.craig@gmail.com";
	$Subject = Trim(stripslashes($_POST['user_subject'])); 
	$Name = Trim(stripslashes($_POST['user_name'])); 
	$Email = Trim(stripslashes($_POST['user_email'])); 
	$Message = Trim(stripslashes($_POST['user_message'])); 
	
	// prepare email body text
	$Body = "";
	$Body .= $Name;
	$Body .= " has sent you a message";
	$Body .= "\n\n\n";
	$Body .= $Message;
	
	// send email 
	$success = mail($EmailTo, $Subject, $Body, "From: $Email");
	
	
	if ($success){
	  print "<h2>Success!</h2>
	  		<p>A message with the following details has been sent to $EmailTo</p>
	  		<ul>
		  		<li><strong>Name:</strong> $EmailFrom</li>
		  		<li><strong>Email address:</strong> $Email</li>
		  		<li><strong>Subject:</strong> $Subject</li>
		  		<li><strong>Message:</strong> $Message</li>
	  		</ul>";
	}
	else{
	  print "<p>Something went wrong! Glad this isn't a php assignment!</p>";
	}
	


?>


