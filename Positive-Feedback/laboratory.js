try{
    var textBox = myframe.document.querySelectorAll('textarea');
    var teacherStrengths = [ "The teacher is understanding, approachable and caring", "The teacher has deep understanding and clarity of the subject", 
                    "The teacher clears doubts and make sure the students understand the concepts", "The teacher ensures that the students get ample amount of time for the experiment"
                  ];

	// Randomly selecting teacher's strengths from the array created above
    textBox[0].value=teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

    textBox[1].value = "Nothing as such";  // this is the default Weakness
    textBox[2].value = "No suggestions as such, so far so good";

    for (i = 5; i < textBox.length; i++) {  // extra spaces "NIL"ed
      textBox[i].value = "NIL";
    }

    radioButton = myframe.document.querySelectorAll('input[type="radio"]');

	// Calculating the start index for filling up the radio buttons
	var start = 0; for (i=0 ; radioButton[i].getAttribute('name') == 'check'; i++, start++){}

    for (i = start; i < radioButton.length; i+=5){
		// Clicks `Excellent` OR `Very Good` everywhere
		if (Math.floor(Math.random()*2)){
			radioButton[i+3].click();
		}else{
			radioButton[i+4].click();
		}
    }
    radioButton[start+47].click(); // Clicks `Average` for efforts
    radioButton[start+52].click(); // Clicks `Average` for Workload
  }catch(err){
    console.log(err);
}
