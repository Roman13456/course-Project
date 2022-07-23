const sortPanel = document.querySelector(".sortPanel")
const sortPanelParametersArray = sortPanel.querySelectorAll("input")
const colorOption = document.querySelector(".colorOption")
const sizeOption = document.querySelector(".sizeOption")
let parametersArray = []
let unitedArrayColorsColors
let sortedColorArray = []
let multipleOptions = []
let sortStatus = []
let color =""
let colorArr = []
let size = ""
let sizeArr = []
let allAtOnce =[]
let sortedArray = []
function parseArray(arr){//стягнув з інтернету
    let newArray = []
    arr.filter((element)=>{
        if(Array.isArray(element)){
            newArray = [...newArray,...parseArray(element)]
        }else{
            newArray.push(element)
        }
    })
    return newArray
}
const makeUniq2 = (arr) => {
    const uniqSet = new Set(arr);
    return [...uniqSet];
}
const makeUniq = (arr) => {//стягнув з інета, доволі хороший метод для видалення 'повторок'
    const seen = {};
    const result = [];
    let j = 0;
    for(let i = 0; i < arr.length; i++) {
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
function inputListener(target){
    if (target.tagName = "INPUT") {
        if (target.getAttribute("checked") === null) {
            const parent = target.closest(".checkboxParent")
            const child = parent.querySelector(".checkboxInput")
            child.setAttribute("checked", true)
            parent.querySelector("p").setAttribute("checked",true)
            parametersArray.push({
                category: child.getAttribute("name"),
                parameter: child.getAttribute("id")
            })
        } else {
            const parent = target.closest(".checkboxParent")
            const child = parent.querySelector(".checkboxInput")
            const isToRemove = parent.querySelector(".checkboxInput").getAttribute("id")
            parametersArray = parametersArray.filter((e, index) => e.parameter !== isToRemove)
            child.removeAttribute("checked")
            parent.querySelector("p").removeAttribute("checked")
        }
    }
}
let productArray
// console.log(sortedColorArray)
const httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            productArray = httpRequest.response
        }
    }
}
// function makeString(parameter0,parameter1,parameter2){
//     let str
//     if(parameter0!==""){
//         str = `(${str})`
//     }
//     if(parameter1!==""){
//         str = `${str} && (${parameter1})`
//     }
//     if(parameter2!==""){
//         str = `${str} && (${parameter2})`
//     }
//     return str
// }
httpRequest.open("GET", "https://62d575ef15ad24cbf2c7a034.mockapi.io/products")
httpRequest.responseType = "json"
httpRequest.send()
colorOption.addEventListener("click", function (e) {
    const target = e.target
    e.preventDefault()
    inputListener(target)
    const parent = target.closest(".checkboxParent")
    const child = parent.querySelector(".checkboxInput")
    color=`e.color === '${child.getAttribute("id")}'`
    colorArr.push(color)
    let LocalColorStr = colorArr.join(" || ")
    allAtOnce[0] = (LocalColorStr)
    let LocalUnited = allAtOnce.map((e)=>{
        return `(${e})`
    }).join(" && ")
    sort(LocalUnited)
})
function sort(str){
    productArray.filter((e)=>{
        let string = str
        if(string[1]=="&"){
            string = string.slice(4)
        }
        if(eval(string)){
            console.log(`${string}`)
            sortedArray.push(e)
        }
    })
}
sizeOption.addEventListener("click", function (e) {
    const target = e.target
    e.preventDefault()
    inputListener(target)
    const parent = target.closest(".checkboxParent")
    const child = parent.querySelector(".checkboxInput")
    size=`e.size === '${child.getAttribute("id")}'`
    sizeArr.push(size)
    let LocalColorStr = sizeArr.join(" || ")
    allAtOnce[1] = (LocalColorStr)
    let LocalUnited = allAtOnce.map((e)=>{
        return `(${e})`
    }).join(" && ")
    sortedArray = []
    sort(LocalUnited)
})























// // if(parametersArray.length!==0){
        
//     // }else{
//     //     sortedColorArray=[]
//     // }
    
//     sortedColorArray = parseArray(sortedColorArray)
//     // unitedArrayColors= makeUniq(unitedArrayColors)
//     console.log(sortedColorArray)
//     // console.log(multipleOptions)
//     // console.log(parametersArray)
//     // console.log(sortedSizeArray)
//     // console.log(sortedColorArray)