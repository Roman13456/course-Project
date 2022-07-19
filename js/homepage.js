const httpRequest = new XMLHttpRequest()
const productsUrl = 'https://62d575ef15ad24cbf2c7a034.mockapi.io/products'
const productsHomePage = document.querySelector(".productsOnHomepage")
let productsArray 
httpRequest.onreadystatechange = responseHandler
httpRequest.open("GET",productsUrl)
httpRequest.responseType = "json"
httpRequest.send()
productsHomePage.addEventListener("click",function(e){
    if(e.target.tagName === "A"){
        localStorage.setItem("currentItem",e.target.parentElement.getAttribute("data-id"))
    }else if(e.target.tagName === "IMG"){
        localStorage.setItem("currentItem",e.target.parentElement.parentElement.getAttribute("data-id"))
    }
})
function createProduct(element){
    productsHomePage.insertAdjacentHTML("beforeend",`
    <div class="col-6 col-lg-4 col-xxl-3 position-relative" data-id='${element.id}'>
                <a href="products_page.html" class=" d-block">
                    <img src="${element.imgSource}" alt="printed blazer">
                </a>
                ${(()=>{
                    if(element.isSale){
                        return `<p class="saleIndicator position-absolute">SALE</p>`
                    }else{
                        return ""
                    }
                })()}
                <a class="d-block" href="products_page2.html">${element.name}</a>
                <p>$${element.price}
                ${(()=>{
                    if(element.isSale){
                        return `<span>$${element.oldPrice}</span>`
                    }else{
                        return ''
                    }
                })()}
                </p>
            </div>
    `)
}
function responseHandler(){
    if(httpRequest.readyState === 4){
        if(httpRequest.status === 200){
            productsArray = httpRequest.response
            localStorage.setItem("productArray",JSON.stringify(productsArray))
            productsArray.forEach((createProduct))
        }
    }else{
        console.log("not ready yet")
    }
}
