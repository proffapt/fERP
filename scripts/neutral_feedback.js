var textBox = myframe.document.querySelectorAll('textarea');
var radioButton = myframe.document.querySelectorAll('input[type="radio"]');

// Calculating the start index for filling up the radio buttons
// Basically, ignoring radio buttons designated for selecting profs.
var start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

function theory_course() {
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

try {
	if (textBox.length == 5) theory_course();
	else lab_course();
} catch(err) {
	console.error(err);
}