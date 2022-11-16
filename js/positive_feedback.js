var textBox, radioButton, start, course, prof, profCounter = 0, courseCounter = 0;

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
		submitButton.addEventListener("click", handleCourse);
		console.log("Waiting to go to next course, please fill the form");
	} else return;
}

function handleProf() {
	prof[profCounter].click(); profCounter++;
	fill_form();
	console.log("Form filled");

	if (profCounter < prof.length) {
		var submitButton = document.getElementById("sub");
		submitButton.addEventListener("click", handleProf);
		console.log("Waiting to go to next prof, please fill the form");
	} else return;
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

	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the speed of the lecture is perfect for everyone",
		"The teacher releases the slides and materials as soon as possible",
		"The teacher makes sure that the assignment load is not a lot on students"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

	textBox[1].value = "Nothing as such";  // this is the default Weakness
	textBox[3].value = "Nothing as such";  // replace with relevant text

	courseStrengths = [
		"This course is well structured and gave me a great understanding of the fundamental concepts",
		"This course is good for real life applications",
		"This course had enough number of tests to make the course thorough",
		"This course conveys the essence of the subject to the students at its best",
		"This course's content is intuitive",
		"This course is designed to ensure that the students are not left behind",
		"Overall this course was interesting and fun to study!"
	];
	// Randomly selecting course's strengths from the array created above
	textBox[2].value = courseStrengths[Math.floor(Math.random() * courseStrengths.length)];

	textBox[4].value = "No suggestions as such, so far so good";

	for (i = 5; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Excellent` OR `Very Good` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i + 3].click();
		else radioButton[i + 4].click();
	radioButton[start + 17].click(); // Clicks `Just Right` for pace
	radioButton[start + 52].click(); // Clicks `Average` for efforts
	radioButton[start + 57].click(); // Clicks `Average` for Workload
}

function lab_course() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the students get ample amount of time for the experiment"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

	textBox[1].value = "Nothing as such";  // this is the default Weakness
	textBox[2].value = "No suggestions as such, so far so good";

	for (i = 3; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Excellent` OR `Very Good` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2))radioButton[i + 3].click();
		else radioButton[i + 4].click();
	radioButton[start + 47].click(); // Clicks `Average` for efforts
	radioButton[start + 52].click(); // Clicks `Average` for Workload
}