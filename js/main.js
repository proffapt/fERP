const positiveFeedbackButton = document.getElementById("positive_feedback_btn");
const neutralFeedbackButton = document.getElementById("neutral_feedback_btn");
const negativeFeedbackButton = document.getElementById("negative_feedback_btn");
const checkBox = document.getElementById("use_for_all");
var isChecked = true;
checkBox.addEventListener("click", () => {
	if (checkBox.checked) isChecked = true;
	else isChecked = false;
});
// browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	if (request.allStatus == "getStatusOfAll")
// 		sendResponse({status: isChecked});
// });

positiveFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/positive_feedback.js" })
});

neutralFeedbackButton.addEventListener("click", () => {
	browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// 	if (request.allStatus == "getStatusOfAll")
			sendResponse({status: isChecked, feedback: "neutral"});
		// if (request.feedbackType == "getTypeOfFeedback")
			// sendResponse({feedback: "neutral"});
	});
	browser.tabs.executeScript({ file: "/js/neutral_feedback.js" })
});

negativeFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/negative_feedback.js" })
});