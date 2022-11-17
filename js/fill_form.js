var textBox, radioButton, start, course, prof, profCounter = 0, courseCounter = 0, profListening = false, courseListening = false;

browser.runtime.sendMessage({
	request: "getStatusOfAll&FeedbackType",
}).then((preference) => {
	console.log("User wants to save the preference for feedback type? : ", preference.all);
	console.log("Feedback Type = ", preference.feedback);
	try {
		if (!preference.all) {
			fill_form(preference.feedback);
			console.log("form filled");
			console.log("Choose next feedback type");
		} else {
			console.log("Just fill the captcha, rest I will handle");
			course = document.querySelectorAll('a[href="javascript:void(0)"]');
			prof = document.querySelectorAll('input[name="check"]');
			courseCounter = 0;
			handleCourse(preference.feedback);
		}
	} catch (err) {
		console.error(err);
	}
});

function handleCourse(feedback) {
	course[courseCounter].click(); courseCounter++;
	profCounter = 0;
	handleProf(feedback);
	var submitButton = document.getElementById("sub");
	var addCourseListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeCourseListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeProfListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleProf(x);
			})
	};

	if (courseCounter < course.length) {
		if (!profListening) {
			courseListening = true; addCourseListener(feedback);
			// removeProfListener(feedback);
			submitButton.removeEventListener("click", handleProf);
			console.log("Waiting to go to next course, please fill the form");
		}
		profListening = false;
	} else {
		// removeProfListener(feedback);
		submitButton.removeEventListener("click", handleProf);
		// removeCourseListener(feedback);
		submitButton.removeEventListener("click", handleCourse);
		console.log("all courses handeled"); return;
	}
}

function handleProf(feedback) {
	prof[profCounter].click(); profCounter++;
	fill_form(feedback);
	console.log("Form filled");
	var submitButton = document.getElementById("sub");
	var addCourseListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleCourse(x);
			})
	};
	var addProfListener = (x) => {
		submitButton.addEventListener("click", () => {
				handleProf(x);
			})
	};
	var removeCourseListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleCourse(x);
			})
	};
	var removeProfListener = (x) => {
		submitButton.removeEventListener("click", () => {
				handleProf(x);
			})
	};

	if (profCounter < prof.length) {
		if (!courseListening) {
			profListening = true; addProfListener(feedback);
			// removeCourseListener(feedback);
			submitButton.removeEventListener("click", handleCourse);
			console.log("Waiting to go to next prof, please fill the form");
		}
	} else {
		if (!profListening) {
			courseListening = true; addCourseListener(feedback);
			// removeProfListener(feedback);
			submitButton.removeEventListener("click", handleProf);
			console.log("all profs in this course handeled");
			console.log("Waiting to go to next course, please fill the form");
		}
		courseListening = false;
		return;
	}
}

function fill_form(feedback) {
	console.log("Feedback Type = ", feedback);
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

function neutral_theory_feedback() {
	console.log("doing something");
}

function positive_theory_feedback() {
	console.log("doing something");
}

function negative_theory_feedback() {
	console.log("doing something");
}