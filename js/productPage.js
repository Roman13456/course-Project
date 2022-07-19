let productPageObject
getproductPageObject()
console.log(productPageObject)
setProductPage()
const descriptionBtn = document.querySelector(".descriptionAndReviewsButtons .descriptionBtn")
const reviewsBtn = document.querySelector(".descriptionAndReviewsButtons .reviewsBtn")
const fullDesciption = document.querySelector(".descriptionAndReviews .fullDesciption")
const reviews = document.querySelector(".descriptionAndReviews .reviews")
const miniImages = document.querySelector(".imgGallery")
const chooseForm = document.querySelector(".chooseForm")
const productImg = document.querySelector(".productImg")
    const userColor = chooseForm.elements["userColor"]
    const userSize = chooseForm.elements["userSize"]
    const quantity = chooseForm.elements["quantity"]
    const price = productPageObject.price
    const productName = productPageObject.name
const commentaryForm = document.querySelector(".commentaryForm")
function getproductPageObject(){
    const id = localStorage.getItem("currentItem")
    const productArray = JSON.parse(localStorage.getItem("productArray"))
    const index = productArray.findIndex((e)=>e.id === id)
    productPageObject = productArray[index]
}
descriptionBtn.addEventListener("click",function(){
    reviews.classList.add("d-none")
    fullDesciption.classList.remove("d-none")  
})
reviewsBtn.addEventListener("click",function(){
    fullDesciption.classList.add("d-none")
    reviews.classList.remove("d-none")  
})
miniImages.addEventListener("click", (e)=>{
    if(e.target.tagName === "IMG"){
        const imgArray =  miniImages.querySelectorAll("img")
        imgArray.forEach((e)=>e.classList.remove("active"))
        e.target.classList.add("active")
        const path = e.target.getAttribute("src")
        miniImages.parentElement.parentElement.querySelector(".mainImage").setAttribute("src",path)
    }
    
})
function setError(element,error){
    const inputControls = element.parentElement
    // const errorMsg = inputControls.querySelector(".error")
    // errorMsg.innerHTML=error
    inputControls.classList.add("error")
    inputControls.classList.remove("success")
    
}
function setSuccess(element){
    const inputControls = element.parentElement
    // const errorMsg = inputControls.querySelector(".error")
    inputControls.classList.add("success")
    inputControls.classList.remove("error")
    // errorMsg.innerHTML=""
}
chooseForm.addEventListener("submit",function(e){
    e.preventDefault()
    const userColorValue = userColor.value
    const userSizeValue = userSize.value
    const quantityValue = quantity.value.trim()
    const priceValue = +price
    let bool = true
    if(quantityValue===""){
        setError(quantity,"quantity field is empty")
        bool = false
    }else if(quantityValue==="0"){
        setError(quantity,"should be at least 1 item")
        bool = false
    }
    else{
        setSuccess(quantity)
    }
    if(bool){
        const obj = {
            id:productPageObject.id,
            color:userColorValue,
            size:userSizeValue,
            quantity:quantityValue,
            price:quantityValue*priceValue,
            productName:productName,
            priceForItem:priceValue
        }
        
        userChosenProducts.push(obj)
        updateStorage()
        calcGeneralPrice()
        createChosenProductFromStorage(obj)
    }
})
function setProductPage(){
    document.querySelector(".mainImage").setAttribute("src",`${productPageObject.imgSource}`)
    if(!productPageObject.isSale){
        document.querySelector(".saleIndicator").remove()
    }
    document.querySelector(".productDescription h3").innerHTML = productPageObject.name
    document.querySelector(".productDescription h3").insertAdjacentHTML("afterend",`
    <p class="productCode">SKU: ${productPageObject.productCode}</p>
    <p class="price">$${productPageObject.price}
        ${(()=>{
            if(productPageObject.isSale){
                return `<span>$${productPageObject.oldPrice}</span>`
            }else{
                return ''
            }
        })()}
    </p>
    `)
}
