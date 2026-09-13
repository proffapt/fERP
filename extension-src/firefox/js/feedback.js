var profCounter = 0,
    courseCounter = 0;

browser.runtime
    .sendMessage({
        request: "getStatusOfAll&FeedbackType",
    })
    .then((preference) => {
        function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }

        const getDoc = () => {
            const frame = document.getElementById("myframe");
            return frame
                ? frame.contentDocument || frame.contentWindow.document
                : document;
        };

        const isNewERPPortal = (doc) => {
            return !!(
                doc.getElementById("studentFeedbackResponseForm") ||
                doc.querySelector(".radio_row") ||
                doc.querySelector(".questionContainer_Class")
            );
        };

        const teacherStrengths = [
            "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
            "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
            "The teacher clears all doubts with patience and provides excellent real world practical examples.",
            "The teacher maintains an optimum pace of teaching and keeps the lectures interactive and engaging.",
            "The teacher releases lecture slides and course reference materials promptly for all students.",
            "The teacher provides very constructive feedback on assignments and assessments throughout the semester."
        ];

        const courseStrengths = [
            "This course is exceptionally well structured and gave me a great understanding of the subject.",
            "This course has well planned tutorials and assignments that significantly support real world learning.",
            "This course provides ample opportunities to understand and apply core concepts beyond simple memorization.",
            "This course conveys the essence of the subject with well balanced continuous assessment activities."
        ];

        const positiveSuggestions = [
            "Everything taught in the class has been explained nicely and there are no specific difficulties.",
            "No changes are required at this stage as the current teaching pace is completely satisfactory.",
            "The learning activities and continuous assessments are very helpful for understanding the topics properly.",
            "The course structure and content delivery are already well organized and completely meeting all learning objectives."
        ];

        const neutralComments = [
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

        const negativeTeacher = [
            "The lectures could be made significantly more engaging and approachable for all participating students.",
            "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
            "The teacher should consider pacing the lectures more evenly so that students can follow along better."
        ];

        const negativeCourse = [
            "The course content feels overwhelming and would benefit greatly from better organization and structured tutorials.",
            "The continuous assessment workload is quite heavy and requires better distribution across the academic semester.",
            "More practical problem solving sessions are needed to understand the difficult concepts in this course."
        ];

        const negativeSuggestions = [
            "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.",
            "The instructor could provide more reference materials and clear examples to facilitate better learning.",
            "The pace and difficulty of assignments should be adjusted to allow sufficient time for conceptual understanding."
        ];

        const fill_new_erp = async (preferenceType) => {
            const doc = getDoc();

            // Bypass confirm() dialog during automated submission
            try {
                if (doc.defaultView) {
                    doc.defaultView.confirm = () => true;
                }
            } catch (e) {}

            // 1. Radio buttons
            const radioRows = doc.querySelectorAll(".radio_row");
            radioRows.forEach((row) => {
                const radios = Array.from(
                    row.querySelectorAll(
                        "input.question_cls, input[type='radio']"
                    )
                );
                if (!radios.length) return;

                const rowText = (
                    row.closest("tr") ? row.closest("tr").textContent : ""
                ).toLowerCase();
                const isPace = rowText.includes("pace");
                let target = null;

                if (preferenceType === "positive") {
                    if (isPace) {
                        target = radios.find(
                            (r) =>
                                r.value === "3" ||
                                /optimum|just right/i.test(
                                    r.parentElement?.textContent || ""
                                )
                        );
                    }
                    if (!target) {
                        target =
                            radios.find((r) => r.value === "5") || radios[0];
                    }
                } else if (preferenceType === "neutral") {
                    if (isPace) {
                        target = radios.find((r) => r.value === "3");
                    }
                    if (!target) {
                        target =
                            radios.find((r) => r.value === "3") ||
                            radios.find((r) => r.value === "4") ||
                            radios[Math.min(2, radios.length - 1)];
                    }
                } else if (preferenceType === "negative") {
                    if (isPace) {
                        target =
                            radios.find((r) => r.value === "1") ||
                            radios.find((r) => r.value === "5");
                    }
                    if (!target) {
                        target =
                            radios.find((r) => r.value === "1") ||
                            radios.find((r) => r.value === "2") ||
                            radios[radios.length - 1];
                    }
                }

                if (target) {
                    target.checked = true;
                    target.dispatchEvent(new Event("change", { bubbles: true }));
                    target.dispatchEvent(new Event("input", { bubbles: true }));
                    target.dispatchEvent(new Event("click", { bubbles: true }));
                }

                const errEl = row.querySelector(".error");
                if (errEl) errEl.textContent = "";
            });

            // 2. Textareas
            const textareas = doc.querySelectorAll(
                "textarea.suggestion_text, textarea.sub-textarea, textarea"
            );
            textareas.forEach((ta, idx) => {
                const name = (ta.getAttribute("name") || "").toLowerCase();
                const placeholder = (
                    ta.getAttribute("placeholder") || ""
                ).toLowerCase();
                let text = "";

                if (preferenceType === "positive") {
                    if (
                        name.includes("6") ||
                        placeholder.includes("aspect") ||
                        placeholder.includes("helped")
                    ) {
                        text =
                            teacherStrengths[
                                Math.floor(
                                    Math.random() * teacherStrengths.length
                                )
                            ];
                    } else if (
                        name.includes("7") ||
                        placeholder.includes("difficult")
                    ) {
                        text = positiveSuggestions[0];
                    } else if (
                        name.includes("8") ||
                        placeholder.includes("change") ||
                        placeholder.includes("improve")
                    ) {
                        text = positiveSuggestions[1];
                    } else {
                        const pool = teacherStrengths.concat(
                            courseStrengths,
                            positiveSuggestions
                        );
                        text = pool[idx % pool.length];
                    }
                } else if (preferenceType === "neutral") {
                    text = neutralComments[idx % neutralComments.length];
                } else if (preferenceType === "negative") {
                    if (
                        name.includes("6") ||
                        placeholder.includes("aspect") ||
                        placeholder.includes("helped")
                    ) {
                        text =
                            negativeTeacher[
                                Math.floor(
                                    Math.random() * negativeTeacher.length
                                )
                            ];
                    } else if (
                        name.includes("7") ||
                        placeholder.includes("difficult")
                    ) {
                        text =
                            negativeCourse[
                                Math.floor(
                                    Math.random() * negativeCourse.length
                                )
                            ];
                    } else if (
                        name.includes("8") ||
                        placeholder.includes("change") ||
                        placeholder.includes("improve")
                    ) {
                        text =
                            negativeSuggestions[
                                Math.floor(
                                    Math.random() * negativeSuggestions.length
                                )
                            ];
                    } else {
                        const pool = negativeTeacher.concat(
                            negativeCourse,
                            negativeSuggestions
                        );
                        text = pool[idx % pool.length];
                    }
                }

                text = text.replace(/\s{2,}/g, " ").trim();
                ta.value = text;
                ta.dispatchEvent(new Event("input", { bubbles: true }));
                ta.dispatchEvent(new Event("change", { bubbles: true }));

                const errEl = ta.parentElement
                    ? ta.parentElement.querySelector(".errorTextarea")
                    : null;
                if (errEl) errEl.textContent = "";
            });

            // 3. Setup Submission & Captcha
            const captchaInput = doc.getElementById("captchaInput");
            const saveBtn = doc.getElementById("save_btn");

            if (captchaInput && saveBtn) {
                captchaInput.addEventListener("keydown", (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        saveBtn.click();
                    }
                });
            }

            if (preference.afc && captchaInput && saveBtn) {
                try {
                    const solved = await solveCaptcha(doc);
                    if (solved) {
                        captchaInput.value = solved;
                        captchaInput.dispatchEvent(
                            new Event("input", { bubbles: true })
                        );
                        captchaInput.dispatchEvent(
                            new Event("change", { bubbles: true })
                        );
                        saveBtn.click();
                    } else {
                        captchaInput.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                        });
                        captchaInput.focus();
                    }
                } catch (e) {
                    captchaInput.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                    captchaInput.focus();
                }
            } else if (captchaInput) {
                captchaInput.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
                captchaInput.focus();
            }
        };

        const fill_form = async () => {
            const doc = getDoc();

            if (isNewERPPortal(doc)) {
                await fill_new_erp(preference.feedback);
                return;
            }

            // Legacy portal fallback
            textBox = doc.querySelectorAll("textarea");
            radioButton = doc.querySelectorAll('input[type="radio"]');
            prof = doc.querySelectorAll('input[name="check"]');

            if (textBox.length == 5) {
                switch (preference.feedback) {
                    case "positive":
                        positive_theory_feedback();
                        break;
                    case "neutral":
                        neutral_theory_feedback();
                        break;
                    case "negative":
                        negative_theory_feedback();
                        break;
                }
            } else {
                switch (preference.feedback) {
                    case "positive":
                        positive_lab_feedback();
                        break;
                    case "neutral":
                        neutral_lab_feedback();
                        break;
                    case "negative":
                        negative_lab_feedback();
                        break;
                }
            }

            addSubmissionListeners();

            if (preference.afc) {
                captchaText = doc.getElementById("passline");
                if (captchaText) {
                    captchaText.value = await solveCaptcha(doc);
                    submitButton = doc.getElementById("mybutton");
                    if (submitButton) submitButton.click();
                }
            }
        };

        const downloadAdmitCard = () => {
            const newWindow = window.open(
                "https://erp.iitkgp.ac.in/Acad/studentExamTimeView.jsp"
            );

            if (newWindow) {
                newWindow.addEventListener("load", async () => {
                    try {
                        const response = await fetch(
                            "https://erp.iitkgp.ac.in/Acad/StudentAdmitCard.jsp"
                        );

                        if (response.ok) {
                            const pdfBlob = await response.blob();
                            const downloadLink = document.createElement("a");
                            downloadLink.href =
                                window.URL.createObjectURL(pdfBlob);
                            downloadLink.download = "endsem_admitcard.pdf";
                            document.body.appendChild(downloadLink);
                            downloadLink.click();
                            document.body.removeChild(downloadLink);
                            newWindow.close();
                        } else {
                            console.error(
                                "Failed to fetch the PDF:",
                                response.status
                            );
                        }
                    } catch (error) {
                        console.error("Error occurred:", error);
                    }
                });
            } else {
                console.error("Failed to open new window.");
            }
        };

        const solveCaptchaLocally = async (captchaImage) => {
            if (typeof Tesseract === "undefined") {
                return "";
            }
            try {
                if (!captchaImage.complete || captchaImage.naturalWidth === 0) {
                    await new Promise((resolve) => {
                        captchaImage.onload = resolve;
                        captchaImage.onerror = resolve;
                        setTimeout(resolve, 1500);
                    });
                }

                const rawW =
                    captchaImage.naturalWidth || captchaImage.width || 122;
                const rawH =
                    captchaImage.naturalHeight || captchaImage.height || 31;

                const tempCanvas = document.createElement("canvas");
                const tempCtx = tempCanvas.getContext("2d", {
                    willReadFrequently: true,
                });
                tempCanvas.width = rawW;
                tempCanvas.height = rawH;
                tempCtx.drawImage(captchaImage, 0, 0, rawW, rawH);

                const imgData = tempCtx.getImageData(0, 0, rawW, rawH);
                const data = imgData.data;

                // 1. Threshold: isolate dark character strokes from light pastel background
                const lumThresh = 135;
                const binary = new Uint8Array(rawW * rawH);
                for (let y = 0; y < rawH; y++) {
                    for (let x = 0; x < rawW; x++) {
                        const idx = (y * rawW + x) * 4;
                        const r = data[idx];
                        const g = data[idx + 1];
                        const b = data[idx + 2];
                        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                        binary[y * rawW + x] = lum < lumThresh ? 1 : 0;
                    }
                }

                // 2. Horizontal noise line removal (erases 1px & 2px thin horizontal strokes)
                const cleaned = new Uint8Array(binary);
                for (let y = 1; y < rawH - 1; y++) {
                    for (let x = 0; x < rawW; x++) {
                        const idx = y * rawW + x;
                        if (
                            binary[idx] === 1 &&
                            binary[(y - 1) * rawW + x] === 0 &&
                            binary[(y + 1) * rawW + x] === 0
                        ) {
                            cleaned[idx] = 0;
                        }
                        if (
                            y < rawH - 2 &&
                            binary[idx] === 1 &&
                            binary[(y + 1) * rawW + x] === 1 &&
                            binary[(y - 1) * rawW + x] === 0 &&
                            binary[(y + 2) * rawW + x] === 0
                        ) {
                            cleaned[idx] = 0;
                            cleaned[(y + 1) * rawW + x] = 0;
                        }
                    }
                }

                // 3. Vertical reconnection: restores any 1px vertical character cuts from line removal
                const reconnected = new Uint8Array(cleaned);
                for (let y = 1; y < rawH - 1; y++) {
                    for (let x = 0; x < rawW; x++) {
                        if (
                            cleaned[(y - 1) * rawW + x] === 1 &&
                            cleaned[(y + 1) * rawW + x] === 1
                        ) {
                            reconnected[y * rawW + x] = 1;
                        }
                    }
                }

                // 4. Connected-component analysis: extract characters, filter out noise specks (< 20px)
                const minCompSize = 20;
                const visited = new Uint8Array(rawW * rawH);
                const charComps = [];
                const queue = new Int32Array(rawW * rawH * 2);

                for (let y = 0; y < rawH; y++) {
                    for (let x = 0; x < rawW; x++) {
                        const startIdx = y * rawW + x;
                        if (
                            reconnected[startIdx] === 1 &&
                            visited[startIdx] === 0
                        ) {
                            let head = 0,
                                tail = 0;
                            queue[tail++] = x;
                            queue[tail++] = y;
                            visited[startIdx] = 1;

                            const comp = [[x, y]];

                            while (head < tail) {
                                const cx = queue[head++];
                                const cy = queue[head++];

                                for (let dy = -1; dy <= 1; dy++) {
                                    for (let dx = -1; dx <= 1; dx++) {
                                        if (dx === 0 && dy === 0) continue;
                                        const nx = cx + dx;
                                        const ny = cy + dy;
                                        if (
                                            nx >= 0 &&
                                            nx < rawW &&
                                            ny >= 0 &&
                                            ny < rawH
                                        ) {
                                            const nIdx = ny * rawW + nx;
                                            if (
                                                visited[nIdx] === 0 &&
                                                reconnected[nIdx] === 1
                                            ) {
                                                visited[nIdx] = 1;
                                                queue[tail++] = nx;
                                                queue[tail++] = ny;
                                                comp.push([nx, ny]);
                                            }
                                        }
                                    }
                                }
                            }

                            if (comp.length >= minCompSize) {
                                let minX = rawW;
                                for (let i = 0; i < comp.length; i++) {
                                    if (comp[i][0] < minX) minX = comp[i][0];
                                }
                                charComps.push({ minX, comp });
                            }
                        }
                    }
                }

                // Sort character components from left to right
                charComps.sort((a, b) => a.minX - b.minX);

                // 5. Render characters with 3x scale, clean spacing, and white padding for Tesseract
                const scale = 3;
                const charGap = 20;
                const pad = 20;

                let totalW = pad * 2;
                if (charComps.length > 0) {
                    for (const { comp } of charComps) {
                        let cMinX = rawW,
                            cMaxX = 0;
                        for (let i = 0; i < comp.length; i++) {
                            if (comp[i][0] < cMinX) cMinX = comp[i][0];
                            if (comp[i][0] > cMaxX) cMaxX = comp[i][0];
                        }
                        totalW += (cMaxX - cMinX + 1) * scale + charGap;
                    }
                } else {
                    totalW = rawW * scale + pad * 2;
                }

                const totalH = rawH * scale + pad * 2;
                const outCanvas = document.createElement("canvas");
                outCanvas.width = totalW;
                outCanvas.height = totalH;
                const outCtx = outCanvas.getContext("2d");
                outCtx.fillStyle = "#FFFFFF";
                outCtx.fillRect(0, 0, totalW, totalH);

                if (charComps.length > 0) {
                    let currX = pad;
                    for (const { comp } of charComps) {
                        let cMinX = rawW,
                            cMaxX = 0;
                        for (let i = 0; i < comp.length; i++) {
                            if (comp[i][0] < cMinX) cMinX = comp[i][0];
                            if (comp[i][0] > cMaxX) cMaxX = comp[i][0];
                        }
                        outCtx.fillStyle = "#000000";
                        for (let i = 0; i < comp.length; i++) {
                            const rx = comp[i][0];
                            const ry = comp[i][1];
                            outCtx.fillRect(
                                currX + (rx - cMinX) * scale,
                                pad + ry * scale,
                                scale,
                                scale
                            );
                        }
                        currX += (cMaxX - cMinX + 1) * scale + charGap;
                    }
                } else {
                    // Fallback render of cleaned pixels
                    outCtx.fillStyle = "#000000";
                    for (let y = 0; y < rawH; y++) {
                        for (let x = 0; x < rawW; x++) {
                            if (cleaned[y * rawW + x] === 1) {
                                outCtx.fillRect(
                                    pad + x * scale,
                                    pad + y * scale,
                                    scale,
                                    scale
                                );
                            }
                        }
                    }
                }

                // 6. Run local Tesseract WebAssembly OCR
                let worker;
                try {
                    worker = await Tesseract.createWorker("eng");
                    await worker.setParameters({
                        tessedit_char_whitelist:
                            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                        tessedit_pageseg_mode: "7",
                    });
                    const {
                        data: { text },
                    } = await worker.recognize(outCanvas);
                    let cleanedText = (text || "")
                        .trim()
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toUpperCase();
                    if (cleanedText.length > 6) {
                        cleanedText = cleanedText.substring(0, 6);
                    }
                    return cleanedText;
                } finally {
                    if (worker) {
                        await worker.terminate();
                    }
                }
            } catch (err) {
                console.warn("[fERP] Local OCR failed, trying fallback:", err);
                return "";
            }
        };

        const solveCaptcha = async (doc) => {
            try {
                const captchaImage = doc.querySelector(
                    "#captchaImg, img[src*='captcha']"
                );
                if (!captchaImage) return "";

                // 1. Primary: Fast, 100% free local in-browser OCR
                const localResult = await solveCaptchaLocally(captchaImage);
                if (localResult && localResult.length >= 4) {
                    return localResult;
                }

                // 2. Fallback: TSG Gymkhana ECS API (if online and applicable)
                const captchaImageSrc = captchaImage.src;
                const imageSrcArray = captchaImageSrc.split("/");
                const captchaMagic = imageSrcArray[imageSrcArray.length - 1];
                const cookieVal =
                    (document.cookie.split(";")[0] || "").split("=")[1] || "";
                const titlePart = document.title
                    .split(" ")
                    .slice(1, -4)
                    .join(" ");
                const erpMagic = `${cookieVal}.${titlePart}`;
                const url = `https://gymkhana.iitkgp.ac.in/api/ecs/${captchaMagic}/${erpMagic}`;

                const captchaResponse = await fetch(url);
                if (!captchaResponse.ok) return localResult || "";
                const captchaResult = await captchaResponse.json();
                return captchaResult.captcha || localResult || "";
            } catch (e) {
                console.warn("[fERP] Captcha API error:", e);
                return "";
            }
        };

        const removeSubmissionListeners = () => {
            const doc = getDoc();
            prof = doc.querySelectorAll('input[name="check"]');
            const profList = Array.from(prof);
            currProfIndex = profList.findIndex((p) => p.checked);
            if (currProfIndex !== -1 && prof[currProfIndex]) {
                prof[currProfIndex].click();
            }
        };

        const addSubmissionListeners = () => {
            const doc = getDoc();
            captchaText = doc.getElementById("passline");
            submitButton = doc.getElementById("sub");
            if (!submitButton) return;

            parentElement = submitButton.parentNode;
            submitButton.remove();
            newSubmitButton = document.createElement("input");
            newSubmitButton.id = "mybutton";
            newSubmitButton.className = "button";
            newSubmitButton.type = "button";
            newSubmitButton.value = "Submit Feedback";
            parentElement.appendChild(newSubmitButton);

            const submitForm = async () => {
                var form = doc.getElementsByName("form1");
                if (form && form[0]) {
                    form[0].method = "POST";
                    form[0].action = "rev_feed_submit.jsp";
                    form[0].submit();
                }
                await processSubmission();
            };

            newSubmitButton.addEventListener("click", async (event) => {
                event.preventDefault();
                await submitForm();
            });
            if (captchaText) {
                captchaText.addEventListener("keydown", async (event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        await submitForm();
                    }
                });
            }
        };

        const processSubmission = async () => {
            await sleep(3000);
            const doc = getDoc();

            submitButton = doc.getElementById("sub");
            if (submitButton != null) {
                if (!preference.all) {
                    fill_form();
                } else {
                    profCounter--;
                    handleProf();
                }
            } else {
                if (preference.all) {
                    prof = doc.querySelectorAll('input[name="check"]');
                    if (profCounter < prof.length) handleProf();
                    else handleCourse();
                }
            }
        };

        const handleProf = () => {
            const doc = getDoc();
            prof = doc.querySelectorAll('input[name="check"]');
            if (profCounter < prof.length && prof[profCounter]) {
                prof[profCounter].click();
                profCounter++;
            }

            submitButton = doc.getElementById("sub");
            if (submitButton != null) {
                fill_form();
            } else {
                if (profCounter < prof.length) handleProf();
                else handleCourse();
            }
        };

        const handleCourse = () => {
            const doc = getDoc();
            course = doc.querySelectorAll('a[href="javascript:void(0)"]');
            if (courseCounter == course.length) {
                downloadAdmitCard();
                return;
            }
            if (course[courseCounter]) {
                course[courseCounter].click();
                courseCounter++;
            }

            profCounter = 0;
            handleProf();
        };

        try {
            const doc = getDoc();
            if (isNewERPPortal(doc)) {
                fill_form();
            } else if (preference.all && courseCounter == 0) {
                handleCourse();
            } else if (!preference.all) {
                removeSubmissionListeners();
                fill_form();
            }
        } catch (err) {
            console.error("[fERP] Execution error:", err);
        }
    });

