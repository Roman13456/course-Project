let catalogBtn = document.getElementById("catalogBtn");
const lowerCatalogBtnContainer = document.querySelector(".lowerCatalogBtn");
const usualCatalogBtnContainer = document.querySelector(".inputSearch");
const headerLogo = document.querySelector(".logo");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
const busketBtn = document.querySelector(".busket");
const menuHoverArray = document.querySelectorAll(".menuHover");
const menuHover = menuHoverArray[0];
const busketMenu = menuHoverArray[1];
const header = document.querySelector("header");
function init() {
    showCatalogBtn();
}
function showInput() {
    headerLogo.classList.add("hide");
    const str = `display:block!important;`;
    searchInput.style = str;
    busketBtn.querySelector("p").style = "display:none";
    busketBtn.querySelector("img").setAttribute("src", "images/Close.svg");
}
function hideInput() {
    headerLogo.classList.remove("hide");
    searchInput.removeAttribute("style");
    busketBtn.querySelector("p").removeAttribute("style");
    busketBtn.querySelector("img").setAttribute("src", "images/Cart.svg");
}
function showCatalogBtn() {
    const catalogBtnRegex = /<button(([\w\W])([^><]))*/;
    catalogBtn = document.getElementById("catalogBtn");
    const catalogBtnArr = document.querySelectorAll("#catalogBtn");
    catalogBtnArr.forEach((e) => e.remove());
    const content = catalogBtn.outerHTML.match(catalogBtnRegex)[0].slice(7);
    if (window.innerWidth < 768) {
        catalogBtn.remove();
        lowerCatalogBtnContainer.insertAdjacentHTML(
            "afterbegin",
            `<button ${content}><img src="images/NaviconsCatalog.svg" alt="header catalog">Catalog</button>`
        );
    } else {
        usualCatalogBtnContainer.insertAdjacentHTML(
            "afterbegin",
            `<button ${content}><img src="images/NaviconsCatalog.svg" alt="header catalog">Catalog</button>`
        );
    }
}
init();
function removeCloseMenuBtnDuingResize(status,menu,str){
    if (status === 1) {
        if (menu.querySelector(`.${str}`) !== null) {
            menu.querySelector(`.${str}`).parentElement.remove();
        }
    }
}
function addCloseMenuBtnDuingResize(status,menu,str){
    if (status === 1) {
        if (menu.querySelector(`.${str}`) === null) {
            menu.insertAdjacentHTML(
                "afterbegin",
                `<div class="d-flex justify-content-between align-items-center mb-3">
        <p class="mb-0">Catalog</p>
        <button class='${str}' type="button"><img class='${str}' src="images/Close.svg" alt="close catalog"></button>
    </div>`
            );
        }
    }
}
window.addEventListener("resize", () => {
    showCatalogBtn();
    const status = +menuHover.getAttribute("data-id");
    const status1 = +busketMenu.getAttribute("data-id");
    catalogBtn = document.getElementById("catalogBtn");
    if (window.innerWidth > 767) {
        removeCloseMenuBtnDuingResize(status,menuHover,"closeCatalogBtn")
        removeCloseMenuBtnDuingResize(status1,busketMenu,"closeBusketBtn")
        hideInput();
    } else {
        addCloseMenuBtnDuingResize(status,menuHover,"closeCatalogBtn")
        addCloseMenuBtnDuingResize(status1,busketMenu,"closeBusketBtn")
    }
});
searchBtn.addEventListener("click", function () {
    if (window.innerWidth > 767) {
        console.log("search"); //провести пошук
    } else if (headerLogo.classList.contains("hide")) {
        console.log("search"); //провести пошук
    } else if (window.innerWidth < 768) {
        showInput();
    }
});
busketBtn.addEventListener("click", function () {
    if (!headerLogo.classList.contains("hide")) {
        console.log("show busket"); //показати корзину
    } else {
        hideInput();
    }
});
function setCatalogTablet(status, menu) {
    if (status === 0) {
        menu.setAttribute("data-id", "1");
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
        menu.setAttribute("data-id", "0");
    }
}
function setMenuPhone(status, menu, str) {
    if (status === 0) {
        menu.setAttribute("data-id", "1");
        menu.style.display = "block";
        menu.insertAdjacentHTML(
            "afterbegin",
            `<div class="d-flex justify-content-between align-items-center mb-3">
        <p class="mb-0">Catalog</p>
        <button class='${str}'  type="button"><img  class='${str}' src="images/Close.svg" alt="close catalog"></button>
    </div>`
        );
    } else {
        // console.log(menu,busketMenu)
        menu.querySelector(`.${str}`).parentElement.remove();
        menu.setAttribute("data-id", "0");
        menu.style.display = "none";
    }
}
header.addEventListener("click", function (e) {
    const status = +menuHover.getAttribute("data-id");
    const status1 = +busketMenu.getAttribute("data-id");
    if (e.target.getAttribute("id") === "catalogBtn") {
        if (window.innerWidth > 767) {
            setCatalogTablet(status, menuHover, "closeCatalogBtn");
        } else {
            setMenuPhone(status, menuHover, "closeCatalogBtn");
        }
    } else if (e.target.classList.contains(`closeCatalogBtn`)) {
        setMenuPhone(status, menuHover, "closeCatalogBtn");
    }
    if (
        e.target.classList.contains("busket") ||
        e.target.classList.contains("busketImg")
    ) {
        busketBtn.classList.toggle("on");
        if (window.innerWidth > 767) {
            setCatalogTablet(status1, busketMenu, "closeBusketBtn");
        } else {
            setMenuPhone(status1, busketMenu, "closeBusketBtn");
        }
    } else if (e.target.classList.contains(`closeBusketBtn`)) {
        setMenuPhone(status1, busketMenu, "closeBusketBtn");
    }
});
