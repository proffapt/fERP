try{
    radioButton = myframe.document.querySelectorAll('input[type="radio"]');

    for (i = 1; i < radioButton.length-10; i+=5){
		// Clicks `Poor` OR `Fair` everywhere
		if (Math.floor(Math.random()*2)){
			radioButton[i].click();
		}else{
			radioButton[i+1].click();
		}
    }
	// Randomising selection between `Too Slow` & `Too Fast`
	if (Math.floor(Math.random()*2)){
		radioButton[16].click();
	}else{
		radioButton[20].click();
	}
	// Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
	for (i=54; i<radioButton.length; i+=5)
	if (Math.floor(Math.random()*2)){
		radioButton[i].click();
	}else{
		radioButton[i+1].click();
	}
  }catch(err){
    console.log(err);
}