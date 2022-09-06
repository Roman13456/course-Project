function createProductClosure(loc,lg,xxl){
    const place = loc
    function createProduct(element){
        place.insertAdjacentHTML("beforeend",`
        <div class="productItemLink col-6 col-lg-${lg} col-xxl-${xxl} position-relative" data-id='${element.id}'>
            <div class='usualProductItem'>
                <a href="products_page.html" class=" d-block">
                    <img src="${element.imgsGallery[0]}" alt="printed blazer">
                </a>
                ${(()=>{
                    if(element.isSale){
                        return `<p class="saleIndicator position-absolute">SALE</p>`
                    }else{
                        return ""
                    }
                })()}
                <a class="d-block" href="products_page.html">${element.name}</a>
                <p class='itemPrice'>$${element.price}
                    ${(()=>{
                        if(element.isSale){
                            return `<span>$${element.oldPrice}</span>`
                        }else{
                            return ''
                        }
                    })()}
                </p>
            </div>
            <div class='hoverProductItem'>
                <a href="products_page.html" class=" d-block">
                    <img src="${element.imgsGallery[0]}" alt="printed blazer">
                </a>
                ${(()=>{
                    if(element.isSale){
                        return `<p class="saleIndicator position-absolute">SALE</p>`
                    }else{
                        return ""
                    }
                })()}
                <a class="d-block" href="products_page.html">${element.name}</a>
                <p class='itemPrice'>$${element.price}
                    ${(()=>{
                        if(element.isSale){
                            return `<span>$${element.oldPrice}</span>`
                        }else{
                            return ''
                        }
                    })()}
                </p>
                <button data-id ='${element.id}' class='buttonEvent'>Add to cart</button>
            </div>
        </div>
        `)
        const buttons = Array.from(document.querySelectorAll('.productItemLink button')) 
        const exactBtn = buttons.find((e)=>e.getAttribute('data-id')==element.id)
        productsHoverLinks(exactBtn)
    }
    return createProduct;
}
