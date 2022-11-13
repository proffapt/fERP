try{
    var textBox = myframe.document.querySelectorAll('textarea');
    var teacherStrengths = [ "The teacher is understanding, approachable and caring", "They have deep understanding and clarity of the subject", 
                    "They clear doubts and make sure the students understand the concepts", "They ensure that the speed of the lecture is perfect for everyone", 
                    "They release the slides and materials as soon as possible", "They make sure that the assignment load is not a lot on students"
                  ];

    textBox[0].value=teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

    textBox[1].value = "Nothing as such";  // this is the default Weakness
    textBox[3].value = "Nothing as such";  // replace with relevant text

    courseStrengths = [ "The course is well structured and gave me a great understanding of the fundamental concepts",
                "It is good for real life applications", "It had enough number of tests to make the course thorough",
                "It conveys the essence of the subject to the students at its best", "It's content is intuitive",
                "It is designed to ensure that the students are not left behind", "Overall it was interesting to study the course"
              ];

    textBox[2].value=courseStrengths[Math.floor(Math.random() * courseStrengths.length)];

    textBox[4].value = "No suggestions as such, so far so good";

    for (i = 5; i < textBox.length; i++) {  // extra spaces "NIL"ed
      textBox[i].value = "NIL";
    }

    radioButton = myframe.document.querySelectorAll('input[type="radio"]');

    for (i = 5; i < radioButton.length-10; i+=5){
      radioButton[i].click();
    }
	radioButton[18].click();
    radioButton[53].click();
    radioButton[58].click();
  }catch(err){
    console.log(err);
}
