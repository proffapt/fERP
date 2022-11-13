try{
    var textBox = myframe.document.querySelectorAll('textarea');
    var teacherWeaknesses = [ "The teacher is not approachable", "The teacher doesn't make sure the students understand the concepts", 
					"The teacher is less engaging", "The teacher doesn't release the experiment theory and reference material on time"
                  ];

	// Randomly selecting teacher's weaknesses from the array created above
    textBox[1].value=teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

    textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength

	suggestions = [ "Fix broken or faulty equipments, wastes a lot of time", "Give some extra theory regarding the experiments"];
    textBox[2].value = suggestions[Math.floor(Math.random() * suggestions.length)];

    for (i = 5; i < textBox.length; i++) {  // extra spaces "NIL"ed
      textBox[i].value = "NIL";
    }

    radioButton = myframe.document.querySelectorAll('input[type="radio"]');

	// Calculating the start index for filling up the radio buttons
	var start = 0; for (i=0 ; radioButton[i].getAttribute('name') == 'check'; i++, start++){}

    for (i = start; i < radioButton.length; i+=5){
		// Clicks `Poor` OR `Fair` everywhere
		if (Math.floor(Math.random()*2)){
			radioButton[i].click();
		}else{
			radioButton[i+1].click();
		}
    }
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i=start+48; i<start+54; i+=5)
	if (Math.floor(Math.random()*2)){
		radioButton[i].click();
	}else{
		radioButton[i+1].click();
	}
  }catch(err){
    console.log(err);
}