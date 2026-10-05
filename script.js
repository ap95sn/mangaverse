// ========================================
// MangaVerse - JavaScript
// ========================================

const mangaData = {
    "Shadow Eclipse": {
        title: "Shadow Eclipse",
        genre: "Action · Fantasy",
        description:
            "A mysterious story about a young hero who discovers a hidden power connected to the shadows.",
        coverImage: "images/shadow-eclipse.JPG"
    },

    "Neon Hearts": {
        title: "Neon Hearts",
        genre: "Romance · Drama",
        description:
            "In a city filled with neon lights, two young people slowly discover that love can appear in the most unexpected places.",
        coverImage: "images/neon-hearts.JPG"
    },

    "Crimson Blade": {
        title: "Crimson Blade",
        genre: "Action · Adventure",
        description:
            "A wandering swordsman carries a legendary crimson blade and searches for the truth behind a forgotten war.",
        coverImage: "images/crimson-blade.JPG"
    },

    "Beyond Tomorrow": {
        title: "Beyond Tomorrow",
        genre: "Slice of Life · Drama",
        description:
            "A quiet story about friendship, dreams, growing up, and finding the courage to take the next step.",
        coverImage: "images/beyond-tomorrow.JPG"
    }
};


// ========================================
// Current State
// ========================================

let currentManga = "Shadow Eclipse";
let currentChapter = 1;


// ========================================
// Page Navigation
// ========================================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.add("hidden");
        page.classList.remove("active");
    });

    const targetPage =
        document.getElementById(pageName + "Page");

    if (!targetPage) {
        console.error(
            "Page not found:",
            pageName + "Page"
        );
        return;
    }

    targetPage.classList.remove("hidden");
    targetPage.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// Open Manga Detail
// ========================================

function openManga(mangaName) {

    const manga = mangaData[mangaName];

    if (!manga) {
        console.error(
            "Manga not found:",
            mangaName
        );
        return;
    }

    currentManga = mangaName;
    currentChapter = 1;


    // Update title
    const title =
        document.getElementById("detailTitle");

    if (title) {
        title.textContent = manga.title;
    }


    // Update genre
    const genre =
        document.getElementById("detailGenre");

    if (genre) {
        genre.textContent = manga.genre;
    }


    // Update description
    const description =
        document.getElementById("detailDescription");

    if (description) {
        description.textContent =
            manga.description;
    }


    // Update manga cover image
    const coverImage =
        document.getElementById(
            "detailCoverImage"
        );

    if (coverImage) {
        coverImage.src = manga.coverImage;
        coverImage.alt =
            manga.title + " manga cover";
    }


    // Open detail page
    showPage("detail");
}


// ========================================
// Open Reader
// ========================================

function openReader(chapterNumber) {

    currentChapter = chapterNumber;

    const manga =
        mangaData[currentManga];

    if (!manga) {
        console.error(
            "Current manga not found."
        );
        return;
    }

    const readerTitle =
        document.getElementById(
            "readerTitle"
        );

    if (readerTitle) {
        readerTitle.textContent =
            manga.title +
            " — Chapter " +
            currentChapter;
    }

    showPage("reader");
}


// ========================================
// Previous Chapter
// ========================================

function previousChapter() {

    if (currentChapter > 1) {

        currentChapter--;

        const manga =
            mangaData[currentManga];

        const readerTitle =
            document.getElementById(
                "readerTitle"
            );

        if (readerTitle && manga) {
            readerTitle.textContent =
                manga.title +
                " — Chapter " +
                currentChapter;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        alert(
            "You are already reading Chapter 1."
        );
    }
}


// ========================================
// Next Chapter
// ========================================

function nextChapter() {

    if (currentChapter < 3) {

        currentChapter++;

        const manga =
            mangaData[currentManga];

        const readerTitle =
            document.getElementById(
                "readerTitle"
            );

        if (readerTitle && manga) {
            readerTitle.textContent =
                manga.title +
                " — Chapter " +
                currentChapter;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        alert(
            "You have reached the latest chapter."
        );
    }
}


// ========================================
// Search Manga
// ========================================

function searchManga() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) {
        return;
    }

    const searchText =
        input.value
            .toLowerCase()
            .trim();

    const cards =
        document.querySelectorAll(
            "#libraryGrid .manga-card"
        );

    cards.forEach(function(card) {

        const title =
            card.getAttribute(
                "data-title"
            );

        if (!title) {
            return;
        }

        if (
            title
                .toLowerCase()
                .includes(searchText)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}


// ========================================
// Dark / Light Theme
// ========================================

function toggleTheme() {

    const root =
        document.documentElement;

    const currentTheme =
        root.getAttribute(
            "data-theme"
        ) || "dark";


    if (currentTheme === "dark") {

        root.setAttribute(
            "data-theme",
            "light"
        );

        root.style.setProperty(
            "--bg",
            "#f5f5f7"
        );

        root.style.setProperty(
            "--surface",
            "#ffffff"
        );

        root.style.setProperty(
            "--card",
            "#ffffff"
        );

        root.style.setProperty(
            "--card-hover",
            "#f0f0f2"
        );

        root.style.setProperty(
            "--text",
            "#171717"
        );

        root.style.setProperty(
            "--muted",
            "#666666"
        );

        root.style.setProperty(
            "--border",
            "#dddddd"
        );

        root.style.setProperty(
            "--shadow",
            "0 8px 25px rgba(0,0,0,0.08)"
        );

        const button =
            document.querySelector(
                ".theme-btn"
            );

        if (button) {
            button.textContent = "☀";
        }

    } else {

        root.setAttribute(
            "data-theme",
            "dark"
        );

        root.style.setProperty(
            "--bg",
            "#0f0f12"
        );

        root.style.setProperty(
            "--surface",
            "#17171c"
        );

        root.style.setProperty(
            "--card",
            "#1d1d24"
        );

        root.style.setProperty(
            "--card-hover",
            "#25252e"
        );

        root.style.setProperty(
            "--text",
            "#f5f5f5"
        );

        root.style.setProperty(
            "--muted",
            "#a0a0aa"
        );

        root.style.setProperty(
            "--border",
            "#303039"
        );

        root.style.setProperty(
            "--shadow",
            "0 8px 25px rgba(0,0,0,0.25)"
        );

        const button =
            document.querySelector(
                ".theme-btn"
            );

        if (button) {
            button.textContent = "☾";
        }
    }
}


// ========================================
// Start Website
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {
        showPage("home");
    }
);