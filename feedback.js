try{
    var x = myframe.document.querySelectorAll('textarea');
    var i = 0;
    for (i = 0; i < x.length; i++){
      x[i].value="NIL";
    }

    x = myframe.document.querySelectorAll('input[type="radio"]');
    for (i = 1; i < x.length; i++){
        if (x[i].getAttribute('name') == 'check'){
            continue;
        }
        x[i].click();
    }

  }catch(err){
    console.log(err);
  }
