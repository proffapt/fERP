const positiveFeedbackButton = document.getElementById("positive_feedback");
const neutralFeedbackButton = document.getElementById("netural_feedback");
const negativeFeedbackButton = document.getElementById("negative_feedback");

positiveFeedbackButton.addEventListener("click", () => {

	browser.tabs.executeScript({ file: "/js/feedback.js" })

	// if (course == "theory_course") {
	// 	if (feedback == "positive_feedback"){
		// }
	// }
});
