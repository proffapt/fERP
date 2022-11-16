// getting required elements from the extension
const positiveFeedbackButton = document.getElementById("positive_feedback_btn");
const neutralFeedbackButton = document.getElementById("neutral_feedback_btn");
const negativeFeedbackButton = document.getElementById("negative_feedback_btn");
const checkBox = document.getElementById("use_for_all");
// Sending status of checkBox to content scripts
var isChecked = true;
checkBox.addEventListener("click", () => {
	if (checkBox.checked) isChecked = true;
	else isChecked = false;
});
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	sendResponse({ status: isChecked });
});

positiveFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/positive_feedback.js" })
});

neutralFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/neutral_feedback.js" })
});

negativeFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/negative_feedback.js" })
});