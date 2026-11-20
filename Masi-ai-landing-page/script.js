// Get the theme toggle button
const themeToggle = document.getElementById("themeToggle");

// Get the icon inside the button
const themeIcon = themeToggle.querySelector("i");

// Function to apply the selected theme
function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        document.body.classList.remove("dark-mode");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }

    // Save the selected theme
    localStorage.setItem("nexaTheme", theme);
}

// Load the saved theme when the page opens
const savedTheme = localStorage.getItem("nexaTheme") || "light";

applyTheme(savedTheme);

// Switch between light and dark mode
themeToggle.addEventListener("click", function () {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
        applyTheme("light");
    } else {
        applyTheme("dark");
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Update the footer year automatically
const footerYear = document.querySelector(".footer-bottom");

if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace(
        /\d{4}/,
        new Date().getFullYear()
    );
}
