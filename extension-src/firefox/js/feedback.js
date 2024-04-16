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

        const fill_form = async () => {
            textBox = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll("textarea");
            radioButton = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll('input[type="radio"]');
            prof = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll('input[name="check"]');

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
                captchaText = document
                    .getElementById("myframe")
                    .contentDocument.getElementById("passline");
                captchaText.value = await solveCaptcha();

                submitButton = document
                    .getElementById("myframe")
                    .contentDocument.getElementById("mybutton");
                submitButton.click();
            }
        };

        const solveCaptcha = async () => {
            captchaImage = document
                .getElementById("myframe")
                .contentDocument.getElementsByTagName("img");
            captchaImageSrc = captchaImage[0].src;

            imageSrcArray = captchaImageSrc.split("/");
            captchaMagic = imageSrcArray[imageSrcArray.length - 1];
            erpMagic = `${
                document.cookie.split(";")[0].split("=")[1]
            }.${document.title.split(" ").slice(1, -4).join(" ")}`;
            url = `https://gymkhana.iitkgp.ac.in/api/ecs/${captchaMagic}/${erpMagic}`;

            captchaResponse = await fetch(url);
            captchaResult = await captchaResponse.json();
            captchaValue = captchaResult.captcha;

            return captchaValue;
        };

        const removeSubmissionListeners = () => {
            prof = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll('input[name="check"]');
            const profList = Array.from(prof);
            currProfIndex = profList.findIndex((prof) => prof.checked);
            prof[currProfIndex].click();
        };

        const addSubmissionListeners = () => {
            captchaText = document
                .getElementById("myframe")
                .contentDocument.getElementById("passline");
            submitButton = document
                .getElementById("myframe")
                .contentDocument.getElementById("sub");

            // Delete existing submit button and create a new button
            parentElement = submitButton.parentNode;
            submitButton.remove();
            newSubmitButton = document.createElement("input");
            newSubmitButton.id = "mybutton";
            newSubmitButton.className = "button";
            newSubmitButton.type = "button";
            newSubmitButton.value = "Submit Feedback";
            parentElement.appendChild(newSubmitButton);

            const submitForm = async () => {
                var form = document
                    .getElementById("myframe")
                    .contentDocument.getElementsByName("form1");
                form[0].method = "POST";
                form[0].action = "rev_feed_submit.jsp";
                form[0].submit();

                await processSubmission();
            };

            newSubmitButton.addEventListener("click", async (event) => {
                event.preventDefault();
                await submitForm();
            });
            captchaText.addEventListener("keydown", async (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    await submitForm();
                }
            });
        };

        const processSubmission = async () => {
            await sleep(3000);

            submitButton = document
                .getElementById("myframe")
                .contentDocument.getElementById("sub");
            if (submitButton != null) {
                if (!preference.all) {
                    fill_form();
                } else {
                    profCounter--;
                    handleProf();
                }
            } else {
                if (preference.all) {
                    prof = document
                        .getElementById("myframe")
                        .contentDocument.querySelectorAll(
                            'input[name="check"]'
                        );
                    if (profCounter < prof.length) handleProf();
                    else handleCourse();
                }
            }
        };

        const handleProf = () => {
            prof = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll('input[name="check"]');
            prof[profCounter].click();
            profCounter++;

            submitButton = document
                .getElementById("myframe")
                .contentDocument.getElementById("sub");
            if (submitButton != null) {
                fill_form();
            } else {
                if (profCounter < prof.length) handleProf();
                else handleCourse();
            }
        };

        const handleCourse = () => {
            course = document
                .getElementById("myframe")
                .contentDocument.querySelectorAll(
                    'a[href="javascript:void(0)"]'
                );
            if (courseCounter == course.length) return;
            course[courseCounter].click();
            courseCounter++;

            profCounter = 0;
            handleProf();
        };

        try {
            if (preference.all && courseCounter == 0) {
                handleCourse();
            } else if (!preference.all) {
                removeSubmissionListeners();
                fill_form();
            }
        } catch (err) {
            console.error(err);
        }
    });

function positive_theory_feedback() {
    var teacherStrengths = [
        "The teacher is understanding, approachable and caring",
        "The teacher has deep understanding and clarity of the subject",
        "The teacher clears doubts and make sure the students understand the concepts",
        "The teacher ensures that the speed of the lecture is perfect for everyone",
        "The teacher releases the slides and materials as soon as possible",
        "The teacher makes sure that the assignment load is not a lot on students",
    ];
    // Randomly selecting teacher's strengths from the array created above
    textBox[0].value =
        teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

    textBox[1].value = "Nothing as such"; // this is the default Weakness
    textBox[3].value = "Nothing as such"; // replace with relevant text

    courseStrengths = [
        "This course is well structured and gave me a great understanding of the fundamental concepts",
        "This course is good for real life applications",
        "This course had enough number of tests to make the course thorough",
        "This course conveys the essence of the subject to the students at its best",
        "This course's content is intuitive",
        "This course is designed to ensure that the students are not left behind",
        "Overall this course was interesting and fun to study!",
    ];
    // Randomly selecting course's strengths from the array created above
    textBox[2].value =
        courseStrengths[Math.floor(Math.random() * courseStrengths.length)];

    textBox[4].value = "No suggestions as such, so far so good";

    for (i = 5; i < textBox.length; i++) textBox[i].value = "NIL"; // extra spaces "NIL"ed

    // Clicks `Excellent` OR `Very Good` everywhere
    for (i = prof.length; i < radioButton.length - 10; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i + 3].click();
        else radioButton[i + 4].click();
    radioButton[prof.length + 17].click(); // Clicks `Just Right` for pace
    radioButton[prof.length + 52].click(); // Clicks `Average` for efforts
    radioButton[prof.length + 57].click(); // Clicks `Average` for Workload
}