function positive_theory_feedback() {
    var teacherStrengths = [
        "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
        "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
        "The teacher clears all doubts with patience and provides excellent real world practical examples.",
        "The teacher maintains an optimum pace of teaching and keeps the lectures interactive and engaging.",
        "The teacher releases lecture slides and course reference materials promptly for all students.",
        "The teacher provides very constructive feedback on assignments and assessments throughout the semester."
    ];

    textBox[0].value =
        teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];
    textBox[1].value =
        "Everything taught in the class has been explained nicely and there are no specific difficulties.";

    var courseStrengths = [
        "This course is exceptionally well structured and gave me a great understanding of the subject.",
        "This course has well planned tutorials and assignments that significantly support real world learning.",
        "This course provides ample opportunities to understand and apply core concepts beyond simple memorization.",
        "This course conveys the essence of the subject with well balanced continuous assessment activities."
    ];

    textBox[2].value =
        courseStrengths[Math.floor(Math.random() * courseStrengths.length)];
    textBox[3].value =
        "Everything taught in the class has been explained nicely and there are no specific difficulties.";
    textBox[4].value =
        "No changes are required at this stage as the current teaching pace is completely satisfactory.";

    for (var i = 5; i < textBox.length; i++)
        textBox[i].value =
            "No specific comments or difficulties were faced during this entire course overall.";

    for (var r = prof.length; r < radioButton.length - 10; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r + 3].click();
        else radioButton[r + 4].click();
    if (radioButton[prof.length + 17]) radioButton[prof.length + 17].click();
    if (radioButton[prof.length + 52]) radioButton[prof.length + 52].click();
    if (radioButton[prof.length + 57]) radioButton[prof.length + 57].click();
}

