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
let start = sortByPricePanel.getBoundingClientRect().left
let width = sortByPricePanel.offsetWidth
let newWidth
let coord
let dot1Loc = dots[0].getBoundingClientRect().left + 40
let dot2Loc = dots[1].getBoundingClientRect().left - 40
let maxPriceCoef = 1
let minPriceCoef = 1
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
function sortAndSetPrice(min, max) {
    sortedArray.forEach(createProductClosure(productsOnHomepage.querySelector('.forRemoval')))
    if (min !== undefined && max !== undefined) {
        const sortedBubble = sortedArray.sort((a, b) => a.price - b.price)
        maxPrice = sortedBubble[sortedBubble.length - 1].price
        minPrice = sortedBubble[0].price
        minAndMaxPrice.querySelector(".minPrice").innerHTML = `$${Math.round(minPrice)}`
        priceArr.push(`e.price > '${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}'`)
        minAndMaxPrice.querySelector(".maxPrice").innerHTML = `$${Math.round(maxPrice * maxPriceCoef)}`
        priceArr.push(`e.price < '${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}'`)
        allAtOnce.push(`(${priceArr.join(" || ")})`)
    }
}
function widthElement(element, coord, order) {
    console.log(element, coord, order)
    if (order === "second") {
        // console.log(dot1Loc,coord)
        if (coord > dot1Loc) {
            if (coord > start + width) {
                maxPriceCoef = 1
            } else {
                maxPriceCoef = (coord - start) / (width)
            }
            marginRight = (width + start - coord)*100/width
            dot2Loc = coord - 40
        }
    } else {
        if (coord < dot2Loc) {
            if (coord - start < 0) {
                minPriceCoef = 1
            } else {
                minPriceCoef = (coord - start) / (width)
            }
            marginLeft = (coord - start)*100/width
            dot1Loc = coord + 40
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
let productArray
let sortedArray = []
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
function inputListener(target) {
    if (target.tagName = "INPUT") {
        if (target.getAttribute("checked") === null) {
            const parent = target.closest(".checkboxParent")
            const child = parent.querySelector(".checkboxInput")
            child.setAttribute("checked", true)
            parent.querySelector("p").setAttribute("checked", true)
        } else {
            const parent = target.closest(".checkboxParent")
            const child = parent.querySelector(".checkboxInput")
            child.removeAttribute("checked")
            parent.querySelector("p").removeAttribute("checked")
        }
    }
}
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            productArray = httpRequest.response
            sortedArray = productArray
            sortAndSetPrice("min", "max")
        }
    }
}
httpRequest.open("GET", "https://62d575ef15ad24cbf2c7a034.mockapi.io/products")
httpRequest.responseType = "json"
httpRequest.send()


function clearEmptySpaces(array) {
    let localArr = array
    return localArr.filter((e) => e !== "()")
}
function sort(str) {
    productArray.filter((e) => {
        if (str === "") {
            console.log("all")
            sortedArray.push(e)
        } else if (eval(str)) {
            console.log(`${str}`)
            sortedArray.push(e)
        }
    })
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
dots[1].addEventListener("dragend", () => {
    price = `+e.price < +${minAndMaxPrice.querySelector(".maxPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf("<")!==-1) {
            priceArr[index] = price
        } 
    })
    allAtOnce.filter((e,index)=>{
        if(e.indexOf("<")!==-1){
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    // allAtOnce = clearEmptySpaces(allAtOnce)
    sortedArray = []
    sort(allAtOnce.join(" && "))
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    sortAndSetPrice()
})
dots[0].addEventListener("dragend",()=>{
    price = `+e.price > +${minAndMaxPrice.querySelector(".minPrice").innerHTML.replace("$", "")}`
    priceArr.filter((e, index) => {
        if (e.indexOf(">")!==-1) {
            priceArr[index] = price
        } 
    })
    allAtOnce.filter((e,index)=>{
        if(e.indexOf(">")!==-1){
            allAtOnce[index] = `(${priceArr.join(" && ")})`
        }
    })
    // allAtOnce = clearEmptySpaces(allAtOnce)
    sortedArray = []
    sort(allAtOnce.join(" && "))
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    sortAndSetPrice()
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
            return `${Math.round(minPriceCoef * maxPrice)}`
        }
    })()}`
})
colorOption.addEventListener("click", function (e) {
    const target = e.target
    e.preventDefault()
    inputListener(target)
    const parent = target.closest(".checkboxParent")
    const child = parent.querySelector(".checkboxInput")
    color = `e.color === '${child.getAttribute("id")}'`
    if (child.getAttribute("checked") === null) {
        colorArr = colorArr.filter((e) => e !== color)
        allAtOnce.filter((e, index) => {
            if (e.indexOf(color) !== -1) {
                allAtOnce[index] = `(${colorArr.join(" || ")})`
            }
        })
        allAtOnce = clearEmptySpaces(allAtOnce)
    } else {
        colorArr.push(color)
        allAtOnce.filter((e, index) => {
            if (e.indexOf("color") !== -1) {
                allAtOnce.splice(index, 1)
            }
        })
        allAtOnce.push(`(${colorArr.join(" || ")})`)
        allAtOnce = clearEmptySpaces(allAtOnce)
    }
    sortedArray = []
    sort(allAtOnce.join(" && "))
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    sortAndSetPrice()
})
sizeOption.addEventListener("click", function (e) {
    const target = e.target
    e.preventDefault()
    inputListener(target)
    const parent = target.closest(".checkboxParent")
    const child = parent.querySelector(".checkboxInput")
    size = `e.size === '${child.getAttribute("id")}'`
    if (child.getAttribute("checked") === null) {
        sizeArr = sizeArr.filter((e) => e !== size)
        allAtOnce.filter((e, index) => {
            if (e.indexOf(size) !== -1) {
                allAtOnce[index] = `(${sizeArr.join(" || ")})`
            }
        })
        allAtOnce = clearEmptySpaces(allAtOnce)
    } else {
        sizeArr.push(size)
        allAtOnce.filter((e, index) => {
            if (e.indexOf("size") !== -1) {
                allAtOnce.splice(index, 1)
            }
        })
        allAtOnce.push(`(${sizeArr.join(" || ")})`)
        allAtOnce = clearEmptySpaces(allAtOnce)
    }
    sortedArray = []
    sort(allAtOnce.join(" && "))
    clearPage(productsOnHomepage.querySelector('.forRemoval'), productsOnHomepage)
    sortAndSetPrice()
})
function clearPage(removalLoc, loc) {
    removalLoc.remove()
    loc.insertAdjacentHTML("afterbegin", `<div class="forRemoval row"></div>`)
}









const mobileSortBurger = document.querySelector(".mobileSortMenu")
const sortMenu = document.querySelector(".background")
mobileSortBurger.addEventListener("click",function(){
    sortMenu.classList.toggle("visible")
})

