function positive_lab_feedback() {
    var teacherStrengths = [
        "The teacher is understanding, approachable and caring",
        "The teacher has deep understanding and clarity of the subject",
        "The teacher clears doubts and make sure the students understand the concepts",
        "The teacher ensures that the students get ample amount of time for the experiment",
    ];
    // Randomly selecting teacher's strengths from the array created above
    textBox[0].value =
        teacherStrengths[Math.floor(Math.random() * teacherStrengths.length)];

    textBox[1].value = "Nothing as such"; // this is the default Weakness
    textBox[2].value = "No suggestions as such, so far so good";

    for (i = 3; i < textBox.length; i++) textBox[i].value = "NIL"; // extra spaces "NIL"ed

    // Clicks `Excellent` OR `Very Good` everywhere
    for (i = prof.length; i < radioButton.length; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i + 3].click();
        else radioButton[i + 4].click();
    radioButton[prof.length + 47].click(); // Clicks `Average` for efforts
    radioButton[prof.length + 52].click(); // Clicks `Average` for Workload
}

function neutral_theory_feedback() {
    for (i = 0; i < textBox.length; i++) textBox[i].value = "Nothing as such";

    // Clicks `Good` OR `Very Good` everywhere
    for (i = prof.length; i < radioButton.length - 10; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
        else radioButton[i + 3].click();
    // Randomising selection between `Heavy` & `Average` for Efforts and Workload
    for (i = prof.length + 52; i < radioButton.length; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
}

function neutral_lab_feedback() {
    for (i = 0; i < textBox.length; i++) textBox[i].value = "Nothing as such";

    // Clicks `Good` OR `Very Good` everywhere
    for (i = prof.length; i < radioButton.length; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i + 2].click();
        else radioButton[i + 3].click();
    // Randomising selection between `Heavy` & `Average` for Efforts and Workload
    for (i = prof.length + 47; i < prof.length + 53; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
}

function negative_theory_feedback() {
    var teacherWeaknesses = [
        "The teacher is not approachable",
        "The teacher doesn't make sure the students understand the concepts",
        "The teacher doesn't ensures that the speed of the lecture is perfect for everyone",
        "The teacher is less engaging",
        "The teacher doesn't release the slides and materials on time",
        "The teacher gives too much workload in form of assignments",
    ];
    // Randomly selecting teacher's weaknesses from the array created above
    textBox[1].value =
        teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

    textBox[0].value = "Unfortunately, can not remember any."; // this is the default Strength
    textBox[2].value = "Unfortunately, can not remember any."; // replace with relevant text

    courseWeaknesses = [
        "This course is not well structured and assumed the students to already have the basic knowledge of it",
        "This course doesn't reflect any real life applications for the subject of study",
        "This course conveys the essence of the subject in a hard to grasp manner",
        "This course's content is not intuitive",
        "This course has a steep learning curve",
        "Overall this course was not interesting to study!",
    ];
    // Randomly selecting course's weaknesses from the array created above
    textBox[3].value =
        courseWeaknesses[Math.floor(Math.random() * courseWeaknesses.length)];

    suggestions = [
        "Update the course's content",
        "Make the course more engaging",
    ];
    // Randomly selecting suggestions from the array created above
    textBox[4].value =
        suggestions[Math.floor(Math.random() * suggestions.length)];

    for (i = 5; i < textBox.length; i++) textBox[i].value = "NIL"; // extra spaces "NIL"ed

    // Clicks `Poor` OR `Fair` everywhere
    for (i = prof.length; i < radioButton.length - 10; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
    // Randomising selection between `Too Slow` & `Too Fast`
    if (Math.floor(Math.random() * 2)) radioButton[prof.length + 15].click();
    else radioButton[prof.length + 19].click();
    // Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
    for (i = prof.length + 53; i < radioButton.length; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
}

function negative_lab_feedback() {
    var teacherWeaknesses = [
        "The teacher is not approachable",
        "The teacher doesn't make sure the students understand the concepts",
        "The teacher is less engaging",
        "The teacher doesn't release the experiment theory and reference material on time",
    ];
    // Randomly selecting teacher's weaknesses from the array created above
    textBox[1].value =
        teacherWeaknesses[Math.floor(Math.random() * teacherWeaknesses.length)];

    textBox[0].value = "Unfortunately, can not remember any."; // this is the default Strength

    suggestions = [
        "Fix broken or faulty equipments, wastes a lot of time",
        "Give some extra theory regarding the experiments",
    ];
    textBox[2].value =
        suggestions[Math.floor(Math.random() * suggestions.length)];

    for (i = 3; i < textBox.length; i++) textBox[i].value = "NIL"; // extra spaces "NIL"ed

    // Clicks `Poor` OR `Fair` everywhere
    for (i = prof.length; i < radioButton.length; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
    // Randomising selection between `Heavy` & `Very Heavy` for Efforts and Workload
    for (i = prof.length + 48; i < prof.length + 54; i += 5)
        if (Math.floor(Math.random() * 2)) radioButton[i].click();
        else radioButton[i + 1].click();
}
