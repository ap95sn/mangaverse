/* =========================
   DEFAULT MANGA DATA
========================= */

const defaultMangaData = [
    {
        id: "shadow-eclipse",
        title: "Shadow Eclipse",
        genre: "Action · Fantasy",
        description:
            "A mysterious story about a young hero who discovers a hidden power connected to the shadows.",
        coverImage: "images/shadow-eclipse.JPG",
        status: "Ongoing"
    },

    {
        id: "neon-hearts",
        title: "Neon Hearts",
        genre: "Romance · Drama",
        description:
            "In a city filled with neon lights, two young people slowly discover that love can appear in the most unexpected places.",
        coverImage: "images/neon-hearts.JPG",
        status: "Ongoing"
    },

    {
        id: "crimson-blade",
        title: "Crimson Blade",
        genre: "Action · Adventure",
        description:
            "A wandering swordsman carries a legendary crimson blade and searches for the truth behind a forgotten war.",
        coverImage: "images/crimson-blade.JPG",
        status: "Ongoing"
    },

    {
        id: "beyond-tomorrow",
        title: "Beyond Tomorrow",
        genre: "Slice of Life · Drama",
        description:
            "A quiet story about friendship, dreams, growing up, and finding the courage to take the next step.",
        coverImage: "images/beyond-tomorrow.JPG",
        status: "Completed"
    }
];


const STORAGE_KEY = "mangaverseMangaData";


/* =========================
   LOAD MANGA DATA
========================= */

function loadMangaData() {

    const savedData =
        localStorage.getItem(STORAGE_KEY);

    if (!savedData) {

        const initialData =
            JSON.parse(
                JSON.stringify(defaultMangaData)
            );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(initialData)
        );

        return initialData;
    }

    try {

        const parsedData =
            JSON.parse(savedData);

        if (Array.isArray(parsedData)) {
            return parsedData;
        }

    } catch (error) {

        console.error(
            "Unable to load manga data:",
            error
        );
    }


    const fallbackData =
        JSON.parse(
            JSON.stringify(defaultMangaData)
        );

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(fallbackData)
    );

    return fallbackData;
}


let mangaData = loadMangaData();


/* =========================
   CURRENT READING STATE
========================= */

let currentManga = "shadow-eclipse";

let currentChapter = 1;


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageName) {

    const loggedIn =
        sessionStorage.getItem("loggedIn");

    const userRole =
        sessionStorage.getItem("userRole");


    /* -------------------------
       LOGIN PAGE
    ------------------------- */

    if (
        pageName !== "login" &&
        loggedIn !== "true"
    ) {
        pageName = "login";
    }


    /* -------------------------
       ADMIN PROTECTION
    ------------------------- */

    if (
        pageName === "admin" &&
        (
            loggedIn !== "true" ||
            userRole !== "admin"
        )
    ) {
        pageName = "login";
    }


    const pages =
        document.querySelectorAll(".page");


    pages.forEach(function (page) {

        page.classList.remove("active");

    });


    const targetPage =
        document.getElementById(
            pageName + "Page"
        );


    if (targetPage) {

        targetPage.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    updateNavigation();


    if (pageName === "home") {
        renderHomeManga();
    }


    if (pageName === "library") {
        renderLibraryManga();
    }


    if (pageName === "admin") {
        renderAdminDashboard();
    }
}


/* =========================
   NAVIGATION DISPLAY
========================= */

function updateNavigation() {

    const loggedIn =
        sessionStorage.getItem("loggedIn");

    const userRole =
        sessionStorage.getItem("userRole");


    const adminNavBtn =
        document.getElementById(
            "adminNavBtn"
        );


    if (!adminNavBtn) {
        return;
    }


    if (
        loggedIn === "true" &&
        userRole === "admin"
    ) {

        adminNavBtn.style.display = "";

    } else {

        adminNavBtn.style.display = "none";

    }
}


/* =========================
   LOGIN
========================= */

const demoAccounts = {

    admin: {
        username: "admin",
        password: "1234",
        role: "admin"
    },

    user: {
        username: "user",
        password: "1234",
        role: "user"
    }

};


function loginUser(event) {

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "usernameInput"
        );


    const passwordInput =
        document.getElementById(
            "passwordInput"
        );


    const loginMessage =
        document.getElementById(
            "loginMessage"
        );


    if (
        !usernameInput ||
        !passwordInput
    ) {
        return false;
    }


    const username =
        usernameInput.value
            .trim()
            .toLowerCase();


    const password =
        passwordInput.value;


    const account =
        demoAccounts[username];


    if (
        account &&
        account.password === password
    ) {

        sessionStorage.setItem(
            "loggedIn",
            "true"
        );


        sessionStorage.setItem(
            "userRole",
            account.role
        );


        if (loginMessage) {

            loginMessage.textContent = "";

        }


        usernameInput.value = "";

        passwordInput.value = "";


        if (account.role === "admin") {

            showPage("admin");

        } else {

            showPage("home");

        }

    } else {

        if (loginMessage) {

            loginMessage.textContent =
                "Invalid username or password.";

        }

    }


    return false;
}


