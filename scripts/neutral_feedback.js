/**
 * fERP v2.0 - Neutral Feedback Script for IIT Kharagpur ERP
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
        var neutralComments = [
            "The teacher covers the syllabus adequately and answers student questions when approached in class.",
            "The teacher follows standard curriculum slides and conducts lectures at a reasonable normal speed.",
            "The teacher provides standard coursework material and conducts assessments as scheduled in the academic calendar.",
            "The course content is standard and covers the foundational syllabus topics with moderate workload.",
            "The assignments and tutorials are of regular difficulty and adequate for examination preparation purposes.",
            "The assessment practices and continuous evaluation load are moderate throughout this academic semester.",
            "The subject topics are covered normally and the overall learning experience is completely standard.",
            "No major difficulties were faced and the course requirements were moderately manageable for students.",
            "No specific changes are necessary as the overall course structure remains standard and satisfactory."
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

            // Neutral: value "3" (Neutral) or "4" (Agree)
            if (!target) {
                target =
                    radios.find(function (r) {
                        return r.value === "3";
                    }) ||
                    radios.find(function (r) {
                        return r.value === "4";
                    }) ||
                    radios[Math.min(2, radios.length - 1)];
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
            var text = neutralComments[idx % neutralComments.length];
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
            "[fERP] Neutral feedback filled successfully on updated ERP portal."
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

        var neutralDefault =
            "The course content and teaching methodology are moderate and standard throughout the semester.";
        for (var j = 0; j < textBox.length; j++) {
            textBox[j].value = neutralDefault;
        }

        // Clicks `Good` OR `Very Good` everywhere
        for (var r = start; r < radioButton.length - 10; r += 5) {
            if (Math.floor(Math.random() * 2)) radioButton[r + 2].click();
            else radioButton[r + 3].click();
        }
        // Randomising selection between `Heavy` & `Average` for Efforts and Workload
        for (var k = start + 52; k < radioButton.length; k += 5) {
            if (radioButton[k]) {
                if (Math.floor(Math.random() * 2)) radioButton[k].click();
                else if (radioButton[k + 1]) radioButton[k + 1].click();
            }
        }

        console.log(
            "[fERP] Neutral feedback filled successfully on legacy ERP portal."
        );
    }
})();