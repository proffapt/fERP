// getting required elements from the extension
const positiveFeedbackButton = document.getElementById("positive_btn");
const neutralFeedbackButton = document.getElementById("neutral_btn");
const negativeFeedbackButton = document.getElementById("negative_btn");
const checkBox = document.getElementById("use_for_all");
// Sending status of checkBox to content scripts
var isChecked = false;
checkBox.addEventListener("click", () => {
	if (checkBox.checked) isChecked = true;
	else isChecked = false;
});

var feedback;

positiveFeedbackButton.addEventListener("click", () => {
	feedback = "positive";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "getStatusOfAll&FeedbackType", preference: feedback, all: isChecked});
	});
	chrome.tabs.executeScript({ file: "/js/feedback.js" })
});

neutralFeedbackButton.addEventListener("click", () => {
	feedback = "neutral";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "getStatusOfAll&FeedbackType", preference: feedback, all: isChecked});
	});
	chrome.tabs.executeScript({ file: "/js/feedback.js" })
});

negativeFeedbackButton.addEventListener("click", () => {
	feedback = "negative";
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "getStatusOfAll&FeedbackType", preference: feedback, all: isChecked});
	});
	chrome.tabs.executeScript({ file: "/js/feedback.js" })
});
