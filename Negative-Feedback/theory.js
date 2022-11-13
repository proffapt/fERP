try{
    var textBox = myframe.document.querySelectorAll('textarea');
    var teacherWeaknesses = [ "The teacher is not approachable", "The teacher doesn't make sure the students understand the concepts", 
					"The teacher ensures that the speed of the lecture is perfect for everyone", "The teacher is less engaging",
                    "The teacher doesn't release the slides and materials on time", "The teacher gives too much workload in form of assignments"
                  ];

	// Randomly selecting teacher's weaknesses from the array created above
    textBox[1].value=teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

    textBox[0].value = "Unfortunately, can not remember any.";  // this is the default Strength
    textBox[2].value = "Unfortunately, can not remember any.";  // replace with relevant text

    courseWeaknesses = [ "This course is not well structured and assumed the students to already have the basic knowledge of it",
                "This course doesn't reflect any real life applications for the subject of study",
                "This course conveys the essence of the subject in a hard to grasp manner", "This course's content is not intuitive",
                "This course has a steep learning curve", "Overall this course was not interesting to study!"
              ];

	// Randomly selecting course's weaknesses from the array created above
    textBox[3].value=courseWeaknesses[Math.floor(Math.random() * courseWeaknesses.length)];

	suggestions = [ "Update the course's content", "Make the course more engaging"];

    textBox[4].value = suggestions[Math.floor(Math.random() * suggestions.length)];

    for (i = 5; i < textBox.length; i++) {  // extra spaces "NIL"ed
      textBox[i].value = "NIL";
    }

    radioButton = myframe.document.querySelectorAll('input[type="radio"]');

	// Calculating the start index for filling up the radio buttons
	var start = 0; for (i=0 ; radioButton[i].getAttribute('name') == 'check'; i++, start++){}

    for (i = start; i < radioButton.length-10; i+=5){
		// Clicks `Poor` OR `Fair` everywhere
		if (Math.floor(Math.random()*2)){
			radioButton[i].click();
		}else{
			radioButton[i+1].click();
		}
    }
	// Randomising selection between `Too Slow` & `Too Fast`
	if (Math.floor(Math.random()*2)){
		radioButton[start+15].click();
	}else{
		radioButton[start+19].click();
	}
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i=start+53; i<radioButton.length; i+=5)
	if (Math.floor(Math.random()*2)){
		radioButton[i].click();
	}else{
		radioButton[i+1].click();
	}
  }catch(err){
    console.log(err);
}