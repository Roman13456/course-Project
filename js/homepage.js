const httpRequest = new XMLHttpRequest()
const productsUrl = 'https://62d575ef15ad24cbf2c7a034.mockapi.io/products'
const productsHomePage = document.querySelectorAll(".productsOnHomepage")
const onSaleHomePage =  productsHomePage[0]
const otherProducts = productsHomePage[1]
let productsArray 
httpRequest.onreadystatechange = responseHandler
httpRequest.open("GET",productsUrl)
httpRequest.responseType = "json"
httpRequest.send()
productsHomePage.forEach((e)=>{
    e.addEventListener("click",function(e){
        if(e.target.tagName === "A"){
            localStorage.setItem("currentItem",e.target.parentElement.getAttribute("data-id"))
    
        }else if(e.target.tagName === "IMG"){
            localStorage.setItem("currentItem",e.target.parentElement.parentElement.getAttribute("data-id"))
        }
    })
})
function responseHandler(){
    if(httpRequest.readyState === 4){
        if(httpRequest.status === 200){
            productsArray = httpRequest.response;
            // localStorage.setItem("productArray",JSON.stringify(productsArray));
            productsArray.slice(0,8).forEach(createProductClosure(otherProducts));
            productsArray.filter((e)=>e.isSale === true).slice(0,4).forEach(createProductClosure(onSaleHomePage))
        }
    }else{
        console.log("not ready yet")
    }
}