/* =========================
   LOGOUT
========================= */

function logoutUser() {

    sessionStorage.removeItem(
        "loggedIn"
    );


    sessionStorage.removeItem(
        "userRole"
    );


    showPage("login");


    return false;
}


/* =========================
   SAVE MANGA DATA
========================= */

function saveMangaData() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(mangaData)
    );
}


/* =========================
   CREATE MANGA ID
========================= */

function createMangaId(title) {

    const baseId =
        title
            .toLowerCase()
            .trim()
            .replace(
                /[^a-z0-9]+/g,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            );


    let newId =
        baseId || "manga";


    const idExists =
        mangaData.some(
            function (manga) {
                return manga.id === newId;
            }
        );


    if (idExists) {

        newId =
            newId +
            "-" +
            Date.now();

    }


    return newId;
}


/* =========================
   ESCAPE HTML
========================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================
   FIND MANGA
========================= */

function findManga(mangaId) {

    return mangaData.find(
        function (manga) {

            return manga.id === mangaId;

        }
    );

}


/* =========================
   MANGA CARD
========================= */

function createMangaCard(manga) {

    const safeTitle =
        escapeHTML(manga.title);

    const safeGenre =
        escapeHTML(manga.genre);

    const safeCover =
        escapeHTML(manga.coverImage);


    return `
        <article
            class="manga-card"
            data-title="${safeTitle}"
            onclick="openManga('${manga.id}')">

            <div class="cover">

                <img
                    src="${safeCover}"
                    alt="${safeTitle} manga cover">

            </div>

            <div class="card-content">

                <h3>
                    ${safeTitle}
                </h3>

                <p>
                    ${safeGenre}
                </p>

            </div>

        </article>
    `;
}


/* =========================
   HOME MANGA
========================= */

function renderHomeManga() {

    const homeGrid =
        document.getElementById(
            "homeMangaGrid"
        );


    if (!homeGrid) {
        return;
    }


    homeGrid.innerHTML =
        mangaData
            .slice(0, 4)
            .map(createMangaCard)
            .join("");


    if (mangaData.length === 0) {

        homeGrid.innerHTML = `
            <p class="admin-empty">
                No manga available yet.
            </p>
        `;

    }
}


/* =========================
   LIBRARY MANGA
========================= */

function renderLibraryManga() {

    const libraryGrid =
        document.getElementById(
            "libraryGrid"
        );


    if (!libraryGrid) {
        return;
    }


    libraryGrid.innerHTML =
        mangaData
            .map(createMangaCard)
            .join("");


    if (mangaData.length === 0) {

        libraryGrid.innerHTML = `
            <p class="admin-empty">
                No manga available yet.
            </p>
        `;

    }


    searchManga();
}


