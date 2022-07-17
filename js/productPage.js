const descriptionBtn = document.querySelector(".descriptionAndReviewsButtons .descriptionBtn")
const reviewsBtn = document.querySelector(".descriptionAndReviewsButtons .reviewsBtn")
const fullDesciption = document.querySelector(".descriptionAndReviews .fullDesciption")
const reviews = document.querySelector(".descriptionAndReviews .reviews")
const miniImages = document.querySelector(".imgGallery")
const chooseForm = document.querySelector(".chooseForm")
    const userColor = chooseForm.elements["userColor"]
    const userSize = chooseForm.elements["userSize"]
    const quantity = chooseForm.elements["quantity"]
    const price = document.querySelector(".productDescription .price").innerHTML
    const productName = document.querySelector(".productDescription h3").innerHTML
const commentaryForm = document.querySelector(".commentaryForm")
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
chooseForm.addEventListener("submit",function(){
    const priceRegex = /<\/?[a-z]+\d?[\w\s\d\W]*>/
    const userColorValue = userColor.value.trim()
    const userSizeValue = userSize.value.trim()
    const quantityValue = quantity.value.trim()
    const priceValue = +price.replace(priceRegex,"").replace('$',"").trim()
    console.log(priceValue)
    const productNameValue = productName.trim()
    const obj = {
        id:new Date().getTime(),
        color:userColorValue,
        size:userSizeValue,
        quantity:quantityValue,
        price:quantityValue*priceValue,
        productName:productNameValue,
        priceForItem:priceValue
    }
    userChosenProducts.push(obj)
    updateStorage()
    calcGeneralPrice()
    createChosenProductFromStorage(obj)
})
