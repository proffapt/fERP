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

	var teacherWeaknesses = [
		"The teacher is not approachable",
		"The teacher doesn't make sure the students understand the concepts",
		"The teacher doesn't ensures that the speed of the lecture is perfect for everyone",
		"The teacher is less engaging",
		"The teacher doesn't release the slides and materials on time",
		"The teacher gives too much workload in form of assignments"
	];
	// Randomly selecting teacher's weaknesses from the array created above
	textBox[1].value = teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

	textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength
	textBox[2].value = "Unfortunately, can not remember any.";  // replace with relevant text

	courseWeaknesses = [
		"This course is not well structured and assumed the students to already have the basic knowledge of it",
		"This course doesn't reflect any real life applications for the subject of study",
		"This course conveys the essence of the subject in a hard to grasp manner",
		"This course's content is not intuitive",
		"This course has a steep learning curve",
		"Overall this course was not interesting to study!"
	];
	// Randomly selecting course's weaknesses from the array created above
	textBox[3].value = courseWeaknesses[Math.floor(Math.random() * courseWeaknesses.length)];

	suggestions = [
		"Update the course's content",
		"Make the course more engaging"
	];
	// Randomly selecting suggestions from the array created above
	textBox[4].value = suggestions[Math.floor(Math.random() * suggestions.length)];

	for (i = 5; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Poor` OR `Fair` everywhere
	for (i = start; i < radioButton.length - 10; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
	// Randomising selection between `Too Slow` & `Too Fast`
	if (Math.floor(Math.random() * 2)) radioButton[start + 15].click();
	else radioButton[start + 19].click();
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i = start + 53; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}

function lab_course() {
	textBox = document.querySelectorAll('textarea');
	radioButton = document.querySelectorAll('input[type="radio"]');
	start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	var teacherWeaknesses = [
		"The teacher is not approachable",
		"The teacher doesn't make sure the students understand the concepts",
		"The teacher is less engaging",
		"The teacher doesn't release the experiment theory and reference material on time"
	];
	// Randomly selecting teacher's weaknesses from the array created above
	textBox[1].value = teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

	textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength

	suggestions = [
		"Fix broken or faulty equipments, wastes a lot of time",
		"Give some extra theory regarding the experiments"
	];
	textBox[2].value = suggestions[Math.floor(Math.random() * suggestions.length)];

	for (i = 3; i < textBox.length; i++)
		textBox[i].value = "NIL"; // extra spaces "NIL"ed

	// Clicks `Poor` OR `Fair` everywhere
	for (i = start; i < radioButton.length; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i = start + 48; i < start + 54; i += 5)
		if (Math.floor(Math.random() * 2)) radioButton[i].click();
		else radioButton[i + 1].click();
}