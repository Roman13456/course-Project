const sortPanel = document.querySelector(".sortPanel")
const sortPanelParametersArray = sortPanel.querySelectorAll("input")
const colorOption = document.querySelector(".colorOption")
const sizeOption = document.querySelector(".sizeOption")
const priceOption = document.querySelector(".priceOption")
const fill = document.querySelector(".fill")
const shaft = document.querySelector(".shaft")
const sortByPricePanel = document.querySelector(".sortByPricePanel")
const dots = document.querySelectorAll(".dot")
const minAndMaxPrice = document.querySelector(".minAndMaxPrice")
const sortBy = document.querySelector('.sortBy')
let start = sortByPricePanel.getBoundingClientRect().left
let width = sortByPricePanel.offsetWidth
let newWidth
let coord
let dot1Loc = dots[0].getBoundingClientRect().left + 40
let dot2Loc = dots[1].getBoundingClientRect().left - 40
let maxPriceCoef = 1
let minPriceCoef = 0.1
let maxPrice
let minPrice
let marginRight = 0
let marginLeft = 0
function duringResize() {
    start = sortByPricePanel.getBoundingClientRect().left
    width = sortByPricePanel.offsetWidth
}
function showQuantityOfOptions(arr,bool){
    const options = Array.from(document.querySelectorAll('.buttons button')) 
    const {prop1, prop2} = {
        prop1:filterOption,
        prop2:filterValue
    }
    for(let i = 0; i<options.length; i++){
        const value = options[i].querySelector('p').innerHTML.trim().toLowerCase()
        console.log(arr,options[i].getAttribute('data-option'),value)
        options[i].querySelector('.optionsAvailable').innerHTML = checkIfElementContainsOption(arr,options[i].getAttribute('data-option'),value).length 
    }
    if(bool===undefined){
        filterOption = ''
        filterValue = ''
    } else{
        filterOption = prop1
        filterValue = prop2
    }
}
window.addEventListener("resize", duringResize)
let priceObj = {
    min:0,
    max:0
}
function renderPage(array){
    array.forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
}
function setPrice(array) {
        const sortedBubble = array.sort((a, b) => a.price - b.price)
        maxPrice = sortedBubble[sortedBubble.length - 1].price
        minPrice = sortedBubble[0].price
        priceObj.min = +minPrice
        priceObj.max = +maxPrice
        minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${Math.round(minPrice)}`
        minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice)}`
}
function widthElement(element, coord, order) {
    if (order === "second") {
        if (coord > dot1Loc) {
            if (coord > start + width) {
                maxPriceCoef = 1
                dot2Loc = start + width - 40
            } else {
                dot2Loc = coord - 40
                const localCoef = minPrice / maxPrice
                maxPriceCoef = ((coord - start) / (+(width) + (+width * localCoef))) + localCoef
                const percent = (1 - (minPrice / maxPrice))
                const cut = localCoef * width / percent
                maxPriceCoef = (coord - start + (+cut)) / (width + (+cut))
            }
            marginRight = (width + start - coord) * 100 / width
        }
    } else {
        if (coord < dot2Loc) {
            if (coord - start < 0) {
                dot1Loc = start + 40
            } else {
                dot1Loc = coord + 40
                const percent = (1 - (minPrice / maxPrice))
                const localCoef = minPrice / maxPrice
                const cut = localCoef * width / percent
                console.log(localCoef)
                // minPriceCoef = ((coord - start) / (+(width)+(+width*localCoef)))+localCoef
                minPriceCoef = (coord - start + (+cut)) / (width + (+cut))
            }
            marginLeft = (coord - start) * 100 / width
        }
    }
    if (marginRight < 0) {
        marginRight = 0
    }
    if (marginLeft < 0) {
        marginLeft = 0
    }
    newWidth = 100 - marginLeft - marginRight
    element.style.maxWidth = `${newWidth}%`
    element.style.marginRight = `${marginRight}%`
    element.style.marginLeft = `${marginLeft}%`
}
let color = ""
let size = ""
let price = ""
let productsArray
let sortedArray = []
let beforeAnySortingArray = []
let paginationArr = []
const paginationNav = document.querySelector(".pagination")
let paginationBtns = []
const paginatePrevBtn = document.querySelector(".paginatePrevBtn")
const paginateNextBtn = document.querySelector(".paginateNextBtn")
const productsOnHomepage = document.querySelector(".productsOnHomepage")
function parseArray(arr) {//стягнув з інтернету. Не використовується
    let newArray = []
    arr.filter((element) => {
        if (Array.isArray(element)) {
            newArray = [...newArray, ...parseArray(element)]
        } else {
            newArray.push(element)
        }
    })
    return newArray
}
const makeUniq2 = (arr) => {//Не використовується
    const uniqSet = new Set(arr);
    return [...uniqSet];
}
const makeUniq = (arr) => {//стягнув з інета, доволі хороший метод для видалення 'повторок'. . Не використовується
    const seen = {};
    const result = [];
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i].id
        const obj = arr[i]
        const itemType = typeof item;
        const key = `${itemType}_${item}`;
        if (!seen[key]) {
            seen[key] = 1;
            result[j++] = obj;
        }
    }
    return result;
};
function renderCategory() {
    // const status = localStorage.getItem("status")
    const category = localStorage.getItem("currentCategory");
    const categoryName = document.querySelector('.categoryName')
    if (localStorage.getItem('currentCategory') !== 'search') {
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products?category=' + category)
            .then((data) => data.json())
            .then((products) => {
                showQuantityOfOptions(products)
                productsArray = products
                sortedArray = products
                categoryName.innerHTML = category.charAt(0).toUpperCase() + category.slice(1)
                sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
                const array = sortByOptions(products)
                paginationArr = pagination(array)
                setPrice(array)
                renderPage(paginationArr[0])
            })
    } else {
        const searchValue = localStorage.getItem('searchStringValue')
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products?name='+searchValue)
            .then((data) => data.json())
            .then((products) => {
                showQuantityOfOptions(products)
                sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
                const array = sortByOptions(products)
                if (localStorage.getItem('searchStringValue') !== "") {
                    searchInput.value = localStorage.getItem('searchStringValue')
                }
                productsArray = array
                sortedArray = array
                paginationArr = pagination(productsArray)
                setPrice(array)
                renderPage(paginationArr[0])
                const productsList = document.querySelector(".productsList")
                categoryName.innerHTML = 'Search'
                productsList.insertAdjacentHTML("afterbegin", `
                        <p class='searchResults'>Search results: ${productsArray.length}</p>
                    `)
            })
    }
}
renderCategory()
setListenersOnLinks()
let filterOption = ''
let filterValue = ''
function changePrice(str){
    price = minAndMaxPrice.querySelector(`.${str}Price`).innerHTML.replace("$", "")
    priceObj[str] = +price
    sortedArray = filterByPrice(productsArray)
    dotsWidgetDuringChange()
}
function filterByPrice(array){
    return array.filter((e)=>e.price>=priceObj.min && e.price<=priceObj.max)
}
function dotsWidgetDuringChange(){
    if(filterOption!==""){
        showQuantityOfOptions(sortedArray,true)
        sortedArray = checkIfElementContainsOption(sortedArray,filterOption,filterValue)
    }else{
        showQuantityOfOptions(sortedArray,true)
    }
    if(document.querySelector('.searchResults')!==null){
        document.querySelector('.searchResults').innerHTML = `Search results: ${sortedArray.length}`
    }
    optionsAfterProcedure(sortedArray)
}
dots[1].addEventListener("drag", function (e) {
    coord = (() => {
        if (e.pageX !== 0) {
            return e.pageX
        } else {
            return coord
        }
    })()
    widthElement(fill, coord, "second")
    minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice * maxPriceCoef)}`
})
dots[1].addEventListener("touchmove", function (e) {
    coord = e.touches[0].clientX;
    widthElement(fill, coord, "second")
    minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice * maxPriceCoef)}`
})
dots[1].addEventListener("dragend", (e) => {
    changePrice("max")
})
dots[1].addEventListener("touchend", () => {
    changePrice("max")
})
dots[0].addEventListener("dragend", (e) => {
    changePrice("min")
})
dots[0].addEventListener("touchend", () => {
    changePrice("min")
})
dots[0].addEventListener("drag", (e) => {
    coord = (() => {
        if (e.pageX !== 0) {
            return e.pageX
        } else {
            return coord
        }
    })()
    widthElement(fill, coord, "first")
    minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${(() => {
        if (coord < start) {
            return `${Math.round(minPrice)}`
        } else {
            return Math.round(maxPrice * minPriceCoef)
        }
    })()}`
})
dots[0].addEventListener("touchmove", (e) => {
    coord = e.touches[0].clientX;
    widthElement(fill, coord, "first")
    minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${(() => {
        if (coord < start) {
            return `${Math.round(minPrice)}`
        } else {
            return Math.round(maxPrice * minPriceCoef)
        }
    })()}`
})
function checkIfElementContainsOption(array0,option,val){
    return array0.filter((e)=>{
        if(e[option].find((b)=>b===val)!==undefined){
            filterOption = option
            filterValue = val
            return true
        }else{
            return false
        }
    })
}
function filterProducts(data,option,val) {
    document.querySelectorAll('.buttons button').forEach((b)=>b.classList.remove('checked'))
    if(data===''){
        sortedArray = productsArray.filter((e)=>e.price>=priceObj.min && e.price<=priceObj.max)
        filterOption = ""
        filterValue = ""
    }else{
        sortedArray = checkIfElementContainsOption(productsArray.filter((e)=>e.price>=priceObj.min && e.price<=priceObj.max),option,val)
    }
    if(document.querySelector('.searchResults')!==null){
        document.querySelector('.searchResults').innerHTML = `Search results: ${sortedArray.length}`
    }
    optionsAfterProcedure(sortedArray)
}
colorOption.addEventListener("click", function (e) {
    // inputListener(target)
    if (e.target.tagName === "BUTTON") {
        if(e.target.classList.contains('checked')){
            e.target.classList.remove('checked')
            sortedArray = filterByPrice(productsArray)
            filterProducts('')
        }else{
            const child = e.target.getAttribute("id")
            sortedArray = filterByPrice(productsArray)
            filterProducts(`color=${child}`,"color",child)
            e.target.classList.add("checked")
        }
    }
})
function optionsAfterProcedure(array) {
    const arr = sortByOptions(array)
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    paginationArr = pagination(arr)
    renderPage(paginationArr[0])
    setListenersOnLinks()
}
sizeOption.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        if(e.target.classList.contains('checked')){
            e.target.classList.remove('checked')
            sortedArray = filterByPrice(productsArray)
            filterProducts('')
        }else{
            const child = e.target.getAttribute("id")
            sortedArray = filterByPrice(productsArray)
            filterProducts(`size=${child}`,"size",child.toLowerCase())
            e.target.classList.add("checked")
        }
    }
})
function clearPage(removalLoc, loc) {
    removalLoc.remove()
    loc.insertAdjacentHTML("afterbegin", `<div class="forRemoval row"></div>`)
}
const mobileSortBurger = document.querySelector(".mobileSortMenu")
const sortMenu = document.querySelector(".background")
mobileSortBurger.addEventListener("click", function () {
    sortMenu.classList.toggle("visible")
})
let slider
paginationNav.addEventListener('click',(e)=>{
    console.log(e.target.classList.contains('paginateBtn'))
    if(e.target.classList.contains('paginateBtn')){
        const val = e.target.getAttribute('data-id')
        slider.goToSlide(val)
    }
})
const lightSliderContainer = document.querySelector('.lightSliderContainer')
function pagination(array) {
    let changableArray = [...array]
    let paginatedArray = []
    const numberOfIterations = Math.ceil(array.length / 9)
    const val = (function (){
        if(numberOfIterations<3){
            return numberOfIterations
        }else{
            return 3
        }
    })()
    function addBtns() {
        for (let i = 0; i < numberOfIterations; i++) {
            paginatedArray.push(changableArray.slice(0, 9))
            changableArray.splice(0, 9)
            if (i === 0) {
                paginationNav.querySelector(".lightSlider").insertAdjacentHTML("beforeend", `
                <li><button class="paginateBtn active" data-id='${i}'>${i + 1}</button></li>
            `)
            } else {
                paginationNav.querySelector(".lightSlider").insertAdjacentHTML("beforeend", `
                <li><button class="paginateBtn" data-id='${i}'>${i + 1}</button></li>
                `)
            }
        }
        
        // console.log(numberOfIterations*48+(numberOfIterations-1)*10)
        lightSliderContainer.style.width=`${val*48+(val-1)*10}px`
        console.log(numberOfIterations)
  $(document).ready(function() {
    slider = $(".lightSlider").lightSlider({
        item: val,
        slideEndAnimation:false,
        pager:false
    });
  });
    }
    if (paginationNav.querySelectorAll(".paginateBtn").length === 0) {
        addBtns()
    } else {
        paginationNav.querySelectorAll(".lightSlider li").forEach((e) => e.remove())
        addBtns()
    }
    // console.log(Math.ceil(array.length/9))

    paginationBtns = paginationNav.querySelectorAll(".paginateBtn")
    paginationBtns.forEach((e) => {
        e.addEventListener("click", function (b) {
            if (!b.target.classList.contains("active")) {
                paginationBtns.forEach((x) => {
                    x.classList.remove("active")
                })
                b.target.classList.add("active")
                const index = b.target.getAttribute("data-id")
                clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
                paginatedArray[index].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
            }
        })
    })
    return paginatedArray
}
paginateNextBtn.addEventListener("click", function () {
    const activePage = document.querySelector(".paginateBtn.active")
    const index = Array.from(paginationBtns).findIndex((e) => e === activePage)
    activePage.classList.remove("active")
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    if (paginationBtns.length - 1 > index) {
        paginationBtns[index + 1].classList.add("active")
        const prevIndex = +activePage.getAttribute("data-id")
        paginationArr[prevIndex + 1].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
        slider.goToNextSlide()
    } else {
        paginationBtns[0].classList.add("active")
        paginationArr[0].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
        slider.goToSlide(0)
    }
})
paginatePrevBtn.addEventListener("click", function () {
    const activePage = document.querySelector(".paginateBtn.active")
    const index = Array.from(paginationBtns).findIndex((e) => e === activePage)
    activePage.classList.remove("active")
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    if (index > 0) {
        paginationBtns[index - 1].classList.add("active")
        const prevIndex = +activePage.getAttribute("data-id")
        paginationArr[prevIndex - 1].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
        slider.goToPrevSlide()
    } else {
        paginationBtns[paginationBtns.length - 1].classList.add("active")
        paginationArr[paginationBtns.length - 1].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
        slider.goToSlide(paginationBtns.length - 1)
    }
    
})
sortBy.addEventListener('change', function () {
    localStorage.setItem('sortedBy', this.value)
    sortByOptions(sortedArray,true)
})
function sortByOptions(array, bool) {
    // debugger
    let localArray = array
    if (localStorage.getItem('sortedBy') !== null) {
        const option = localStorage.getItem('sortedBy')
        if (option === 'rating') {
            localArray = localArray.sort((a, b) => b.rating - a.rating)
        } else if (option === 'newest') {
            localArray = localArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        }
        else if (option === 'desc') {
            localArray = localArray.sort((a, b) => b.price-a.price)
        }else if (option === 'asc') {
            localArray = localArray.sort((a, b) => a.price-b.price)
        }
        else if (option === "onSale") {
            localArray = localArray.sort((a, b) => b.isSale-a.isSale)
        }
        if (bool !== undefined) {
            clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
            paginationArr = pagination(localArray)
            renderPage(paginationArr[0])
        }
    }
    return localArray
}
































// productsLinks.forEach((e)=>{
    //     e.addEventListener('mouseover',function(){
    //         const price = this.querySelector('.itemPrice')
    //         price.insertAdjacentHTML('afterend',`
    //         <button class='hoverAddToCartButton'>Add to cart</button>
    //         `)
    //         const button = this.querySelector('.hoverAddToCartButton')
    //     })
    //     e.addEventListener('mouseout',function(){
    //         const button = this.querySelector('.hoverAddToCartButton')
    //         button.remove()
    //     })
    // })





















