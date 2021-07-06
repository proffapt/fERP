try{
    var x = myframe.document.querySelectorAll('textarea');
    var scripts = ["The teacher is great and understanding", "They have a great understanding of the subject", 
                  "They clear doubts and make sure the students understand the concepts"];
    x[0].value=scripts[Math.floor(Math.random() * scripts.length)];

    x[1].value = "Nothing as such";

    // for (i = 0; i < x.length; i++) {
    //   x[i].value=scripts[Math.floor(Math.random() * scripts.length)];
    // }

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
