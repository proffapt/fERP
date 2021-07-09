try{
    var x = myframe.document.querySelectorAll('textarea');
    var scripts = [ "The teacher is great and understanding", "They have a great understanding of the subject", 
                    "They clear doubts and make sure the students understand the concepts", "They are caring and take clear our doubts",
                    "They ensure that the speed of the lecture is perfect for everyone", "They hold extra classes for revision",
                    "They are understanding of the students problems in network and connectivity", "They release the slides an materials as soon as possible",
                    "They make sure that the assignment load is not a lot on the students"
                  ];

    var flag = Math.floor(Math.random() * scripts.length);
    x[0].value=scripts[flag];

    x[1].value = "Nothing as such";  // this is the default Weakness
    x[3].value = "Nothing as such";  // replace with relevant text

    scripts = [ "The course is well structured and gives us a great understanding", "It is meant to given a good real world approach",
                "It is good for real life applications", "We have enough number of tests to make the course thorough",
                "The course conveys the essence of the subject to the students to its best", "The course content is intuitive",
                "The course is designed to ensure that the students are not left behind", "This course held its importance in online sem too"
              ];

    flag = Math.floor(Math.random() * scripts.length);
    x[2].value=scripts[flag];

    x[4].value = "No suggestions as such";

    for (i = 5; i < x.length; i++) {  // extra spaces "NIL"ed
      x[i].value = "NIL";
    }

    x = myframe.document.querySelectorAll('input[type="radio"]');
    for (i = 1; i < x.length; i++){
      if (x[i].getAttribute('name') == 'check') {
        continue;
      }
      x[i].click();
    }

  }catch(err){
    console.log(err);
}