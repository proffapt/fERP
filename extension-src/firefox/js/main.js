const api = typeof browser !== "undefined" ? browser : chrome;

const statusEl = document.getElementById("status");
const buttons = document.querySelectorAll(".btn");
let feedback = null;

const setStatus = (text, warn = false) => {
    statusEl.textContent = text;
    statusEl.classList.toggle("warn", warn);
    statusEl.hidden = false;
};

const setBusy = (busy) => buttons.forEach((b) => (b.disabled = busy));

api.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "ferp:getPreference") {
        sendResponse({ feedback });
        return;
    }
    if (msg.type === "ferp:result") {
        setBusy(false);
        if (msg.ok) {
            setStatus(`✓ Filled ${msg.ratings} ratings and ${msg.comments} comments. Review, type the captcha, press Enter.`);
        } else if (msg.reason === "no-form") {
            setStatus("No feedback form found on this page. Open a course's feedback form first.", true);
        } else {
            setStatus("Something went wrong while filling. Please report an issue.", true);
        }
    }
});

const run = async (type) => {
    feedback = type;
    const [tab] = await api.tabs.query({ active: true, currentWindow: true });
    if (!tab || !/^https?:\/\/erp\.iitkgp\.ac\.in\//.test(tab.url || "")) {
        setStatus("Open your ERP feedback form (erp.iitkgp.ac.in) first.", true);
        return;
    }
    setBusy(true);
    try {
        if (api.scripting) {
            await api.scripting.executeScript({ target: { tabId: tab.id }, files: ["js/feedback.js"] });
        } else {
            await api.tabs.executeScript(tab.id, { file: "/js/feedback.js" });
        }
    } catch (err) {
        setBusy(false);
        setStatus("Couldn't access this page. Reload the ERP tab and try again.", true);
    }
};

buttons.forEach((b) => b.addEventListener("click", () => run(b.dataset.type)));