function positive_lab_feedback() {
    var teacherStrengths = [
        "The teacher is understanding approachable and ensures all students understand the fundamental concepts thoroughly.",
        "The teacher has deep clarity of the subject and explains complex topics very intuitively.",
        "The teacher clears all doubts with patience and provides excellent real world practical examples.",
        "The teacher ensures that the students get ample amount of time for the experiment."
    ];

    textBox[0].value =
        teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];
    textBox[1].value =
        "Everything taught in the class has been explained nicely and there are no specific difficulties.";
    textBox[2].value =
        "No changes are required at this stage as the current teaching pace is completely satisfactory.";

    for (var i = 3; i < textBox.length; i++)
        textBox[i].value =
            "No specific comments or difficulties were faced during this entire course overall.";

    for (var r = prof.length; r < radioButton.length; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r + 3].click();
        else radioButton[r + 4].click();
    if (radioButton[prof.length + 47]) radioButton[prof.length + 47].click();
    if (radioButton[prof.length + 52]) radioButton[prof.length + 52].click();
}

function neutral_theory_feedback() {
    var neutralComment =
        "The course content and teaching methodology are moderate and standard throughout the semester.";
    for (var i = 0; i < textBox.length; i++) textBox[i].value = neutralComment;

    for (var r = prof.length; r < radioButton.length - 10; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r + 2].click();
        else radioButton[r + 3].click();
    for (var k = prof.length + 52; k < radioButton.length; k += 5)
        if (radioButton[k]) {
            if (Math.floor(Math.random() * 2)) radioButton[k].click();
            else if (radioButton[k + 1]) radioButton[k + 1].click();
        }
}

