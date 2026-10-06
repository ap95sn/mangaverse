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

let currentManga = "Shadow Eclipse";
let currentChapter = 1;


/* ==================== PAGE NAVIGATION ==================== */

function showPage(pageName) {
    const pages = document.querySelectorAll(".page");

    pages.forEach((page) => {
        page.classList.remove("active");
    });

    const targetPage = document.getElementById(pageName + "Page");

    if (targetPage) {
        targetPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* ==================== LOGIN SYSTEM ==================== */

const demoUser = {
    username: "admin",
    password: "1234"
};


function loginUser(event) {
    event.preventDefault();

    const usernameInput =
        document.getElementById("usernameInput");

    const passwordInput =
        document.getElementById("passwordInput");

    const loginMessage =
        document.getElementById("loginMessage");

    if (!usernameInput || !passwordInput) {
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (
        username === demoUser.username &&
        password === demoUser.password
    ) {
        sessionStorage.setItem("loggedIn", "true");

        if (loginMessage) {
            loginMessage.textContent = "";
        }

        usernameInput.value = "";
        passwordInput.value = "";

        showPage("home");
    } else {
        if (loginMessage) {
            loginMessage.textContent =
                "Invalid username or password.";
        }
    }
}


function logoutUser() {
    sessionStorage.removeItem("loggedIn");

    currentManga = "Shadow Eclipse";
    currentChapter = 1;

    const usernameInput =
        document.getElementById("usernameInput");

    const passwordInput =
        document.getElementById("passwordInput");

    const loginMessage =
        document.getElementById("loginMessage");

    if (usernameInput) {
        usernameInput.value = "";
    }

    if (passwordInput) {
        passwordInput.value = "";
    }

    if (loginMessage) {
        loginMessage.textContent = "";
    }

    showPage("login");
}


/* ==================== MANGA DETAIL ==================== */

function openManga(mangaName) {
    const manga = mangaData[mangaName];

    if (!manga) {
        return;
    }

    currentManga = mangaName;
    currentChapter = 1;

    document.getElementById("detailTitle").textContent =
        manga.title;

    document.getElementById("detailGenre").textContent =
        manga.genre;

    document.getElementById("detailDescription").textContent =
        manga.description;

    document.getElementById("detailCoverImage").src =
        manga.coverImage;

    document.getElementById("detailCoverImage").alt =
        manga.title + " manga cover";

    showPage("detail");
}


/* ==================== MANGA READER ==================== */

function openReader(chapterNumber) {
    currentChapter = chapterNumber;

    const readerTitle =
        document.getElementById("readerTitle");

    if (readerTitle) {
        readerTitle.textContent =
            currentManga + " — Chapter " + currentChapter;
    }

    showPage("reader");
}


function previousChapter() {
    if (currentChapter > 1) {
        currentChapter--;

        const readerTitle =
            document.getElementById("readerTitle");

        if (readerTitle) {
            readerTitle.textContent =
                currentManga + " — Chapter " + currentChapter;
        }
    }
}


function nextChapter() {
    if (currentChapter < 3) {
        currentChapter++;

        const readerTitle =
            document.getElementById("readerTitle");

        if (readerTitle) {
            readerTitle.textContent =
                currentManga + " — Chapter " + currentChapter;
        }
    }
}


/* ==================== SEARCH ==================== */

function searchManga() {
    const searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const mangaCards =
        document.querySelectorAll("#libraryGrid .manga-card");

    mangaCards.forEach((card) => {
        const title =
            card.dataset.title.toLowerCase();

        if (title.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}


/* ==================== DARK MODE ==================== */

function toggleTheme() {
    const html = document.documentElement;

    const currentTheme =
        html.getAttribute("data-theme");

    if (currentTheme === "dark") {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }
}


/* ==================== INITIAL PAGE ==================== */

document.addEventListener("DOMContentLoaded", () => {
    const loggedIn =
        sessionStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        showPage("home");
    } else {
        showPage("login");
    }
});