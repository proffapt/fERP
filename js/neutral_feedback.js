var textBox, radioButton, start, course, prof, profCounter = 0, courseCounter = 0, profListening = false, courseListening = false;

browser.runtime.sendMessage({
	request: "getStatusOfAll",
}).then((preference) => {
	console.log("User wants to save the preference for feedback type? : ", preference.all);
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

function fill_form() {
	textBox = document.querySelectorAll('textarea');

	if (textBox.length == 5) theory_course();
	else lab_course();
}

function theory_course() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = 0; i < textBox.length; i++)
		textBox[i].value = "Nothing as such";

	// Clicks `Good` OR `Very Good` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
		else radioButton[i + 3].click();
	// Randomising selection between `Heavy` & `Average` for Efforts and Workload
	for (i = start + 52; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}

function lab_course() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = 0; i < textBox.length; i++)
		textBox[i].value = "Nothing as such";

	// Clicks `Good` OR `Very Good` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
		else radioButton[i + 3].click();
	// Randomising selection between `Heavy` & `Average` for Efforts and Workload
	for (i = start + 47; i < start + 53; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}