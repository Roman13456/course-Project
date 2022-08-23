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
// console.log(newWidth)
let marginRight = 0
let marginLeft = 0
function duringResize() {
    start = sortByPricePanel.getBoundingClientRect().left
    width = sortByPricePanel.offsetWidth
}
window.addEventListener("resize", duringResize)
function setMinAndMaxPrice(array) {
    const sortedBubble = array.sort((a, b) => a.price - b.price)
    maxPrice = sortedBubble[sortedBubble.length - 1].price
    minPrice = sortedBubble[0].price
    minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${Math.round(minPrice)}`
    minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice * maxPriceCoef)}`
    priceArr.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            priceArr[index] = `+e.price < ${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`
        }
    })
    priceArr.filter((e, index) => {
        if (e.indexOf(">") !== -1) {
            priceArr[index] = `+e.price > ${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`
        }
    })
    allAtOnce.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
}
function sortAndSetPrice(array, bool) {
    console.log(array)
    if (array !== undefined) {
        array.forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
    }
    if (bool === true) {
        const sortedBubble = array.sort((a, b) => a.price - b.price)
        maxPrice = sortedBubble[sortedBubble.length - 1].price
        minPrice = sortedBubble[0].price
        minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${Math.round(minPrice)}`
        minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice)}`
        if (priceArr.length === 0) {
            priceArr.push(`+e.price >= ${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`)
            priceArr.push(`+e.price <= ${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`)
            allAtOnce.push(`(${priceArr.join(" || ")})`)
        } else {
            priceArr.filter((e, index) => {
                if (e.indexOf("<") !== -1) {
                    priceArr[index] = `+e.price < ${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`
                }
            })
            priceArr.filter((e, index) => {
                if (e.indexOf(">") !== -1) {
                    priceArr[index] = `+e.price > ${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`
                }
            })
            allAtOnce.filter((e, index) => {
                if (e.indexOf("<") !== -1) {
                    allAtOnce[index] = `(${priceArr.join(" && ")})`
                }
            })
        }
    }
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
let colorArr = []
let size = ""
let sizeArr = []
let price = ""
let priceArr = []
let allAtOnce = []
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
const httpRequest = new XMLHttpRequest();
function renderCategory() {
    const status = localStorage.getItem("status")
    const category = localStorage.getItem("currentCategory");
    const categoryName = document.querySelector('.categoryName')
    if (localStorage.getItem('currentCategory') !== 'search') {
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products?category=' + category)
            .then((data) => data.json())
            .then((products) => {
                productsArray = products
                sortedArray = products
                categoryName.innerHTML = category.charAt(0).toUpperCase() + category.slice(1)
                sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
                const array = sortByOptions(products)
                paginationArr = pagination(array)
                sortAndSetPrice(paginationArr[0], true)
            })
    } else {
        const searchValue = localStorage.getItem('searchStringValue')
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products?name='+searchValue)
            .then((data) => data.json())
            .then((products) => {
                sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
                const array = sortByOptions(products)
                if (localStorage.getItem('searchStringValue') !== "") {
                    searchInput.value = localStorage.getItem('searchStringValue')
                }
                productsArray = array
                sortedArray = array
                beforeAnySortingArray = [...productsArray]
                paginationArr = pagination(productsArray)
                sortAndSetPrice(paginationArr[0], true)
                const productsList = document.querySelector(".productsList")
                categoryName.innerHTML = 'Search'
                productsList.insertAdjacentHTML("afterbegin", `
                        <p class='searchResults'>Search results: ${beforeAnySortingArray.length}</p>
                    `)
            })
    }
}
renderCategory()
setListenersOnLinks()
// httpRequest.onreadystatechange = () => {
//     if (httpRequest.readyState === 4) {
//         if (httpRequest.status === 200) {
//             productsArray = httpRequest.response
//             sortedArray = productsArray
//             const category = localStorage.getItem("currentCategory")
//             const status = localStorage.getItem("status")
//             const categoryName = document.querySelector('.categoryName')
//             if (status !== 'search') {
//                 sortedArray = sortedArray.filter((e) => e.category === category)
//                 beforeAnySortingArray = [...sortedArray]
//                 categoryName.innerHTML = category.charAt(0).toUpperCase() + category.slice(1)
//                 sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
//                 sortByOptions(sortedArray)
//                 paginationArr = pagination(sortedArray)
//                 sortAndSetPrice(paginationArr[0], "min", "max")
//                 if (localStorage.getItem('searchStringValue') !== "") {
//                     searchInput.value = localStorage.getItem('searchStringValue')
//                 }
//             } else {
//                 localStorage.removeItem("status")
//                 const conditionString = localStorage.getItem("searchString")
//                 if (localStorage.getItem('searchStringValue') !== "") {
//                     searchInput.value = localStorage.getItem('searchStringValue')
//                 }
//                 sortedArray = productsArray.filter((e) => eval(conditionString))
//                 beforeAnySortingArray = [...sortedArray]
//                 sortBy.value !== '' ? localStorage.setItem('sortedBy', sortBy.value) : console.log('empty')
//                 sortByOptions(sortedArray)
//                 paginationArr = pagination(sortedArray)
//                 sortAndSetPrice(paginationArr[0], "min", "max")
//                 const productsList = document.querySelector(".productsList")
//                 categoryName.innerHTML = 'Search'
//                 productsList.insertAdjacentHTML("afterbegin", `
//                         <p class='searchResults'>Search results: ${beforeAnySortingArray.length}</p>
//                     `)
//             }
//             setListenersOnLinks()
//             // const productsHomePage = document.querySelectorAll(".productsOnHomepage")
//             // productsHomePage.forEach((e)=>{
//             //     e.addEventListener("click",function(e){
//             //         if(e.target.tagName === "A"){
//             //             localStorage.setItem("currentItem",e.target.parentElement.getAttribute("data-id"))

//             //         }else if(e.target.tagName === "IMG"){
//             //             localStorage.setItem("currentItem",e.target.parentElement.parentElement.getAttribute("data-id"))
//             //         }
//             //     })
//             // })

//         }
//     }
// };


httpRequest.open("GET", "https://62d575ef15ad24cbf2c7a034.mockapi.io/products")
httpRequest.responseType = "json"
httpRequest.send()


function clearEmptySpaces(array) {
    let localArr = array
    return localArr.filter((e) => e !== "()")
}
function sort(str, array) {
    array.filter((e) => {
        if (str === "") {
            console.log("all")
            sortedArray.push(e)
        } else if (eval(str)) {
            console.log(`${str}`)
            sortedArray.push(e)
        }
    })
    const results = document.querySelector(".searchResults")
    if (results !== null) {
        results.innerHTML = `Search results: ${sortedArray.length}`
    }

}
// function sortUniversal(child,arr,str){
//     let array = arr
//     if (child.getAttribute("checked") === null) {
//         array = array.filter((e) => e !== str)
//         allAtOnce.filter((e,index)=>{
//             if(e.indexOf(str)!==-1){
//                 allAtOnce[index] = `(${array.join(" || ")})`
//             }
//         })
//         allAtOnce = clearEmptySpaces(allAtOnce)
//         return array
//     } else {
//         array.push(str)
//         allAtOnce.filter((e,index)=>{
//             if(e.indexOf(`${str}`)!==-1){
//                 allAtOnce.splice(index,1)
//             }
//         })
//         allAtOnce.push(`(${array.join(" || ")})`)
//         allAtOnce = clearEmptySpaces(allAtOnce)
//         return array
//     }
// }
let filterOption = ''
let filterValue = ''
function dotsWidgetDuringChange(){
    if(filterOption!==""){
        console.log(priceArr.join(' && ')+` && e.${filterOption}`)
        sortedArray = productsArray.filter((e)=>eval(priceArr.join(' && ')))
        sortedArray = checkIfElementContainsOption(sortedArray,filterOption,filterValue)
    }else{
        sortedArray = productsArray.filter((e)=>eval(priceArr.join(' && ')))
    }
    if(document.querySelector('.searchResults')!==null){
        document.querySelector('.searchResults').innerHTML = `Search results: ${sortedArray.length}`
    }
    optionsAfterProcedure(sortedArray)
}
dots[1].addEventListener("drag", function (e) {
    e.preventDefault()
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
    e.preventDefault()
    price = `+e.price <= ${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            priceArr[index] = price
        }
    })
    allAtOnce.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    dotsWidgetDuringChange()
})
dots[1].addEventListener("touchend", () => {
    price = `+e.price <= ${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            priceArr[index] = price
        }
    })
    allAtOnce.filter((e, index) => {
        if (e.indexOf("<") !== -1) {
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    dotsWidgetDuringChange()
    // allAtOnce = clearEmptySpaces(allAtOnce)
    
})
dots[0].addEventListener("dragend", (e) => {
    e.preventDefault()
    price = `+e.price >= ${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf(">") !== -1) {
            priceArr[index] = price
        }
    })
    allAtOnce.filter((e, index) => {
        if (e.indexOf(">") !== -1) {
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    dotsWidgetDuringChange()
})
dots[0].addEventListener("touchend", () => {
    price = `+e.price >= ${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf(">") !== -1) {
            priceArr[index] = price
        }
    })
    allAtOnce.filter((e, index) => {
        if (e.indexOf(">") !== -1) {
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    dotsWidgetDuringChange()
})
dots[0].addEventListener("drag", (e) => {
    e.preventDefault()
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
        sortedArray = productsArray
        filterOption = ""
        filterValue = ""
    }else{
        sortedArray = checkIfElementContainsOption(productsArray,option,val)
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
            filterProducts('')
        }else{
            const child = e.target.getAttribute("id")
            filterProducts(`color=${child}`,"color",child)
            e.target.classList.add("checked")
        }
    }
})
// let data = new Date('Thu Aug 18 2022 13:04:13 GMT+0300').getTime()
// let dateArr =[]
// function randomDate(){
//     for(let i= 0; i<64;i++){
//         data+=86400000
//         dateArr.push(new Date(data))
//     }
// }
// function generateArray(){
//     let newProductsArray = productsArray.map((e,index)=>{
//         // e.date = dateArr[index]
//         e.rating = 0
//         return e
//     })
//     console.log(JSON.stringify(newProductsArray))
// }

function optionsAfterProcedure(array) {
    // sortedArray = []
    // sort(allAtOnce.join(" && "), beforeAnySortingArray)
    // sortByOptions("extra")
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    paginationArr = pagination(array)
    sortAndSetPrice(paginationArr[0])
    setListenersOnLinks()
}
sizeOption.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        if(e.target.classList.contains('checked')){
            e.target.classList.remove('checked')
            filterProducts('')
        }else{
            const child = e.target.getAttribute("id")
            filterProducts(`size=${child}`,"size",`size${child}`)
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
// var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'].splice(2);
function pagination(array) {
    let changableArray = [...array]
    let paginatedArray = []
    function addBtns() {
        for (let i = 0; i < Math.ceil(array.length / 9); i++) {
            paginatedArray.push(changableArray.slice(0, 9))
            changableArray.splice(0, 9)
            if (i === 0) {
                paginationNav.querySelector(".paginateNextBtn").insertAdjacentHTML("beforebegin", `
                <button class="paginateBtn active" data-id='${i}'>${i + 1}</button>
            `)
            } else {
                paginationNav.querySelector(".paginateNextBtn").insertAdjacentHTML("beforebegin", `
                <button class="paginateBtn" data-id='${i}'>${i + 1}</button>
                `)
            }
        }
    }
    if (paginationNav.querySelectorAll(".paginateBtn").length === 0) {
        addBtns()
    } else {
        paginationNav.querySelectorAll(".paginateBtn").forEach((e) => e.remove())
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
    } else {
        paginationBtns[0].classList.add("active")
        paginationArr[0].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
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
    } else {
        paginationBtns[paginationBtns.length - 1].classList.add("active")
        paginationArr[paginationBtns.length - 1].forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval'), 4, 4))
    }
})
sortBy.addEventListener('change', function () {
    localStorage.setItem('sortedBy', this.value)
    sortByOptions(sortedArray,true)
})
function sortByOptions(array, bool) {
    let localArray = array
    if (localStorage.getItem('sortedBy') !== null) {
        const option = localStorage.getItem('sortedBy')
        if (option === 'rating') {
            localArray = localArray.sort((a, b) => b.rating - a.rating)
        } else if (option === 'newest') {
            localArray = localArray.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        } else if (option === "onSale") {
            localArray = localArray.sort((a, b) => {
                if (a.isSale - b.isSale === 1) {
                    return -1
                } else if (a.isSale - b.isSale === -1) {
                    return 1
                } else {
                    return 0
                }
            })
        }
        if (bool !== undefined) {
            clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
            paginationArr = pagination(localArray)
            sortAndSetPrice(paginationArr[0])
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





















