try{
    var x = myframe.document.querySelectorAll('textarea');
    var scripts = [ "The teacher is great and understanding", "They have deep understanding and clarity of the subject", 
                    "They clear doubts and make sure the students understand the concepts", "They are caring and clear our doubts",
                    "They ensure that the speed of the lecture is perfect for everyone", "They are understanding of the students problems in network and connectivity", 
                    "They release the slides an materials as soon as possible", "They make sure that the assignment load is not a lot on students"
                  ];

    x[0].value=scripts[Math.floor(Math.random() * scripts.length)];

    x[1].value = "Nothing as such";  // this is the default Weakness
    x[3].value = "Nothing as such";  // replace with relevant text

    scripts = [ "The course is well structured and gave me a great understanding of the fundamental concepts",
                "It is good for real life applications", "We have enough number of tests to make the course thorough",
                "The course conveys the essence of the subject to the students at its best", "The course content is intuitive",
                "The course is designed to ensure that the students are not left behind"
              ];

    x[2].value=scripts[Math.floor(Math.random() * scripts.length)];

    x[4].value = "No suggestions as such, so far so good";

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
