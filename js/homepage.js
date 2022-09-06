const httpRequest = new XMLHttpRequest()
const productsUrl = 'https://62d575ef15ad24cbf2c7a034.mockapi.io/products'
const productsHomePage = document.querySelectorAll(".productsOnHomepage")
const onSaleHomePage =  productsHomePage[0]
const otherProducts = productsHomePage[1]
const productLinks = document.querySelector('.productLinks')
let productsArray 
// let nameBase = []
httpRequest.onreadystatechange = responseHandler
httpRequest.open("GET",productsUrl)
httpRequest.responseType = "json"
httpRequest.send()
productLinks.querySelectorAll('a').forEach((element)=>{
    element.addEventListener("click",()=>{
        localStorage.setItem("currentCategory", element.closest("div").querySelector('a').getAttribute("data-info"))
    })   
})
const shopNow = document.querySelector('.shopNow')
shopNow.addEventListener('click',function(){
    localStorage.setItem("currentCategory", 'fashion')
    window.open('category.html','_self')
})
function responseHandler(){
    if(httpRequest.readyState === 4){
        if(httpRequest.status === 200){
            productsArray = httpRequest.response;
            // localStorage.setItem("productArray",JSON.stringify(productsArray));
            productsArray.slice(0,8).forEach(createProductClosure(otherProducts,4,3));
            productsArray.filter((e)=>e.isSale === true).slice(0,4).forEach(createProductClosure(onSaleHomePage,4,3))
            // productsArray.forEach((e)=>{
            //     nameBase.push(e.name)
            // })
        }
    }else{
        console.log("not ready yet")
    }
}
