const positiveFeedbackButton = document.getElementById("positive_feedback");
const neutralFeedbackButton = document.getElementById("neutral_feedback");
const negativeFeedbackButton = document.getElementById("negative_feedback");

positiveFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/positive_feedback.js" })
});

neutralFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/neutral_feedback.js" })
});

negativeFeedbackButton.addEventListener("click", () => {
	browser.tabs.executeScript({ file: "/js/negative_feedback.js" })
});