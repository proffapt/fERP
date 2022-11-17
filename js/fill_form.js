var textBox, radioButton, start, course, prof, profCounter = 0, courseCounter = 0, profListening = false, courseListening = false;

browser.runtime.sendMessage({
	request: "getStatusOfAll&FeedbackType",
	}).then((preference) => {
	console.log("User wants to save the preference for feedback type? : ", preference.all);
	console.log("Feedback Type = ", preference.feedback);
	try {
		if (!preference.all) {
			fill_form();
			console.log("form filled");
			console.log("Choose next feedback type");
		} else {
			console.log("Just fill the captcha, rest I will handle");
			course = document.querySelectorAll('a[href="javascript:void(0)"]');
			prof = document.querySelectorAll('input[name="check"]');
			courseCounter = 0;
			handleCourse();
		}
	} catch (err) {
		console.error(err);
	}
});

function handleCourse() {
	course[courseCounter].click(); courseCounter++;
	profCounter = 0;
	handleProf();
	if (courseCounter < course.length) {
		var submitButton = document.getElementById("sub");
		if (!profListening) {
			courseListening = true; submitButton.addEventListener("click", handleCourse);
			submitButton.removeEventListener("click", handleProf);
			console.log("Waiting to go to next course, please fill the form");
		}
		profListening = false;
	} else {
		submitButton.removeEventListener("click", handleProf);
		submitButton.removeEventListener("click", handleCourse);
		console.log("all courses handeled"); return;
	}
}

function handleProf() {
	prof[profCounter].click(); profCounter++;
	fill_form();
	console.log("Form filled");

	var submitButton = document.getElementById("sub");
	if (profCounter < prof.length) {
		if (!courseListening) {
			profListening = true; submitButton.addEventListener("click", handleProf);
			submitButton.removeEventListener("click", handleCourse);
			console.log("Waiting to go to next prof, please fill the form");
		}
	} else {
		if (!profListening) {
			courseListening = true; submitButton.addEventListener("click", handleCourse);
			submitButton.removeEventListener("click", handleProf);
			console.log("all profs in this course handeled");
			console.log("Waiting to go to next course, please fill the form");
		}
		courseListening = false;
		return;
	}
}

function fill_form(feedback) {
	textBox = document.querySelectorAll('textarea');

	if (textBox.length == 5) {
		switch (feedback) {
			case "positive":
				positive_theory_feedback();
				break;
			case "neutral":
				neutral_theory_feedback();
				break;
			case "negative":
				negative_theory_feedback();
				break;
		}
	}
	else {
		switch (feedback) {
			case "positive":
				positive_lab_feedback();
				break;
			case "neutral":
				neutral_lab_feedback();
				break;
			case "negative":
				negative_lab_feedback();
				break;
		}
	}
}