// getting required elements from the extension
const positiveFeedbackButton = document.getElementById("positive_btn");
const neutralFeedbackButton = document.getElementById("neutral_btn");
const negativeFeedbackButton = document.getElementById("negative_btn");
const checkBox = document.getElementById("use_for_all");

// Sending status of checkBox to content scripts
var isChecked = true;
checkBox.addEventListener("click", () => {
  isChecked = checkBox.checked;
});

var feedback;

positiveFeedbackButton.addEventListener("click", () => {
	feedback = "positive";
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.request == "getStatusOfAll&FeedbackType")
			sendResponse({
				all: isChecked,
				feedback: feedback
			});
	});
	browser.tabs.executeScript({ file: "/js/feedback.js" })
	browser.runtime.onMessage.removeListener((request, sender, sendResponse) => {});
});

neutralFeedbackButton.addEventListener("click", () => {
	feedback = "neutral";
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.request == "getStatusOfAll&FeedbackType")
			sendResponse({
				all: isChecked,
				feedback: feedback
			});
	});
	browser.tabs.executeScript({ file: "/js/feedback.js" })
	browser.runtime.onMessage.removeListener((request, sender, sendResponse) => {});
});

negativeFeedbackButton.addEventListener("click", () => {
	feedback = "negative";
	browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.request == "getStatusOfAll&FeedbackType")
			sendResponse({
				all: isChecked,
				feedback: feedback
			});
	});
	browser.tabs.executeScript({ file: "/js/feedback.js" })
	browser.runtime.onMessage.removeListener((request, sender, sendResponse) => {});
});
