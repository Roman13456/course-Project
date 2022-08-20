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
                <img src="${productArray[index].imgSource}">
                <p class="mb-0">${element.productName}</p>
            </div>
            <div class="wrapper d-flex align-items-center">
                <div class="counter d-flex align-items-center">
                    <button class='deduction'><img class='deduction' src="images/minus.svg" alt="deduct item"></button>
                    <p class=" mb-0">${element.quantity}</p>
                    <button class='addition'><img class='addition' src="images/Add.svg" alt="add item"></button>
                </div>
                <div class="d-flex align-items-center">
                    <p class="mb-0 price">$${element.price}</p>
                    <button class='removeItem'  type="button"><img class='removeItem' src="images/Remove.svg" alt="remove item"></button>
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
function productsHoverLinks(button) {
    // const productsLinks = document.querySelectorAll('.productItemLink button')
        button.addEventListener("click", function () {
            this.classList.add('animationAddToCartBtn')
            const innerHtml = this.innerHTML
            this.innerHTML = `<div class='spinner'><div>`
            this.disabled=true
            setTimeout(()=>{
                this.classList.remove('animationAddToCartBtn')
                this.innerHTML = innerHtml
                this.disabled = false
            },2500)
            const productId = this.closest('.productItemLink').getAttribute('data-id')
            const product = productsArray.find((b) => b.id === productId)
            const obj = {
                id: productId,
                quantity: 1,
                price: Math.round(product.price),
                productName: product.name,
                priceForItem: Math.round(product.price),
            }
            userChosenProducts.push(obj)
            localStorage.setItem('userChosenProducts', JSON.stringify(userChosenProducts))
            const counter = JSON.parse(localStorage.getItem("userChosenProducts"));
            const busketCounter = document.querySelector(".busketCounter");
            if (counter === null) {
                busketCounter.innerHTML = 0;
            } else {
                busketCounter.innerHTML = counter.length;
            }
            calcGeneralPrice();
            createChosenProductFromStorage(obj);
        })
}