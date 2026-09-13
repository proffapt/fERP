/**
 * fERP v2.0 - Positive Feedback Script for IIT Kharagpur ERP
 * Compatible with both the updated ERP feedback portal and the legacy portal.
 */
(function () {
    var doc =
        (typeof myframe !== "undefined" && myframe.document) ||
        (document.getElementById("myframe") &&
            document.getElementById("myframe").contentDocument) ||
        document;

    // Detect if this is the updated ERP feedback portal
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
        var teacherStrengths = [
            "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
            "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
            "The teacher clears all doubts with patience and provides excellent real world practical examples.",
            "The teacher maintains an optimum pace of teaching and keeps the lectures interactive and engaging.",
            "The teacher releases lecture slides and course reference materials promptly for all students.",
            "The teacher provides very constructive feedback on assignments and assessments throughout the semester."
        ];

        var courseStrengths = [
            "This course is exceptionally well structured and gave me a great understanding of the subject.",
            "This course has well planned tutorials and assignments that significantly support real world learning.",
            "This course provides ample opportunities to understand and apply core concepts beyond simple memorization.",
            "This course conveys the essence of the subject with well balanced continuous assessment activities."
        ];

        var suggestionsAndWeaknesses = [
            "Everything taught in the class has been explained nicely and there are no specific difficulties.",
            "No changes are required at this stage as the current teaching pace is completely satisfactory.",
            "The learning activities and continuous assessments are very helpful for understanding the topics properly.",
            "The course structure and content delivery are already well organized and completely meeting all learning objectives."
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
                // Optimum pace is value "3"
                target = radios.find(function (r) {
                    return (
                        r.value === "3" ||
                        /optimum|just right/i.test(
                            r.parentElement ? r.parentElement.textContent : ""
                        )
                    );
                });
            }

            // Default: Most positive rating (value "5") or first option
            if (!target) {
                target =
                    radios.find(function (r) {
                        return r.value === "5";
                    }) || radios[0];
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

        // 2. Fill Textareas (.suggestion_text, .sub-textarea)
        // Enforcing: >= 10 words, 0 consecutive spaces (/\s{2,}/)
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
                    teacherStrengths[
                        Math.floor(Math.random() * teacherStrengths.length)
                    ];
            } else if (
                name.indexOf("7") !== -1 ||
                placeholder.indexOf("difficult") !== -1
            ) {
                text = suggestionsAndWeaknesses[0];
            } else if (
                name.indexOf("8") !== -1 ||
                placeholder.indexOf("change") !== -1 ||
                placeholder.indexOf("improve") !== -1
            ) {
                text = suggestionsAndWeaknesses[1];
            } else {
                var pool = teacherStrengths.concat(
                    courseStrengths,
                    suggestionsAndWeaknesses
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
            "[fERP] Positive feedback filled successfully on updated ERP portal."
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

        var teacherStrengths = [
            "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
            "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
            "The teacher clears all doubts with patience and provides excellent real world practical examples.",
            "The teacher maintains an optimum pace of teaching and keeps the lectures interactive and engaging.",
            "The teacher releases lecture slides and course reference materials promptly for all students.",
            "The teacher provides very constructive feedback on assignments and assessments throughout the semester."
        ];

        var courseStrengths = [
            "This course is exceptionally well structured and gave me a great understanding of the subject.",
            "This course has well planned tutorials and assignments that significantly support real world learning.",
            "This course provides ample opportunities to understand and apply core concepts beyond simple memorization.",
            "This course conveys the essence of the subject with well balanced continuous assessment activities."
        ];

        var defaultWeakness =
            "Everything taught in the class has been explained nicely and there are no specific difficulties.";
        var defaultSuggestion =
            "No changes are required at this stage as the current teaching pace is completely satisfactory.";

        if (textBox.length >= 5) {
            textBox[0].value =
                teacherStrengths[
                    Math.floor(Math.random() * teacherStrengths.length)
                ];
            textBox[1].value = defaultWeakness;
            textBox[2].value =
                courseStrengths[
                    Math.floor(Math.random() * courseStrengths.length)
                ];
            textBox[3].value = defaultWeakness;
            textBox[4].value = defaultSuggestion;
            for (var j = 5; j < textBox.length; j++)
                textBox[j].value =
                    "No specific comments or difficulties were faced during this entire course overall.";
        } else if (textBox.length > 0) {
            textBox[0].value =
                teacherStrengths[
                    Math.floor(Math.random() * teacherStrengths.length)
                ];
            if (textBox.length > 1) textBox[1].value = defaultWeakness;
            if (textBox.length > 2) textBox[2].value = defaultSuggestion;
            for (var k = 3; k < textBox.length; k++)
                textBox[k].value =
                    "No specific comments or difficulties were faced during this entire course overall.";
        }

        // Clicks `Excellent` OR `Very Good` everywhere
        for (var r = start; r < radioButton.length - 10; r += 5) {
            if (Math.floor(Math.random() * 2)) radioButton[r + 3].click();
            else radioButton[r + 4].click();
        }
        if (radioButton[start + 17]) radioButton[start + 17].click(); // `Just Right` for pace
        if (radioButton[start + 52]) radioButton[start + 52].click(); // `Average` for efforts
        if (radioButton[start + 57]) radioButton[start + 57].click(); // `Average` for Workload

        console.log(
            "[fERP] Positive feedback filled successfully on legacy ERP portal."
        );
    }
})();