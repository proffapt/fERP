/**
 * fERP v2.0 - Negative/Constructive Feedback Script for IIT Kharagpur ERP
 * Compatible with both the updated ERP feedback portal and the legacy portal.
 */
(function () {
    var doc =
        (typeof myframe !== "undefined" && myframe.document) ||
        (document.getElementById("myframe") &&
            document.getElementById("myframe").contentDocument) ||
        document;

    var isNewERP = !!(
        doc.getElementById("studentFeedbackResponseForm") ||
        doc.querySelector(".radio_row") ||
        doc.querySelector(".questionContainer_Class")
    );

    if (isNewERP) {
        fillNewERPFeedback();
    } else {
        fillLegacyERPFeedback();
    }

    function fillNewERPFeedback() {
        var negativeTeacher = [
            "The lectures could be made significantly more engaging and approachable for all participating students.",
            "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
            "The teacher should consider pacing the lectures more evenly so that students can follow along better."
        ];

        var negativeCourse = [
            "The course content feels overwhelming and would benefit greatly from better organization and structured tutorials.",
            "The continuous assessment workload is quite heavy and requires better distribution across the academic semester.",
            "More practical problem solving sessions are needed to understand the difficult concepts in this course."
        ];

        var negativeSuggestions = [
            "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.",
            "The instructor could provide more reference materials and clear examples to facilitate better learning.",
            "The pace and difficulty of assignments should be adjusted to allow sufficient time for conceptual understanding."
        ];

        // 1. Fill Radio Buttons (.radio_row)
        var radioRows = doc.querySelectorAll(".radio_row");
        radioRows.forEach(function (row) {
            var radios = Array.from(
                row.querySelectorAll("input.question_cls, input[type='radio']")
            );
            if (!radios.length) return;

            var rowText = (
                row.closest("tr") ? row.closest("tr").textContent : ""
            ).toLowerCase();
            var isPace = rowText.indexOf("pace") !== -1;
            var target = null;

            if (isPace) {
                // Too Slow (1) or Too Fast (5)
                target =
                    radios.find(function (r) {
                        return r.value === "1";
                    }) ||
                    radios.find(function (r) {
                        return r.value === "5";
                    });
            }

            // Negative: value "1" (Strongly Disagree) or "2" (Disagree)
            if (!target) {
                target =
                    radios.find(function (r) {
                        return r.value === "1";
                    }) ||
                    radios.find(function (r) {
                        return r.value === "2";
                    }) ||
                    radios[radios.length - 1];
            }

            if (target) {
                target.checked = true;
                target.dispatchEvent(new Event("change", { bubbles: true }));
                target.dispatchEvent(new Event("input", { bubbles: true }));
                target.dispatchEvent(new Event("click", { bubbles: true }));
            }

            var errEl = row.querySelector(".error");
            if (errEl) errEl.textContent = "";
        });

        // 2. Fill Textareas
        var textareas = doc.querySelectorAll(
            "textarea.suggestion_text, textarea.sub-textarea, textarea"
        );
        textareas.forEach(function (ta, idx) {
            var name = (ta.getAttribute("name") || "").toLowerCase();
            var placeholder = (
                ta.getAttribute("placeholder") || ""
            ).toLowerCase();

            var text = "";
            if (
                name.indexOf("6") !== -1 ||
                placeholder.indexOf("aspect") !== -1 ||
                placeholder.indexOf("helped") !== -1
            ) {
                text =
                    negativeTeacher[
                        Math.floor(Math.random() * negativeTeacher.length)
                    ];
            } else if (
                name.indexOf("7") !== -1 ||
                placeholder.indexOf("difficult") !== -1
            ) {
                text =
                    negativeCourse[
                        Math.floor(Math.random() * negativeCourse.length)
                    ];
            } else if (
                name.indexOf("8") !== -1 ||
                placeholder.indexOf("change") !== -1 ||
                placeholder.indexOf("improve") !== -1
            ) {
                text =
                    negativeSuggestions[
                        Math.floor(Math.random() * negativeSuggestions.length)
                    ];
            } else {
                var pool = negativeTeacher.concat(
                    negativeCourse,
                    negativeSuggestions
                );
                text = pool[idx % pool.length];
            }

            text = text.replace(/\s{2,}/g, " ").trim();

            ta.value = text;
            ta.dispatchEvent(new Event("input", { bubbles: true }));
            ta.dispatchEvent(new Event("change", { bubbles: true }));

            var errTextarea = ta.parentElement
                ? ta.parentElement.querySelector(".errorTextarea")
                : null;
            if (errTextarea) errTextarea.textContent = "";
        });

        // 3. Focus on Captcha
        var captchaInput = doc.getElementById("captchaInput");
        if (captchaInput) {
            captchaInput.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            captchaInput.focus();
        }

        console.log(
            "[fERP] Negative feedback filled successfully on updated ERP portal."
        );
    }

    function fillLegacyERPFeedback() {
        var textBox = doc.querySelectorAll("textarea");
        var radioButton = doc.querySelectorAll('input[type="radio"]');

        var start = 0;
        for (
            var i = 0;
            i < radioButton.length &&
            radioButton[i].getAttribute("name") == "check";
            i++, start++
        ) {}

        var teacherWeaknesses = [
            "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
            "The teacher should consider pacing the lectures more evenly so that students can follow along better."
        ];
        var courseWeaknesses = [
            "The course content feels overwhelming and would benefit greatly from better organization and structured tutorials.",
            "The continuous assessment workload is quite heavy and requires better distribution across the academic semester."
        ];
        var suggestions = [
            "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.",
            "The instructor could provide more reference materials and clear examples to facilitate better learning."
        ];

        if (textBox.length >= 5) {
            textBox[0].value =
                "The course coverage was challenging and could be improved with more detailed explanations.";
            textBox[1].value =
                teacherWeaknesses[
                    Math.floor(Math.random() * teacherWeaknesses.length)
                ];
            textBox[2].value =
                "The continuous assessment workload was heavy and required significant additional effort.";
            textBox[3].value =
                courseWeaknesses[
                    Math.floor(Math.random() * courseWeaknesses.length)
                ];
            textBox[4].value =
                suggestions[Math.floor(Math.random() * suggestions.length)];
            for (var j = 5; j < textBox.length; j++)
                textBox[j].value =
                    "Additional illustrative and practical examples would greatly improve the overall understanding.";
        } else if (textBox.length > 0) {
            for (var k = 0; k < textBox.length; k++) {
                textBox[k].value =
                    "The course coverage was challenging and could be improved with more detailed explanations.";
            }
        }

        // Clicks `Poor` OR `Fair` everywhere
        for (var r = start; r < radioButton.length - 10; r += 5) {
            if (Math.floor(Math.random() * 2)) radioButton[r].click();
            else radioButton[r + 1].click();
        }
        // Randomising selection between `Too Slow` & `Too Fast`
        if (radioButton[start + 15]) {
            if (Math.floor(Math.random() * 2)) radioButton[start + 15].click();
            else if (radioButton[start + 19]) radioButton[start + 19].click();
        }
        // Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
        for (var m = start + 53; m < radioButton.length; m += 5) {
            if (radioButton[m]) {
                if (Math.floor(Math.random() * 2)) radioButton[m].click();
                else if (radioButton[m + 1]) radioButton[m + 1].click();
            }
        }

        console.log(
            "[fERP] Negative feedback filled successfully on legacy ERP portal."
        );
    }
})();