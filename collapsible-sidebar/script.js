
// ========================================
// NOVASPACE DASHBOARD
// Navigation and Sidebar Functionality
// ========================================

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");

const navItems = document.querySelectorAll(".nav-item");
const navLinks = document.querySelectorAll(".nav-link");

function updateToggleButtons(isOpen) {
    toggleBtn.setAttribute("aria-expanded", isOpen);
    mobileMenuBtn.setAttribute("aria-expanded", isOpen);
    mobileMenuBtn.setAttribute("aria-label", isOpen ? "Close sidebar" : "Open sidebar");
}


// ========================================
// 1. SIDEBAR TOGGLE
// ========================================

function toggleSidebar() {

    if (window.innerWidth <= 768) {

        sidebar.classList.toggle("mobile-open");

        const isOpen = sidebar.classList.contains("mobile-open");

        updateToggleButtons(isOpen);

    } else {

        sidebar.classList.toggle("collapsed");

        const isExpanded = !sidebar.classList.contains("collapsed");

        toggleBtn.setAttribute("aria-expanded", isExpanded);
    }

}

toggleBtn.addEventListener("click", toggleSidebar);
mobileMenuBtn.addEventListener("click", toggleSidebar);

if (window.innerWidth <= 768) {
    sidebar.classList.remove("collapsed", "mobile-open");
    updateToggleButtons(false);
} else {
    toggleBtn.setAttribute("aria-expanded", !sidebar.classList.contains("collapsed"));
    mobileMenuBtn.setAttribute("aria-expanded", "false");
}


// ========================================
// 2. NAVIGATION LINKS
// ========================================

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        // Remove active class from all links
        navItems.forEach(function (item) {
            item.classList.remove("active");
        });

        // Highlight selected link
        link.closest(".nav-item").classList.add("active");

        // Close mobile sidebar after selection
        if (window.innerWidth <= 768) {

            sidebar.classList.remove("mobile-open");

            updateToggleButtons(false);
        }

    });

});


// ========================================
// 3. HANDLE BROWSER BACK AND FORWARD
// ========================================

function updateActiveNavigation() {

    const currentHash = window.location.hash || "#dashboard";

    navItems.forEach(function (item) {

        const link = item.querySelector(".nav-link");

        if (link.getAttribute("href") === currentHash) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });

}

window.addEventListener("hashchange", updateActiveNavigation);

updateActiveNavigation();


// ========================================
// 4. RESPONSIVE SIDEBAR
// ========================================

window.addEventListener("resize", function () {

    if (window.innerWidth > 768) {

        sidebar.classList.remove("mobile-open");

        const isExpanded = !sidebar.classList.contains("collapsed");

        toggleBtn.setAttribute("aria-expanded", isExpanded);
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.setAttribute("aria-label", "Open sidebar");

    } else {

        sidebar.classList.remove("collapsed", "mobile-open");

        updateToggleButtons(false);
    }

});


// ========================================
// 5. SETTINGS FORM
// ========================================

const settingsForm = document.getElementById("settingsForm");

if (settingsForm) {

    settingsForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();

        const email = document.getElementById("email").value.trim();

        const message = document.getElementById("settingsMessage");

        if (!fullName || !email) {

            message.style.color = "#dc2626";
            message.textContent = "Please complete all required fields.";

            return;
        }

        message.style.color = "#059669";
        message.textContent = "Your profile changes have been saved for this session!";

        // Update visible profile name
        document.querySelectorAll(".user-info h4, .settings-profile h3")
            .forEach(function (element) {
                element.textContent = fullName;
            });

    });

}


// ========================================
// 6. INITIALIZE DASHBOARD
// ========================================

console.log("NovaSpace Dashboard initialized successfully!");

console.log("All five navigation links are ready.");
