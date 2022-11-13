try {
	var textBox = myframe.document.querySelectorAll('textarea');
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

	for (i = 5; i < textBox.length; i++) {  // extra spaces "NIL"ed
		textBox[i].value = "NIL";
	}

	radioButton = myframe.document.querySelectorAll('input[type="radio"]');

	// Calculating the start index for filling up the radio buttons
	var start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = start; i < radioButton.length - 10; i += 5) {
		// Clicks `Excellent` OR `Very Good` everywhere
		if (Math.floor(Math.random() * 2)) {
			radioButton[i + 3].click();
		} else {
			radioButton[i + 4].click();
		}
	}
	radioButton[start + 17].click(); // Clicks `Just Right` for pace
	radioButton[start + 52].click(); // Clicks `Average` for efforts
	radioButton[start + 57].click(); // Clicks `Average` for Workload
} catch (err) {
	console.log(err);
}
