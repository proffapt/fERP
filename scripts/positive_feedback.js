const textBox = myframe.document.querySelectorAll('textarea');
const radioButton = myframe.document.querySelectorAll('input[type="radio"]');

// Calculating the start index for filling up the radio buttons
// Basically, ignoring radio buttons designated for selecting profs.
let start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

function setRandomValueFromArray(array, index) {
	textBox[index].value = array[Math.floor(Math.random() * array.length)];
	return textBox[index].value;
  }

function theory_course() {
	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the speed of the lecture is perfect for everyone",
		"The teacher releases the slides and materials as soon as possible",
		"The teacher makes sure that the assignment load is not a lot on students"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = setRandomValueFromArray(teacherStrengths, 0);

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
	textBox[2].value = setRandomValueFromArray(courseStrengths, 2);

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
	var teacherStrengths = [
		"The teacher is understanding, approachable and caring",
		"The teacher has deep understanding and clarity of the subject",
		"The teacher clears doubts and make sure the students understand the concepts",
		"The teacher ensures that the students get ample amount of time for the experiment"
	];
	// Randomly selecting teacher's strengths from the array created above
	textBox[0].value = setRandomValueFromArray(teacherStrengths, 0);

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

try {
	if (textBox.length == 5) theory_course();
	else lab_course();
} catch(err) {
	console.error(err);
}