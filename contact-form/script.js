

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");




contactForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Get form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Clear previous feedback
    formFeedback.textContent = "";
    formFeedback.style.color = "#ffffff";


    //Check Required Field

    if (!fullName || !email || !subject || !message) {
        showFeedback("Please complete all fields.", "#912828");
        return;
    }


  //Validate Email

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showFeedback("Please enter a valid email address.", "#f87171");
        return;
    }


   //Success Message

    // 5. SUCCESS MESSAGE

const submitButton = contactForm.querySelector(".submit-button");

submitButton.disabled = true;
submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

setTimeout(function () {

    showFeedback(
        `Thank you, ${fullName}! Your message has been submitted successfully.`,
        "#4ade80"
    );

    contactForm.reset();

    submitButton.disabled = false;
    submitButton.innerHTML = 'Send Message <i class="fas fa-arrow-right"></i>';

}, 1000);

});

//Feedback Function

function showFeedback(message, color) {
    formFeedback.textContent = message;
    formFeedback.style.color = color;
}
