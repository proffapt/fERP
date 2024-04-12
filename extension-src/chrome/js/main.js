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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["/js/feedback.js"],
        });
    });
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
    ) {
        if (request.action === "getStatusOfAll&FeedbackType") {
            sendResponse({ preference: feedback, all: isChecked });
        }
        chrome.runtime.onMessage.removeListener(arguments.callee);
    });
});

neutralFeedbackButton.addEventListener("click", () => {
    feedback = "neutral";
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["/js/feedback.js"],
        });
    });
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
    ) {
        if (request.action === "getStatusOfAll&FeedbackType") {
            sendResponse({ preference: feedback, all: isChecked });
        }
        chrome.runtime.onMessage.removeListener(arguments.callee);
    });
});

negativeFeedbackButton.addEventListener("click", () => {
    feedback = "negative";
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["/js/feedback.js"],
        });
    });
    chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse
    ) {
        if (request.action === "getStatusOfAll&FeedbackType") {
            sendResponse({ preference: feedback, all: isChecked });
        }
        chrome.runtime.onMessage.removeListener(arguments.callee);
    });
});