/* =========================
   MANGA DETAIL
========================= */

function openManga(mangaId) {

    const manga =
        findManga(mangaId);


    if (!manga) {
        return;
    }


    currentManga =
        manga.id;


    currentChapter = 1;


    const detailTitle =
        document.getElementById(
            "detailTitle"
        );


    const detailGenre =
        document.getElementById(
            "detailGenre"
        );


    const detailDescription =
        document.getElementById(
            "detailDescription"
        );


    const detailCoverImage =
        document.getElementById(
            "detailCoverImage"
        );


    const detailStatus =
        document.getElementById(
            "detailStatus"
        );


    if (detailTitle) {

        detailTitle.textContent =
            manga.title;

    }


    if (detailGenre) {

        detailGenre.textContent =
            manga.genre;

    }


    if (detailDescription) {

        detailDescription.textContent =
            manga.description;

    }


    if (detailCoverImage) {

        detailCoverImage.src =
            manga.coverImage;

        detailCoverImage.alt =
            manga.title +
            " manga cover";

    }


    if (detailStatus) {

        detailStatus.textContent =
            manga.status ||
            "Ongoing";

    }


    showPage("detail");
}


/* =========================
   MANGA READER
========================= */

function openReader(chapterNumber) {

    currentChapter =
        chapterNumber;


    const manga =
        findManga(currentManga);


    const readerTitle =
        document.getElementById(
            "readerTitle"
        );


    if (
        readerTitle &&
        manga
    ) {

        readerTitle.textContent =
            manga.title +
            " — Chapter " +
            currentChapter;

    }


    showPage("reader");
}


/* =========================
   PREVIOUS CHAPTER
========================= */

function previousChapter() {

    if (currentChapter > 1) {

        currentChapter--;


        const manga =
            findManga(currentManga);


        const readerTitle =
            document.getElementById(
                "readerTitle"
            );


        if (
            readerTitle &&
            manga
        ) {

            readerTitle.textContent =
                manga.title +
                " — Chapter " +
                currentChapter;

        }

    }
}


/* =========================
   NEXT CHAPTER
========================= */

function nextChapter() {

    if (currentChapter < 3) {

        currentChapter++;


        const manga =
            findManga(currentManga);


        const readerTitle =
            document.getElementById(
                "readerTitle"
            );


        if (
            readerTitle &&
            manga
        ) {

            readerTitle.textContent =
                manga.title +
                " — Chapter " +
                currentChapter;

        }

    }
}


/* =========================
   SEARCH
========================= */

