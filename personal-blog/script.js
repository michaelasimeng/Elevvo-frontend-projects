
//SELECT HTML ELEMENTS

const blogGrid = document.getElementById("blogGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");
const pagination = document.getElementById("pagination");

const blogCards = Array.from(
    document.querySelectorAll(".blog-card")
);

//BLOG SETTINGS

let selectedCategory = "all";
let currentPage = 1;

const postsPerPage = 3;

//FILTER AND SEARCH ARTICLES

function getFilteredPosts() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    return blogCards.filter((card) => {
        const category = card.dataset.category;

        const title = card.querySelector("h3").textContent.toLowerCase();

        const description = card.querySelector("p").textContent.toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch =
            title.includes(searchTerm) ||
            description.includes(searchTerm);

        return matchesCategory && matchesSearch;
    });
}

//DISPLAY BLOG POSTS

function displayPosts() {
    const filteredPosts = getFilteredPosts();

    const totalPages = Math.ceil(
        filteredPosts.length / postsPerPage
    );

    // Keep the current page within the available range
    if (totalPages === 0) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * postsPerPage;

    const endIndex = startIndex + postsPerPage;

    const postsToDisplay = filteredPosts.slice(
        startIndex,
        endIndex
    );

    // Clear the existing blog cards
    blogGrid.innerHTML = "";

    if (postsToDisplay.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-results">
                <h3>No articles found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
    } else {
        postsToDisplay.forEach((post) => {
            blogGrid.appendChild(post);
        });
    }

    displayPagination(totalPages);
}


//CREATE PAGINATION BUTTONS


function displayPagination(totalPages) {
    pagination.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    // Previous button
    const previousButton = document.createElement("button");

    previousButton.className = "page-button";
    previousButton.textContent = "‹";
    previousButton.disabled = currentPage === 1;

    previousButton.addEventListener("click", () => {
        currentPage--;
        displayPosts();
    });

    pagination.appendChild(previousButton);

    // Number buttons
    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement("button");

        button.className = "page-button";

        if (page === currentPage) {
            button.classList.add("active");
        }

        button.textContent = page;

        button.addEventListener("click", () => {
            currentPage = page;
            displayPosts();
        });

        pagination.appendChild(button);
    }

    // Next button
    const nextButton = document.createElement("button");

    nextButton.className = "page-button";
    nextButton.textContent = "›";
    nextButton.disabled = currentPage === totalPages;

    nextButton.addEventListener("click", () => {
        currentPage++;
        displayPosts();
    });

    pagination.appendChild(nextButton);
}


//CATEGORY FILTER BUTTONS


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // Remove active class from all buttons
        filterButtons.forEach((item) => {
            item.classList.remove("active");
        });

        // Activate clicked button
        button.classList.add("active");

        selectedCategory = button.dataset.category;

        currentPage = 1;

        displayPosts();
    });
});


//SEARCH FUNCTIONALITY


searchInput.addEventListener("input", () => {
    currentPage = 1;
    displayPosts();
});


//NEWSLETTER SUBSCRIPTION


const newsletterForm = document.getElementById("newsletterForm");

const newsletterEmail = document.getElementById("newsletterEmail");

const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = newsletterEmail.value.trim();

    if (!email) {
        newsletterMessage.textContent =
            "Please enter your email address.";

        return;
    }

    newsletterMessage.textContent =
        "Thank you! Your subscription form was submitted successfully.";

    newsletterForm.reset();
});

//INITIALIZE THE WEBSITE

displayPosts();

console.log("The Daily Journal is running successfully!");
