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
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.request == "getStatusOfAll&FeedbackType")
            sendResponse({
                feedback: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
    });
    browser.tabs.executeScript({ file: "/js/feedback.js" });
    browser.runtime.onMessage.removeListener(
        (request, sender, sendResponse) => {}
    );
});

neutralFeedbackButton.addEventListener("click", () => {
    feedback = "neutral";
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.request == "getStatusOfAll&FeedbackType")
            sendResponse({
                feedback: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
    });
    browser.tabs.executeScript({ file: "/js/feedback.js" });
    browser.runtime.onMessage.removeListener(
        (request, sender, sendResponse) => {}
    );
});

negativeFeedbackButton.addEventListener("click", () => {
    feedback = "negative";
    browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.request == "getStatusOfAll&FeedbackType")
            sendResponse({
                feedback: feedback,
                all: isAllChecked,
                afc: isCaptchaChecked,
            });
    });
    browser.tabs.executeScript({ file: "/js/feedback.js" });
    browser.runtime.onMessage.removeListener(
        (request, sender, sendResponse) => {}
    );
});
