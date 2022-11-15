ffButton = document.getElementById("fill_the_form_button");
ffButton.addEventListener("click", fillFeedback);

function fillFeedback() {
	browser.tabs.executeScript({ file: "/js/feedback.js" })
}

