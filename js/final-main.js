$(document).ready(function() {
	"use strict";
/*
	partialsUrl 	- this variable stores relative path to HTML partial
    userName 		- this variable stores the name of user (entered in HTML form
    userEmail 		- this variable stores the email of user (entered in HTML form) 
	userSubject 	- this variable stores the subject user entered in HTML form 
    userMessage 	- this variable stores the message user entered in HTML form
    userFormDetails - this object collects (stores) name, email, subject and message from HTML 			form (all in one place)
    errors 			- this array stores error-messages during the process of form-validation
    collectErrors 	- this variable stores error-messages parsed into HTML structure
		    		(this means looping through array errors and parsing the values of  errors array to unordered list, and finally 
					saving the result in collect variable.)
    i 				- this variable is used as index-pointer in loops. 
    homeContents 	- the content that gets displayed when the page os landed on or the home button is clicked
    */
	"use strict";
	var userName,
		userEmail,
		userSubject,
		userMessage,
		userFormDetails,
		errors,
		collectErrors,
		i,
		homeContents,
		partialsUrl;
		
	//load content from partials when the index page first loads
	homeContents = {}; // {} curley brackets are for objects
	$(".content-container").load("./partials/home.html", function(response) {
		homeContents["./partials/home.html"] = response; //square brackets specifies parameters for the object
	});

	function loadhomeContents(urlParam) {
		
		//if content already exixts inside homeContents
		if (homeContents[urlParam]) {
			//load content from array
			$(".content-container").html(homeContents[urlParam]);
		} else {
			//load content by ajax request
			$(".content-container").load(urlParam, function(response) {
				homeContents[urlParam] = response;
			});
		}
	}
	
	//what to do when top links are clicked
	$("a").on("click", function(ev) {
		ev.preventDefault(); //make sure clicking on link doesn't take user to a new page
		partialsUrl = $(this).attr("href"); //get the url from whatever link is clicked
		loadhomeContents(partialsUrl); //run loadhomeContents function with the value from partialsUrl
		$(".content-container").on("submit", "form", handleForm);
	});
	
	//Deal with the form on the contact page
	function handleFormSuccess(formResponse) {
		// print the formResponse inside <div class="feeback"></div>
		$(".feedback").html(formResponse);
		$("#user-name").val("");
		$("#user-email").val("");
		$("#user-subject").val("");
		$("#user-message").val("");
	}
	
	// deal with errors
	function handleFormError(jqXHR, textStatus, errorThrown) {
		$(".feedback").html("There was a problem submitting the form.");
	}
	

	function handleForm(ev) {
		// prevent form from submitting (keep the data in the form elements)
		ev.preventDefault();
		var q;
		errors = [];
		userFormDetails = {};
		
		// access the values from first and last name:
		userName = $("#user-name").val();
		userEmail = $("#user-email").val();
		userSubject = $("#user-subject").val();
		userMessage = $("#user-message").val();
		
		if (userName !== "") {
			userFormDetails.user_name = userName;
		} else {
			errors.push("<li>Please enter your name</li>");
		}
		
		if (userEmail !== "") {
			userFormDetails.user_email = userEmail;
		} else {
			errors.push("<li>Please enter your email address</li>");
		}

		if (userSubject !== "") {
			userFormDetails.user_subject = userSubject;
		} else {
			errors.push("<li>Please enter a subject</li>");
		}

		if (userMessage !== "") {
			userFormDetails.user_message = userMessage;
		} else {
			errors.push("<li>Please leave a message</li>");
		}
		
		// Check if the data is ready
		if (errors.length === 0) {
			// handle ajax request
			$.ajax({
				type: "post",
				url: "./php/contact-service.php",
				data: userFormDetails,
				dataType: "text"
			}).done(handleFormSuccess).fail(handleFormError);
		} else {
			// report error(s)
			var collect = "<ul>";
			for (q = 0; q < errors.length; q += 1) {
				collect += errors[q];
			}
			
			collect += "</ul>";
			if (collect) {
				$("#feedback").html(collect);
			}
		}
	}
	// add event listener
	$("form").on("submit", handleForm);
});