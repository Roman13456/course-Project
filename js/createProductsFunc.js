function createProductClosure(loc){
    const place = loc
    function createProduct(element){
        place.insertAdjacentHTML("beforeend",`
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
            <a class="d-block" href="products_page.html">${element.name}</a>
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
    return createProduct;
}