function searchManga() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    const libraryGrid =
        document.getElementById(
            "libraryGrid"
        );


    if (
        !searchInput ||
        !libraryGrid
    ) {
        return;
    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const mangaCards =
        libraryGrid.querySelectorAll(
            ".manga-card"
        );


    mangaCards.forEach(
        function (card) {

            const title =
                (
                    card.dataset.title ||
                    ""
                )
                    .toLowerCase();


            if (
                title.includes(
                    searchText
                )
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );
}


/* =========================
   DARK MODE
========================= */

function toggleTheme() {

    const html =
        document.documentElement;


    const currentTheme =
        html.getAttribute(
            "data-theme"
        );


    if (
        currentTheme === "dark"
    ) {

        html.setAttribute(
            "data-theme",
            "light"
        );

        localStorage.setItem(
            "mangaverseTheme",
            "light"
        );

    } else {

        html.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "mangaverseTheme",
            "dark"
        );

    }
}


/* =========================
   LOAD THEME
========================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "mangaverseTheme"
        );


    if (savedTheme === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

    }
}


/* =========================
   ADMIN DASHBOARD
========================= */

function renderAdminDashboard() {

    const userRole =
        sessionStorage.getItem(
            "userRole"
        );


    if (userRole !== "admin") {
        return;
    }


    renderAdminMangaList();

    updateAdminMangaCount();
}


/* =========================
   ADMIN MANGA COUNT
========================= */

function updateAdminMangaCount() {

    const countElement =
        document.getElementById(
            "adminMangaCount"
        );


    if (!countElement) {
        return;
    }


    countElement.textContent =
        mangaData.length;
}


/* =========================
   ADMIN MANGA LIST
========================= */

function renderAdminMangaList() {

    const adminList =
        document.getElementById(
            "adminMangaList"
        );


    if (!adminList) {
        return;
    }


    if (mangaData.length === 0) {

        adminList.innerHTML = `
            <div class="admin-empty">
                No manga available.
                Add your first manga above.
            </div>
        `;

        return;
    }


    adminList.innerHTML =
        mangaData
            .map(
                function (manga) {

                    const safeTitle =
                        escapeHTML(
                            manga.title
                        );


                    const safeGenre =
                        escapeHTML(
                            manga.genre
                        );


                    const safeStatus =
                        escapeHTML(
                            manga.status ||
                            "Ongoing"
                        );


                    const safeCover =
                        escapeHTML(
                            manga.coverImage
                        );


                    return `
                        <div
                            class="admin-manga-item">

                            <div
                                class="admin-manga-info">

                                <div
                                    class="admin-manga-cover">

                                    <img
                                        src="${safeCover}"
                                        alt="${safeTitle}">

                                </div>


                                <div
                                    class="admin-manga-text">

                                    <h3>
                                        ${safeTitle}
                                    </h3>

                                    <p>
                                        ${safeGenre}
                                    </p>

                                    <span
                                        class="admin-manga-status">
                                        ${safeStatus}
                                    </span>

                                </div>

                            </div>


                            <div
                                class="admin-manga-actions">

                                <button
                                    type="button"
                                    class="secondary-btn"
                                    onclick="editManga('${manga.id}')">
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    class="danger-btn"
                                    onclick="deleteManga('${manga.id}')">
                                    Delete
                                </button>

                            </div>

                        </div>
                    `;

                }
            )
            .join("");
}


/* =========================
   SAVE / ADD / EDIT MANGA
========================= */

function saveManga(event) {

    event.preventDefault();


    const titleInput =
        document.getElementById(
            "mangaTitleInput"
        );


    const genreInput =
        document.getElementById(
            "mangaGenreInput"
        );


    const descriptionInput =
        document.getElementById(
            "mangaDescriptionInput"
        );


    const coverInput =
        document.getElementById(
            "mangaCoverInput"
        );


    const statusInput =
        document.getElementById(
            "mangaStatusInput"
        );


    const editIdInput =
        document.getElementById(
            "editMangaId"
        );


    if (
        !titleInput ||
        !genreInput ||
        !descriptionInput ||
        !coverInput ||
        !statusInput ||
        !editIdInput
    ) {
        return false;
    }


    const title =
        titleInput.value.trim();


    const genre =
        genreInput.value.trim();


    const description =
        descriptionInput.value.trim();


    const coverImage =
        coverInput.value.trim();


    const status =
        statusInput.value;


    const editId =
        editIdInput.value;


    if (
        !title ||
        !genre ||
        !description ||
        !coverImage
    ) {

        return false;

    }


    /* -------------------------
       EDIT EXISTING MANGA
    ------------------------- */

    if (editId) {

        const manga =
            findManga(editId);


        if (manga) {

            manga.title =
                title;

            manga.genre =
                genre;

            manga.description =
                description;

            manga.coverImage =
                coverImage;

            manga.status =
                status;

        }

    }


    /* -------------------------
       ADD NEW MANGA
    ------------------------- */

    else {

        const newManga = {

            id:
                createMangaId(
                    title
                ),

            title:
                title,

            genre:
                genre,

            description:
                description,

            coverImage:
                coverImage,

            status:
                status

        };


        mangaData.push(
            newManga
        );

    }


    saveMangaData();


    resetMangaForm();


    renderHomeManga();

    renderLibraryManga();

    renderAdminDashboard();


    return false;
}


/* =========================
   EDIT MANGA
========================= */

function editManga(mangaId) {

    const manga =
        findManga(mangaId);


    if (!manga) {
        return;
    }


    const titleInput =
        document.getElementById(
            "mangaTitleInput"
        );


    const genreInput =
        document.getElementById(
            "mangaGenreInput"
        );


    const descriptionInput =
        document.getElementById(
            "mangaDescriptionInput"
        );


    const coverInput =
        document.getElementById(
            "mangaCoverInput"
        );


    const statusInput =
        document.getElementById(
            "mangaStatusInput"
        );


    const editIdInput =
        document.getElementById(
            "editMangaId"
        );


    const formTitle =
        document.getElementById(
            "adminFormTitle"
        );


    const saveButton =
        document.getElementById(
            "saveMangaBtn"
        );


    const cancelButton =
        document.getElementById(
            "cancelEditBtn"
        );


    if (
        !titleInput ||
        !genreInput ||
        !descriptionInput ||
        !coverInput ||
        !statusInput ||
        !editIdInput
    ) {
        return;
    }


    titleInput.value =
        manga.title;


    genreInput.value =
        manga.genre;


    descriptionInput.value =
        manga.description;


    coverInput.value =
        manga.coverImage;


    statusInput.value =
        manga.status ||
        "Ongoing";


    editIdInput.value =
        manga.id;


    if (formTitle) {

        formTitle.textContent =
            "Edit Manga";

    }


    if (saveButton) {

        saveButton.textContent =
            "Save Changes";

    }


    if (cancelButton) {

        cancelButton.style.display =
            "";

    }


    showPage("admin");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   DELETE MANGA
========================= */

function deleteManga(mangaId) {

    const manga =
        findManga(mangaId);


    if (!manga) {
        return;
    }


    const confirmed =
        window.confirm(
            'Delete "' +
            manga.title +
            '"?'
        );


    if (!confirmed) {
        return;
    }


    mangaData =
        mangaData.filter(
            function (item) {

                return item.id !== mangaId;

            }
        );


    saveMangaData();


    if (
        currentManga === mangaId
    ) {

        currentManga =
            mangaData.length > 0
                ? mangaData[0].id
                : "";

        currentChapter = 1;

    }


    renderHomeManga();

    renderLibraryManga();

    renderAdminDashboard();


    resetMangaForm();
}


/* =========================
   RESET MANGA FORM
========================= */

function resetMangaForm() {

    const form =
        document.getElementById(
            "mangaForm"
        );


    const editIdInput =
        document.getElementById(
            "editMangaId"
        );


    const formTitle =
        document.getElementById(
            "adminFormTitle"
        );


    const saveButton =
        document.getElementById(
            "saveMangaBtn"
        );


    const cancelButton =
        document.getElementById(
            "cancelEditBtn"
        );


    if (form) {
        form.reset();
    }


    if (editIdInput) {

        editIdInput.value =
            "";

    }


    if (formTitle) {

        formTitle.textContent =
            "Add New Manga";

    }


    if (saveButton) {

        saveButton.textContent =
            "Add Manga";

    }


    if (cancelButton) {

        cancelButton.style.display =
            "none";

    }
}


/* =========================
   CANCEL EDIT
========================= */

function cancelEditManga() {

    resetMangaForm();

}


/* =========================
   PAGE START
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTheme();


        renderHomeManga();

        renderLibraryManga();

        renderAdminDashboard();


        const loggedIn =
            sessionStorage.getItem(
                "loggedIn"
            );


        const userRole =
            sessionStorage.getItem(
                "userRole"
            );


        updateNavigation();


        if (loggedIn !== "true") {

            showPage("login");

        } else if (
            userRole === "admin"
        ) {

            showPage("admin");

        } else {

            showPage("home");

        }

    }
);