function neutral_lab_feedback() {
    var neutralComment =
        "The course content and teaching methodology are moderate and standard throughout the semester.";
    for (var i = 0; i < textBox.length; i++) textBox[i].value = neutralComment;

    for (var r = prof.length; r < radioButton.length; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r + 2].click();
        else radioButton[r + 3].click();
    for (var k = prof.length + 47; k < prof.length + 53; k += 5)
        if (radioButton[k]) {
            if (Math.floor(Math.random() * 2)) radioButton[k].click();
            else if (radioButton[k + 1]) radioButton[k + 1].click();
        }
}

function negative_theory_feedback() {
    var teacherWeaknesses = [
        "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
        "The teacher should consider pacing the lectures more evenly so that students can follow along better."
    ];

    textBox[0].value =
        "The course coverage was challenging and could be improved with more detailed explanations.";
    textBox[1].value =
        teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];
    textBox[2].value =
        "The continuous assessment workload was heavy and required significant additional effort.";

    var courseWeaknesses = [
        "The course content feels overwhelming and would benefit greatly from better organization and structured tutorials.",
        "The continuous assessment workload is quite heavy and requires better distribution across the academic semester."
    ];

    textBox[3].value =
        courseWeaknesses[Math.floor(Math.random() * courseWeaknesses.length)];
    textBox[4].value =
        "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.";

    for (var i = 5; i < textBox.length; i++)
        textBox[i].value =
            "Additional illustrative and practical examples would greatly improve the overall understanding.";

    for (var r = prof.length; r < radioButton.length - 10; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r].click();
        else radioButton[r + 1].click();
    if (radioButton[prof.length + 15]) {
        if (Math.floor(Math.random() * 2)) radioButton[prof.length + 15].click();
        else if (radioButton[prof.length + 19])
            radioButton[prof.length + 19].click();
    }
    for (var m = prof.length + 53; m < radioButton.length; m += 5)
        if (radioButton[m]) {
            if (Math.floor(Math.random() * 2)) radioButton[m].click();
            else if (radioButton[m + 1]) radioButton[m + 1].click();
        }
}

function negative_lab_feedback() {
    var teacherWeaknesses = [
        "The teacher could explain core theoretical concepts more clearly with additional illustrative practical examples.",
        "The teacher should consider pacing the lectures more evenly so that students can follow along better."
    ];

    textBox[0].value =
        "The course coverage was challenging and could be improved with more detailed explanations.";
    textBox[1].value =
        teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];
    textBox[2].value =
        "Several topics in this course were challenging to follow without sufficient prerequisite background explanations.";

    for (var i = 3; i < textBox.length; i++)
        textBox[i].value =
            "Additional illustrative and practical examples would greatly improve the overall understanding.";

    for (var r = prof.length; r < radioButton.length; r += 5)
        if (Math.floor(Math.random() * 2)) radioButton[r].click();
        else radioButton[r + 1].click();
    for (var m = prof.length + 48; m < prof.length + 54; m += 5)
        if (radioButton[m]) {
            if (Math.floor(Math.random() * 2)) radioButton[m].click();
            else if (radioButton[m + 1]) radioButton[m + 1].click();
        }
}

