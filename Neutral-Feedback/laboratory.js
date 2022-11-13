try {
	var textBox = myframe.document.querySelectorAll('textarea');
	var i = 0;
	for (i = 0; i < textBox.length; i++) {
		textBox[i].value = "Nothing as such";
	}

	radioButton = myframe.document.querySelectorAll('input[type="radio"]');

	// Calculating the start index for filling up the radio buttons
	var start = 0; for (i = 0; radioButton[i].getAttribute('name') == 'check'; i++, start++) { }

	for (i = start; i < radioButton.length; i += 5) {
		// Clicks `Good` OR `Very Good` everywhere
		if (Math.floor(Math.random() * 2)) {
			radioButton[i + 2].click();
		} else {
			radioButton[i + 3].click();
		}
	}
	// Randomising selection between `Heavy` & `Average` for Efforts and Workload
	for (i = start + 47; i < start + 53; i += 5)
		if (Math.floor(Math.random() * 2)) {
			radioButton[i].click();
		} else {
			radioButton[i + 1].click();
		}

} catch (err) {
	console.log(err);
}