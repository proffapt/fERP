// Fetching status of checkBox
var isChecked = true;
const checkBox = document.getElementById("use_for_all");
checkBox.addEventListener("click", () => {
    isChecked = checkBox.checked;
});

// Handler for Button Click
const handleButtonClick = (feedback) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getStatusOfAll&FeedbackType", preference: feedback, all: isChecked });
        chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ['/js/feedback.js'] });
    });
};

// Configuring feedback Buttons
const feedbackButtons = [
    { id: "positive_btn", type: "positive" },
    { id: "neutral_btn", type: "neutral" },
    { id: "negative_btn", type: "negative" }
];

// Adding event listeners to button
feedbackButtons.forEach(button => {
    const buttonElement = document.getElementById(button.id);
    buttonElement.onclick = () => { handleButtonClick(button.type) };
});