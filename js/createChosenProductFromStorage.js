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