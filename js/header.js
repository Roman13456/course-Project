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
const busketCounter = document.querySelector(".busketCounter")

function init() {
    const counter = JSON.parse(localStorage.getItem("userChosenProducts"))
    const busketCounter = document.querySelector(".busketCounter")
    if (counter === null) {
        busketCounter.innerHTML = 0
    } else {
        busketCounter.innerHTML = counter.length
    }
    showCatalogBtn();
}
let userChosenProducts = [];
getFromStorage();
function calcGeneralPrice() {
    const sum = userChosenProducts.reduce((sum, current) => sum + current.price, 0)
    busketMenu.querySelector(".total").innerHTML = `$${sum}`
}
calcGeneralPrice()
busketMenu.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("addition") || target.classList.contains("removeItem") || target.classList.contains("deduction")) {
        const parent = target.closest("li");
        const id = parent.getAttribute("data-id");
        const index = userChosenProducts.findIndex((e) => e.id === id);
        if (target.classList.contains("removeItem")) {
            parent.remove();
            userChosenProducts.splice(index, 1);
            updateStorage();
            const counter = JSON.parse(localStorage.getItem("userChosenProducts"));
            const busketCounter = document.querySelector(".busketCounter");
            if (counter === null) {
                busketCounter.innerHTML = 0;
            } else {
                busketCounter.innerHTML = counter.length;
            }
            calcGeneralPrice()
        }
        if (target.classList.contains("addition")) {
            let quantity = parent.querySelector(".counter p").innerHTML
            quantity++
            parent.querySelector(".counter p").innerHTML = quantity
            userChosenProducts[index].quantity = quantity
            userChosenProducts[index].price = userChosenProducts[index].priceForItem * quantity
            parent.querySelector(".price").innerHTML = `$${userChosenProducts[index].price}`
            updateStorage()
            calcGeneralPrice()
        }
        if (target.classList.contains("deduction")) {
            if (+parent.querySelector(".counter p").innerHTML !== 1) {
                let quantity = parent.querySelector(".counter p").innerHTML
                quantity--
                parent.querySelector(".counter p").innerHTML = quantity
                userChosenProducts[index].quantity = quantity
                userChosenProducts[index].price = userChosenProducts[index].priceForItem * quantity
                parent.querySelector(".price").innerHTML = `$${userChosenProducts[index].price}`
                updateStorage()
                calcGeneralPrice()
            }
        }
    }
});
function updateStorage() {
    localStorage.setItem(
        "userChosenProducts",
        JSON.stringify(userChosenProducts)
    );
}
function getFromStorage() {
    if (localStorage.getItem("userChosenProducts") !== null) {
        userChosenProducts = JSON.parse(localStorage.getItem("userChosenProducts"));
    }
}
function createChosenProductFromStorage(element) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                const productArray = httpRequest.response
                const index = productArray.findIndex((e) => {
                    return e.id === element.id
                })
                busketMenu.querySelector("ul").insertAdjacentHTML(
                    "beforeend",
                    `
        <li data-id='${element.id}' class="col-12 d-flex align-items-center justify-content-between">
            <div class="wrapper align-items-center d-flex">
                <img src="${productArray[index].imgsGallery[0]}">
                <p class="mb-0">${element.productName}</p>
            </div>
            <div class="wrapper d-flex align-items-center">
                <div class="counter d-flex align-items-center">
                    <button class='deduction'><div class='deduction'></div></button>
                    <p class=" mb-0">${element.quantity}</p>
                    <button class='addition'><div class='addition'></div></button>
                </div>
                <div class="d-flex align-items-center">
                    <p class="mb-0 price">$${element.price}</p>
                    <button class='removeItem'><img class='removeItem' src="images/Remove.svg" alt="remove item"></button>
                </div>
            </div>
            
        </li>`
                )
            }
        } else {
            console.log("not ready yet");
        }
    }
    httpRequest.open("GET", "https://62d575ef15ad24cbf2c7a034.mockapi.io/products")
    httpRequest.responseType = "json"
    httpRequest.send()
    // console.log(index)
}
userChosenProducts.forEach(createChosenProductFromStorage);
searchInput.closest("div").addEventListener("focusout",function(){
    setTimeout(()=>{
        document.querySelector('.searchOptions').classList.remove("borders")
        document.querySelector('.searchOptions').innerHTML = ''
    },150)

})
searchInput.addEventListener("focusin",function(){
    searchTimeout(500)
})
function showInput() {
    headerLogo.classList.add("hide");
    const str = `display:block!important;`;
    searchInput.style = str;
    busketBtn.querySelector("p").style = "display:none";
    busketBtn.querySelector("img").setAttribute("src", "images/Close.svg");
}
function hideInput() {
    document.querySelector('.searchOptions').classList.remove("borders")
    document.querySelector('.searchOptions').innerHTML = ''
    searchInput.value = ''
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
    const innerContent = catalogBtn.innerHTML
    if (window.innerWidth < 768) {
        catalogBtn.remove();
        lowerCatalogBtnContainer.insertAdjacentHTML(
            "afterbegin",
            `<button ${content}>${innerContent}</button>`
        );
    } else {
        usualCatalogBtnContainer.insertAdjacentHTML(
            "afterbegin",
            `<button ${content}>${innerContent}</button>`
        );
    }
}
init();
function removeCloseMenuBtnDuringResize(status, menu, str) {
    if (status === 1) {
        if (menu.querySelector(`.${str}`) !== null) {
            menu.querySelector(`.${str}`).parentElement.remove();
        }
    }
}
function addCloseMenuBtnDuringResize(status, menu, str, heading) {
    if (status === 1) {
        if (menu.querySelector(`.${str}`) === null) {
            menu.insertAdjacentHTML(
                "afterbegin",
                `<div class="d-flex justify-content-between align-items-center mb-3">
        <p class="mb-0 phoneHeading">${heading}</p>
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
        removeCloseMenuBtnDuringResize(status, menuHover, "closeCatalogBtn");
        removeCloseMenuBtnDuringResize(status1, busketMenu, "closeBusketBtn");
        hideInput();
    } else {
        addCloseMenuBtnDuringResize(status, menuHover, "closeCatalogBtn",'Catalog');
        addCloseMenuBtnDuringResize(status1, busketMenu, "closeBusketBtn",'Cart');
    }
});
searchBtn.addEventListener("click", function () {
    if (window.innerWidth > 767) {
        console.log("search"); //провести пошук
    } else if (headerLogo.classList.contains("hide")) {
        console.log("search"); //провести пошук
    } else if (window.innerWidth < 768) {
        showInput();
        this.setAttribute("data-width",window.innerWidth)
    }
});
busketBtn.addEventListener("click", function () {
    const status = +menuHover.getAttribute("data-id");
    const status1 = +busketMenu.getAttribute("data-id");
    if (!headerLogo.classList.contains("hide")) {
        console.log("show busket"); //показати корзину
            // console.log(searchInput.getAttribute('style'))
            // if(searchInput)
            if (window.innerWidth > 767) {
                busketBtn.classList.toggle("on");
                setCatalogTablet(status1, busketMenu, "closeBusketBtn");
            } else {
                setMenuPhone(status1, busketMenu, "closeBusketBtn",'Cart');
            }
        } 
        // else if (e.target.classList.contains(`closeBusketBtn`)) {
        //     setMenuPhone(status1, busketMenu, "closeBusketBtn");
        // }
    else {
        searchInput.classList.remove("error")
        searchInput.setAttribute("placeholder",'Search....')
        hideInput();
    }
});
function setCatalogTablet(status, menu) {
    if (status === 0) {
        
        // if(searchInput.getAttribute("style.display")==="block")
        menu.setAttribute("data-id", "1");
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
        menu.setAttribute("data-id", "0");
    }
}
function setMenuPhone(status, menu, str,heading) {
    if (status === 0) {
        // console.log(searchInput.getAttribute("style"))
        menu.setAttribute("data-id", "1");
        menu.style.display = "block";
        menu.insertAdjacentHTML(
            "afterbegin",
            `<div class="d-flex justify-content-between align-items-center mb-3">
        <p class="mb-0 phoneHeading">${heading}</p>
        <button class='${str}'  type="button"><img  class='${str}' src="images/Close.svg" alt="close catalog"></button>
    </div>`
        );
    } else {
        menu.querySelector(`.${str}`).parentElement.remove();
        menu.setAttribute("data-id", "0");
        menu.style.display = "none";
    }
}
// const spaceRegex = /\s+/g
let timeoutIndex = ''
let searchString = ''
function searchTimeout(time){
    if(timeoutIndex===''){
        console.log('init search...')
        searchString = searchInput.value.trim().toLowerCase()
        timeoutIndex = setTimeout(searching,time)
    }else{
        searchString = searchInput.value.trim().toLowerCase()
        console.log('terminate search...')
    }
}
searchInput.addEventListener("input", function () {
    searchTimeout(500)
})
function searching(){
    const searchValue = searchInput.value.trim().toLowerCase()
    const parent = searchInput.closest('div')
    parent.querySelector('.searchOptions').innerHTML = ""
    if (searchValue !== "") {
        if (searchInput.classList.contains("error")) {
            searchInput.classList.remove("error")
        }
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products?name='+searchValue)
            .then((data)=>data.json())
            .then((res)=>{
                if(res.length!==0){
                    parent.querySelector('.searchOptions').classList.add("borders")
                    res.slice(0, 4).forEach((e) => {
                        parent.querySelector('.searchOptions').insertAdjacentHTML('beforeend', `
                            <p class='d-block option' >${e.name}</p>
                        `)
                    })
                    localStorage.setItem("searchStringValue", searchValue)
                    parent.querySelectorAll('.option').forEach((e) => {
                        e.addEventListener("click", function () {
                            localStorage.setItem("searchStringValue", this.innerHTML)
                            searchInput.value = this.innerHTML
                            searchBtnSubmit()
                        })
                    })
                }else{
                    parent.querySelector('.searchOptions').classList.remove("borders")
                }
                if(searchValue!==searchString){
                    searchTimeout(500)
                }
            })
    }else{
        parent.querySelector('.searchOptions').classList.remove("borders")
    }
    timeoutIndex = ''
    console.log('data sent')
}
function searchBtnSubmit(){
    if(searchBtn.getAttribute("data-width")==null){
        const searchValue = searchInput.value.trim();
        let bool = true;
        if (searchValue === "") {
            searchInput.classList.add("error")
            searchInput.setAttribute("placeholder", 'search field is empty')
            bool = false;
        } else {
            if (searchInput.classList.contains("error")) {
                searchInput.classList.remove("error")
            }
        }
        if (bool) {
            localStorage.setItem("currentCategory", 'search')
            window.open('category.html', '_self')
        }
    }else{
        searchBtn.removeAttribute("data-width")
    }
}
searchBtn.addEventListener("click", function (e) {
    e.preventDefault()
    searchBtnSubmit()
})
header.addEventListener("click", function (e) {
    const status = +menuHover.getAttribute("data-id");
    const status1 = +busketMenu.getAttribute("data-id");
    if (e.target.getAttribute("id") === "catalogBtn") {
        if (window.innerWidth > 767) {
            setCatalogTablet(status, menuHover, "closeCatalogBtn");
        } else {
            setMenuPhone(status, menuHover, "closeCatalogBtn", 'Catalog');
        }
        const categoriesList = document.querySelector(".categoriesList")
        console.log(categoriesList)
        if (categoriesList !== null) {
            categoriesList.addEventListener("click", function (e) {
                console.log(e.target)
                if (e.target.tagName = 'A') {
                    console.log(e.target)
                    localStorage.setItem("currentCategory", e.target.closest("div").querySelector('a').getAttribute("data-info"))
                }
            })
        }

    } else if (e.target.classList.contains(`closeCatalogBtn`)) {
        setMenuPhone(status, menuHover, "closeCatalogBtn",'Catalog');
    }
    if (e.target.classList.contains(`closeBusketBtn`)) {
            setMenuPhone(status1, busketMenu, "closeBusketBtn",'Cart');
    }
    // if (
    //     e.target.classList.contains("busket") ||
    //     e.target.classList.contains("busketImg")
    // ) {
    //     // console.log(searchInput.getAttribute('style'))
    //     // if(searchInput)
    //     if (window.innerWidth > 767) {
    //         busketBtn.classList.toggle("on");
    //         setCatalogTablet(status1, busketMenu, "closeBusketBtn");
    //     } else {
    //         setMenuPhone(status1, busketMenu, "closeBusketBtn");
    //     }
    // } else if (e.target.classList.contains(`closeBusketBtn`)) {
    //     setMenuPhone(status1, busketMenu, "closeBusketBtn");
    // }
}
);
