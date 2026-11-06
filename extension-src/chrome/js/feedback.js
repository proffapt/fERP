// Injected into the ERP tab when a feedback type is picked in the popup.
// Wrapped in an IIFE so it can be injected more than once per page.
(() => {
    const api = typeof browser !== "undefined" ? browser : chrome;

    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // The form may sit inside the "myframe" iframe or in the page itself.
    const getDoc = () => {
        const frame = document.getElementById("myframe");
        return frame ? frame.contentDocument || frame.contentWindow.document : document;
    };

    const report = (result) => api.runtime.sendMessage({ type: "ferp:result", ...result });

    // ---------------------------------------------------------------- text
    // The new portal rejects comments under 10 words or with double spaces.
    const TEXT = {
        positive: {
            teacher: [
                "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
                "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
                "The teacher clears all doubts with patience and provides excellent real world practical examples.",
                "The teacher maintains an optimum pace of teaching and keeps the lectures interactive and engaging.",
                "The teacher releases lecture slides and course reference materials promptly for all students.",
                "The teacher provides very constructive feedback on assignments and assessments throughout the semester.",
            ],
            course: [
                "This course is exceptionally well structured and gave me a great understanding of the subject.",
                "This course has well planned tutorials and assignments that significantly support real world learning.",
                "This course provides ample opportunities to understand and apply core concepts beyond simple memorization.",
                "This course conveys the essence of the subject with well balanced continuous assessment activities.",
            ],
            difficulty: [
                "Everything taught in the class has been explained nicely and there are no specific difficulties.",
                "The learning activities and continuous assessments are very helpful for understanding the topics properly.",
            ],
            suggestion: [
                "No changes are required at this stage as the current teaching pace is completely satisfactory.",
                "The course structure and content delivery are already well organized and completely meeting all learning objectives.",
            ],
        },
        neutral: {
            teacher: [
                "The teacher covers the syllabus adequately and answers student questions when approached in class.",
                "The teacher follows standard curriculum slides and conducts lectures at a reasonable normal speed.",
                "The teacher provides standard coursework material and conducts assessments as scheduled in the academic calendar.",
            ],
            course: [
                "The course content is standard and covers the foundational syllabus topics with moderate workload.",
                "The assignments and tutorials are of regular difficulty and adequate for examination preparation purposes.",
                "The subject topics are covered normally and the overall learning experience is completely standard.",
            ],
            difficulty: [
                "No major difficulties were faced and the course requirements were moderately manageable for students.",
                "The assessment practices and continuous evaluation load are moderate throughout this academic semester.",
            ],
            suggestion: [
                "No specific changes are necessary as the overall course structure remains standard and satisfactory.",
            ],
        },
        negative: {
            teacher: [
                "The lectures could be made significantly more engaging and approachable for all participating students.",
                "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
                "The teacher should consider pacing the lectures more evenly so that students can follow along better.",
            ],
            course: [
                "The course content feels overwhelming and would benefit greatly from better organization and structured tutorials.",
                "The continuous assessment workload is quite heavy and requires better distribution across the academic semester.",
                "More practical problem solving sessions are needed to understand the difficult concepts in this course.",
            ],
            difficulty: [
                "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.",
                "The pace and difficulty of assignments should be adjusted to allow sufficient time for conceptual understanding.",
            ],
            suggestion: [
                "The instructor could provide more reference materials and clear examples to facilitate better learning.",
            ],
        },
    };

    // Picks a comment for a textarea from its name/placeholder.
    const commentFor = (type, ta, idx) => {
        const t = TEXT[type];
        const hint = `${ta.getAttribute("name") || ""} ${ta.getAttribute("placeholder") || ""}`.toLowerCase();
        let pool;
        if (/6|aspect|helped/.test(hint)) pool = type === "negative" ? t.teacher : t.teacher.concat(t.course);
        else if (/7|difficult/.test(hint)) pool = type === "negative" ? t.course : t.difficulty;
        else if (/8|change|improve|suggest/.test(hint)) pool = t.suggestion;
        else {
            const all = t.teacher.concat(t.course, t.difficulty, t.suggestion);
            return all[idx % all.length];
        }
        return pick(pool).replace(/\s{2,}/g, " ").trim();
    };

    // ------------------------------------------------------------ new portal
    const isNewPortal = (doc) =>
        !!(
            doc.getElementById("studentFeedbackResponseForm") ||
            doc.querySelector(".radio_row") ||
            doc.querySelector(".questionContainer_Class")
        );

    const choose = (type, radios, isPace) => {
        const byValue = (...vals) => vals.map((v) => radios.find((r) => r.value === v)).find(Boolean);
        if (isPace) {
            // Pace is "too slow ... too fast": the middle option is the good one.
            const label = (r) =>
                `${r.value} ${
                    (r.id && r.ownerDocument.querySelector(`label[for="${r.id}"]`)?.textContent) ||
                    r.closest("label")?.textContent ||
                    r.nextSibling?.textContent ||
                    ""
                }`;
            const middle = radios[Math.floor(radios.length / 2)];
            if (type === "negative") return pick([radios[0], radios[radios.length - 1]]);
            return radios.find((r) => /optimum|just right|appropriate|moderate/i.test(label(r))) || middle;
        }
        if (type === "positive") return byValue(Math.random() < 0.5 ? "5" : "4", "5") || radios[0];
        if (type === "neutral") return byValue(Math.random() < 0.5 ? "3" : "4", "3") || radios[Math.min(2, radios.length - 1)];
        return byValue(Math.random() < 0.5 ? "1" : "2", "1") || radios[radios.length - 1];
    };

    const fillNewPortal = (doc, type) => {
        let ratings = 0;
        let comments = 0;

        doc.querySelectorAll(".radio_row").forEach((row) => {
            const radios = Array.from(row.querySelectorAll("input.question_cls, input[type='radio']"));
            if (!radios.length) return;
            const rowText = (row.closest("tr")?.textContent || row.textContent || "").toLowerCase();
            const target = choose(type, radios, rowText.includes("pace"));
            if (!target) return;
            target.checked = true;
            ["input", "change", "click"].forEach((e) => target.dispatchEvent(new Event(e, { bubbles: true })));
            const err = row.querySelector(".error");
            if (err) err.textContent = "";
            ratings++;
        });

        doc.querySelectorAll("textarea").forEach((ta, idx) => {
            ta.value = commentFor(type, ta, idx);
            ["input", "change"].forEach((e) => ta.dispatchEvent(new Event(e, { bubbles: true })));
            const err = ta.parentElement?.querySelector(".errorTextarea");
            if (err) err.textContent = "";
            comments++;
        });

        // Leave the captcha to the user; Enter in the captcha box submits.
        const captcha = doc.getElementById("captchaInput");
        const save = doc.getElementById("save_btn");
        if (captcha) {
            if (save && !captcha.dataset.ferp) {
                captcha.dataset.ferp = "1";
                captcha.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        save.click();
                    }
                });
            }
            captcha.scrollIntoView({ behavior: "smooth", block: "center" });
            captcha.focus();
        }

        report({ ok: ratings + comments > 0, ratings, comments });
    };

    // ------------------------------------------------------------------ run
    api.runtime.sendMessage({ type: "ferp:getPreference" }).then(({ feedback }) => {
        try {
            const doc = getDoc();
            if (isNewPortal(doc)) fillNewPortal(doc, feedback);
            else report({ ok: false, reason: "no-form" });
        } catch (err) {
            console.error("[fERP]", err);
            report({ ok: false, reason: "error" });
        }
    });
})();
