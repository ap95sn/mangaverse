// ========================================
// MangaVerse - JavaScript
// ========================================

// ----------------------------------------
// Manga Data
// ----------------------------------------

const mangaData = {
    "Shadow Eclipse": {
        id: "shadow",
        title: "Shadow Eclipse",
        genre: "Action · Fantasy",
        description:
            "A young warrior discovers a mysterious power hidden within his shadow and becomes involved in a conflict between ancient forces.",
        coverClass: "cover-one",
        coverText: "SHADOW ECLIPSE"
    },

    "Neon Hearts": {
        id: "neon",
        title: "Neon Hearts",
        genre: "Romance · Drama",
        description:
            "In a city filled with neon lights, two young people slowly discover that love can appear in the most unexpected places.",
        coverClass: "cover-two",
        coverText: "NEON HEARTS"
    },

    "Crimson Blade": {
        id: "crimson",
        title: "Crimson Blade",
        genre: "Action · Adventure",
        description:
            "A wandering swordsman carries a legendary crimson blade and searches for the truth behind a war that changed his homeland.",
        coverClass: "cover-three",
        coverText: "CRIMSON BLADE"
    },

    "Beyond Tomorrow": {
        id: "tomorrow",
        title: "Beyond Tomorrow",
        genre: "Slice of Life · Drama",
        description:
            "A quiet story about friendship, dreams, growing up, and finding the courage to take the next step toward tomorrow.",
        coverClass: "cover-four",
        coverText: "BEYOND TOMORROW"
    }
};


// ----------------------------------------
// Reader State
// ----------------------------------------

let currentManga = "Shadow Eclipse";
let currentChapter = 1;


// ----------------------------------------
// Page Navigation
// ----------------------------------------

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const targetPage =
        document.getElementById(pageName + "Page");

    if (targetPage) {
        targetPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ----------------------------------------
// Open Manga
// ----------------------------------------

function openManga(mangaName) {

    const manga = mangaData[mangaName];

    if (!manga) {
        console.log("Manga not found:", mangaName);
        return;
    }

    currentManga = mangaName;
    currentChapter = 1;

    const detailTitle =
        document.getElementById("detailTitle");

    if (detailTitle) {
        detailTitle.textContent = manga.title;
    }

    const detailGenre =
        document.getElementById("detailGenre");

    if (detailGenre) {
        detailGenre.textContent = manga.genre;
    }

    const detailDescription =
        document.getElementById("detailDescription");

    if (detailDescription) {
        detailDescription.textContent =
            manga.description;
    }

    const detailCover =
        document.getElementById("detailCover");

    if (detailCover) {
        detailCover.className =
            "detail-cover " + manga.coverClass;
    }

    const detailCoverText =
        document.getElementById("detailCoverText");

    if (detailCoverText) {
        detailCoverText.textContent =
            manga.coverText;
    }

    showPage("detail");
}


// ----------------------------------------
// Open Reader
// ----------------------------------------

function openReader(chapterNumber) {

    currentChapter = chapterNumber;

    const manga = mangaData[currentManga];

    if (!manga) {
        return;
    }

    const readerTitle =
        document.getElementById("readerTitle");

    if (readerTitle) {
        readerTitle.textContent =
            manga.title +
            " — Chapter " +
            currentChapter;
    }

    updateReaderContent();

    showPage("reader");
}


// ----------------------------------------
// Reader Content
// ----------------------------------------

function updateReaderContent() {

    const manga = mangaData[currentManga];

    if (!manga) {
        return;
    }

    const readerContent =
        document.getElementById("readerContent");

    if (!readerContent) {
        return;
    }

    const stories = {

        "Shadow Eclipse": [
            "The night was silent as a strange shadow appeared beneath the old tower.",
            "Kai raised his hand and watched the darkness move independently from his body.",
            "A mysterious voice whispered from the shadows, warning him that the eclipse was coming.",
            "For the first time, Kai realized that the power he feared might also be the only thing capable of protecting his city."
        ],

        "Neon Hearts": [
            "The city lights reflected across the rainy streets as Mia waited beneath a glowing sign.",
            "A familiar voice called her name, and she turned to see someone she had not expected to meet.",
            "They walked through the neon streets together, talking about dreams they had never told anyone else.",
            "Neither of them knew where the night would lead, but somehow the silence between them felt comfortable."
        ],

        "Crimson Blade": [
            "The old road stretched toward the mountains while the crimson blade rested quietly at his side.",
            "A distant sound of steel echoed through the forest, forcing the swordsman to stop.",
            "He discovered a symbol carved into a tree — the same symbol that had appeared before the war.",
            "The truth he had searched for was finally beginning to reveal itself."
        ],

        "Beyond Tomorrow": [
            "The morning began like any other, but today felt strangely different.",
            "After months of hesitation, Ren finally decided to take the first step toward his dream.",
            "His friends gathered around him, reminding him that growing up did not mean leaving everyone behind.",
            "Tomorrow was still uncertain, but for the first time, he was ready to face it."
        ]
    };

    const story = stories[currentManga];

    let html = "";

    story.forEach(function(text, index) {

        html += `
            <div class="manga-panel ${manga.coverClass}">

                <span class="panel-number">
                    ${index + 1}
                </span>

                <div class="panel-content">

                    <div class="panel-title">
                        Chapter ${currentChapter}
                    </div>

                    <p>
                        ${text}
                    </p>

                </div>

            </div>
        `;
    });

    readerContent.innerHTML = html;
}


// ----------------------------------------
// Previous Chapter
// ----------------------------------------

function previousChapter() {

    if (currentChapter > 1) {

        currentChapter--;

        updateReaderTitle();
        updateReaderContent();

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


// ----------------------------------------
// Next Chapter
// ----------------------------------------

function nextChapter() {

    if (currentChapter < 3) {

        currentChapter++;

        updateReaderTitle();
        updateReaderContent();

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


// ----------------------------------------
// Update Reader Title
// ----------------------------------------

function updateReaderTitle() {

    const manga = mangaData[currentManga];

    if (!manga) {
        return;
    }

    const readerTitle =
        document.getElementById("readerTitle");

    if (readerTitle) {

        readerTitle.textContent =
            manga.title +
            " — Chapter " +
            currentChapter;
    }
}


// ----------------------------------------
// Search
// ----------------------------------------

function searchManga() {

    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();

    const cards =
        document.querySelectorAll(
            "#libraryPage .manga-card"
        );

    cards.forEach(function(card) {

        const titleElement =
            card.querySelector("h3");

        if (!titleElement) {
            return;
        }

        const title =
            titleElement.textContent
            .toLowerCase();

        if (title.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


// ----------------------------------------
// Reset Search
// ----------------------------------------

function resetSearch() {

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {
        searchInput.value = "";
    }

    const cards =
        document.querySelectorAll(
            "#libraryPage .manga-card"
        );

    cards.forEach(function(card) {
        card.style.display = "";
    });
}


// ----------------------------------------
// Dark / Light Mode
// ----------------------------------------

function toggleTheme() {

    const root =
        document.documentElement;

    const currentTheme =
        root.getAttribute("data-theme") || "dark";

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

        updateThemeButton("☀");

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

        updateThemeButton("☾");
    }
}


// ----------------------------------------
// Theme Button
// ----------------------------------------

function updateThemeButton(icon) {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );

    if (themeButton) {
        themeButton.textContent = icon;
    }
}


// ----------------------------------------
// Initialize
// ----------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showPage("home");

        const searchInput =
            document.getElementById(
                "searchInput"
            );

        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function(event) {

                    if (event.key === "Enter") {
                        searchManga();
                    }

                }
            );
        }

    }
);
