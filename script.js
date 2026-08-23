/* ==========================================
   FACTOR MAGAZINE
   EDICIÓN 15 · SEPTIEMBRE
========================================== */


/* ==========================================
   CONFIGURACIÓN
========================================== */

const TOTAL_PAGES = 20;

const PAGE_FOLDER = "paginas/";


/* ==========================================
   ELEMENTOS
========================================== */

const book = document.getElementById("book");

const thumbnails = document.getElementById("thumbnails");

const currentPageElement =
    document.getElementById("currentPage");

const totalPagesElement =
    document.getElementById("totalPages");


const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const firstBtn =
    document.getElementById("firstBtn");

const prevSmallBtn =
    document.getElementById("prevSmallBtn");

const nextSmallBtn =
    document.getElementById("nextSmallBtn");

const lastBtn =
    document.getElementById("lastBtn");

const zoomInBtn =
    document.getElementById("zoomInBtn");

const zoomOutBtn =
    document.getElementById("zoomOutBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");


/* ==========================================
   VARIABLES
========================================== */

let currentPage = 1;

let zoomLevel = 1;


/* ==========================================
   CREAR PÁGINAS
========================================== */

function createPages() {

    for (let i = 1; i <= TOTAL_PAGES; i++) {

        const page = document.createElement("img");

        page.className = "book-page";

        page.src = `${PAGE_FOLDER}${i}.jpg`;

        page.alt =
            `Factor Magazine - Edición 15 - Página ${i}`;

        page.loading =
            i === 1 ? "eager" : "lazy";

        page.draggable = false;

        page.dataset.page = i;

        book.appendChild(page);
    }

}


/* ==========================================
   CREAR MINIATURAS
========================================== */

function createThumbnails() {

    for (let i = 1; i <= TOTAL_PAGES; i++) {

        const thumbnail =
            document.createElement("img");

        thumbnail.className = "thumbnail";

        thumbnail.src =
            `${PAGE_FOLDER}${i}.jpg`;

        thumbnail.alt =
            `Página ${i}`;

        thumbnail.loading = "lazy";

        thumbnail.dataset.page = i;


        thumbnail.addEventListener("click", () => {

            showPage(i);

        });


        thumbnails.appendChild(thumbnail);

    }

}


/* ==========================================
   MOSTRAR PÁGINA
========================================== */

function showPage(pageNumber) {

    if (pageNumber < 1) {
        pageNumber = 1;
    }

    if (pageNumber > TOTAL_PAGES) {
        pageNumber = TOTAL_PAGES;
    }


    currentPage = pageNumber;


    /* Ocultar todas */

    const pages =
        document.querySelectorAll(".book-page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    /* Mostrar página actual */

    const activePage =
        document.querySelector(
            `.book-page[data-page="${currentPage}"]`
        );

    if (activePage) {

        activePage.classList.add("active");

    }


    /* Actualizar contador */

    currentPageElement.textContent =
        currentPage;

    totalPagesElement.textContent =
        TOTAL_PAGES;


    /* Actualizar miniaturas */

    const thumbs =
        document.querySelectorAll(".thumbnail");

    thumbs.forEach(thumb => {

        thumb.classList.remove("active");

    });


    const activeThumb =
        document.querySelector(
            `.thumbnail[data-page="${currentPage}"]`
        );

    if (activeThumb) {

        activeThumb.classList.add("active");

        activeThumb.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
        });

    }


    /* Estado de botones */

    prevBtn.disabled =
        currentPage === 1;

    prevSmallBtn.disabled =
        currentPage === 1;

    firstBtn.disabled =
        currentPage === 1;


    nextBtn.disabled =
        currentPage === TOTAL_PAGES;

    nextSmallBtn.disabled =
        currentPage === TOTAL_PAGES;

    lastBtn.disabled =
        currentPage === TOTAL_PAGES;


    /* Actualizar URL */

    history.replaceState(
        null,
        "",
        `#pagina-${currentPage}`
    );

}


/* ==========================================
   NAVEGACIÓN
========================================== */

function nextPage() {

    if (currentPage < TOTAL_PAGES) {

        showPage(currentPage + 1);

    }

}


function previousPage() {

    if (currentPage > 1) {

        showPage(currentPage - 1);

    }

}


function firstPage() {

    showPage(1);

}


function lastPage() {

    showPage(TOTAL_PAGES);

}


/* ==========================================
   ZOOM
========================================== */

function updateZoom() {

    book.style.transform =
        `scale(${zoomLevel})`;

}


function zoomIn() {

    if (zoomLevel < 1.8) {

        zoomLevel += 0.1;

        updateZoom();

    }

}


function zoomOut() {

    if (zoomLevel > 0.7) {

        zoomLevel -= 0.1;

        updateZoom();

    }

}


/* ==========================================
   PANTALLA COMPLETA
========================================== */

function toggleFullscreen() {

    const reader =
        document.querySelector(".reader-section");


    if (!document.fullscreenElement) {

        reader.requestFullscreen()
            .catch(error => {

                console.log(
                    "No se pudo activar pantalla completa:",
                    error
                );

            });

    } else {

        document.exitFullscreen();

    }

}


/* ==========================================
   EVENTOS
========================================== */

nextBtn.addEventListener(
    "click",
    nextPage
);

nextSmallBtn.addEventListener(
    "click",
    nextPage
);


prevBtn.addEventListener(
    "click",
    previousPage
);

prevSmallBtn.addEventListener(
    "click",
    previousPage
);


firstBtn.addEventListener(
    "click",
    firstPage
);


lastBtn.addEventListener(
    "click",
    lastPage
);


zoomInBtn.addEventListener(
    "click",
    zoomIn
);


zoomOutBtn.addEventListener(
    "click",
    zoomOut
);


fullscreenBtn.addEventListener(
    "click",
    toggleFullscreen
);


/* ==========================================
   TECLADO
========================================== */

document.addEventListener(
    "keydown",
    event => {

        switch (event.key) {

            case "ArrowRight":

                nextPage();

                break;


            case "ArrowLeft":

                previousPage();

                break;


            case "Home":

                firstPage();

                break;


            case "End":

                lastPage();

                break;


            case "+":

                zoomIn();

                break;


            case "-":

                zoomOut();

                break;

        }

    }
);


/* ==========================================
   DESLIZAR EN CELULAR
========================================== */

let touchStartX = 0;

let touchEndX = 0;


book.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


book.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /* Deslizamiento hacia la izquierda */

    if (difference > 50) {

        nextPage();

    }


    /* Deslizamiento hacia la derecha */

    if (difference < -50) {

        previousPage();

    }

}


/* ==========================================
   INICIAR
========================================== */

function initializeMagazine() {

    createPages();

    createThumbnails();


    /* Leer página desde URL */

    const hash =
        window.location.hash;


    const match =
        hash.match(/pagina-(\d+)/);


    let initialPage = 1;


    if (match) {

        const page =
            parseInt(match[1]);


        if (
            page >= 1 &&
            page <= TOTAL_PAGES
        ) {

            initialPage = page;

        }

    }


    showPage(initialPage);

}


/* ==========================================
   EJECUTAR
========================================== */

initializeMagazine();
