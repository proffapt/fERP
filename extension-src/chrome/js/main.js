// getting required elements from the extension
const positiveFeedbackButton = document.getElementById("positive_btn");
const neutralFeedbackButton = document.getElementById("neutral_btn");
const negativeFeedbackButton = document.getElementById("negative_btn");
const allCheckBox = document.getElementById("use_for_all");
const captchaCheckBox = document.getElementById("auto_fill_captcha");

// Sending status of checkboxes  to content scripts
var isAllChecked = true;
allCheckBox.addEventListener("click", () => {
    isAllChecked = allCheckBox.checked;
});
var isCaptchaChecked = true;
captchaCheckBox.addEventListener("click", () => {
    isCaptchaChecked = captchaCheckBox.checked;
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
            sendResponse({
                preference: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
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
            sendResponse({
                preference: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
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
            sendResponse({
                preference: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
        }
        chrome.runtime.onMessage.removeListener(arguments.callee);
    });
});
