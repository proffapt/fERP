const positiveFeedbackButton = document.getElementById("positive_feedback_btn");
const neutralFeedbackButton = document.getElementById("neutral_feedback_btn");
const negativeFeedbackButton = document.getElementById("negative_feedback_btn");

positiveFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/positive_feedback.js" })
});

neutralFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/neutral_feedback.js" })
});

negativeFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/negative_feedback.js" })
});