let productPageObject;
let productsArray;
const productsHomePage = document.querySelector(".productsOnHomepage");
const httpRequest = new XMLHttpRequest();
const productsUrl = "https://62d575ef15ad24cbf2c7a034.mockapi.io/products";
httpRequest.onreadystatechange = responseHandler;
httpRequest.open("GET", productsUrl);
httpRequest.responseType = "json";
httpRequest.send();
renderComments()
function responseHandler() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            productsArray = httpRequest.response;
            getproductPageObject();
            // console.log(productPageObject)
            price = productPageObject.price;
            productName = productPageObject.name;
            setProductPage();
            reviews = document.querySelector(".descriptionAndReviews .reviews");
            miniImages = document.querySelector(".imgGallery");
            chooseForm = document.querySelector(".chooseForm");
            productImg = document.querySelector(".productImg");
            userColor = chooseForm.elements["userColor"];
            userSize = chooseForm.elements["userSize"];
            quantity = chooseForm.elements["quantity"];
            miniImages.addEventListener("click", (e) => {
                if (e.target.tagName === "IMG") {
                    const imgArray = miniImages.querySelectorAll("img");
                    imgArray.forEach((e) => e.classList.remove("active"));
                    e.target.classList.add("active");
                    const path = e.target.getAttribute("src");
                    miniImages.parentElement.parentElement
                        .querySelector(".mainImage")
                        .setAttribute("src", path);
                }
            });
            chooseForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const userColorValue = userColor.value;
                const userSizeValue = userSize.value;
                const quantityValue = quantity.value.trim();
                const priceValue = +price;
                let bool = true;
                if (quantityValue === "") {
                    setError(quantity, "quantity field is empty", 'noMsg');
                    bool = false;
                } else if (quantityValue === "0") {
                    setError(quantity, "should be at least 1 item", 'noMsg');
                    bool = false;
                } else {
                    setSuccess(quantity, 'noMsg');
                }
                if (bool) {
                    const obj = {
                        id: productPageObject.id,
                        color: userColorValue,
                        size: userSizeValue,
                        quantity: quantityValue,
                        price: quantityValue * priceValue,
                        productName: productName,
                        priceForItem: priceValue,
                    };
                    userChosenProducts.push(obj);//header
                    updateStorage();//header
                    const counter = JSON.parse(localStorage.getItem("userChosenProducts"));
                    const busketCounter = document.querySelector(".busketCounter");
                    if (counter === null) {
                        busketCounter.innerHTML = 0;
                    } else {
                        busketCounter.innerHTML = counter.length;
                    }
                    calcGeneralPrice();
                    createChosenProductFromStorage(obj);
                }
            });
            productsArray.forEach(createProductClosure(productsHomePage, 4, 3));
            setListenersOnLinks();
        }
    } else {
        console.log("not ready yet");
    }
}
function getRandomInt(min, max, length, array) {
    for (let i = 0; i < length; i++) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let random = Math.floor(Math.random() * (max - min)) + min;
        if (validation()) {
            array.push(random); //Максимум не включается, минимум включается
        }
        function validation() {
            let bool = true;
            for (let x = 0; x < i; x++) {
                if (random === array[x]) {
                    i--;
                    bool = false;
                }
            }
            return bool;
        }
    }
}
productsHomePage.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
        localStorage.setItem(
            "currentItem",
            e.target.closest("div").getAttribute("data-id")
        );
    }
});
const descriptionBtn = document.querySelector(
    ".descriptionAndReviewsButtons .descriptionBtn"
);
const reviewsBtn = document.querySelector(
    ".descriptionAndReviewsButtons .reviewsBtn"
);
const fullDesciption = document.querySelector(
    ".descriptionAndReviews .fullDesciption"
);
let reviews
let miniImages
let chooseForm
let productImg
let userColor
let userSize
let quantity
let price;
let productName;
const commentaryForm = document.querySelector(".commentaryForm");
function getproductPageObject() {
    const id = localStorage.getItem("currentItem");
    const index = productsArray.findIndex((e) => e.id === id);
    productPageObject = productsArray[index];
    productsArray = productsArray.filter((e) => e.id !== id);
    const randomArr = [];
    getRandomInt(0, productsArray.length, 4, randomArr);
    productsArray = productsArray.filter(function (e, indexfilter) {
        for (let i = 0; i < 4; i++) {
            if (indexfilter === randomArr[i]) {
                return true;
            }
        }
    });
    console.log(randomArr);
}
descriptionBtn.addEventListener("click", function () {
    reviews.classList.add("d-none");
    fullDesciption.classList.remove("d-none");
});
reviewsBtn.addEventListener("click", function () {
    fullDesciption.classList.add("d-none");
    reviews.classList.remove("d-none");
});

function setError(element, error, msg) {
    if (msg === 'noMsg') {
        const inputControls = element.parentElement;
        inputControls.classList.add("error");
        inputControls.classList.remove("success");
    } else {
        const inputControls = element.parentElement;
        const errorMsg = inputControls.querySelector(".error")
        errorMsg.innerHTML = error
        inputControls.classList.add("error");
        inputControls.classList.remove("validated")
        inputControls.classList.remove("success");
    }
}
function setSuccess(element, msg) {
    if (msg === 'noMsg') {
        const inputControls = element.parentElement;
        inputControls.classList.add("success");
        inputControls.classList.remove("error");
    } else {
        const inputControls = element.parentElement;
        const errorMsg = inputControls.querySelector(".error")
        inputControls.classList.add("success");
        inputControls.classList.remove("error");
        errorMsg.innerHTML = ""
        inputControls.classList.add("validated")
    }
}


/////////////////generate data---------------------------------------------------------------------------------
let data = new Date('Thu Aug 18 2022 13:04:13 GMT+0300').getTime()
let gallery = []
let images = ['images/Bag.jpg', 'images/Blazer.jpg', 'images/girlsTShirt.jpg', 'images/PrintedBlazer.jpg', 'images/printableTShirt.jpg']
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
function randomGallery() {
    for (let i = 0; i < 64; i++) {
        const quantity = getRandomIntInclusive(1, 3)
        const arr = []
        for (let i = 0; i < quantity; i++) {
            const randomIndex = getRandomIntInclusive(0, 4)
            arr.push(images[randomIndex])
        }
        gallery.push(arr)
    }
    return gallery
}
async function generateArray() {
    const array = await fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products')
    const parsedArray = await array.json()
    let newProductsArray = parsedArray.map((e, index) => {
        // e.date = dateArr[index]
        e.rating = 0
        // e.imgsGallery = gallery[index]
        return e
    })
    console.log(JSON.stringify(newProductsArray))
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function setGallery(array) {
    let str = ''
    array.forEach((e, index) => {
        if (index === 0) {
            str = `${str} <img class="active" src="${e}" alt=""> `
        } else {
            str = `${str} <img src="${e}" alt=""> `
        }
    })
    return str
}
function setProductPage() {
    document.querySelector('.product').insertAdjacentHTML('afterbegin', `
        <div class="col-12 col-lg-6 d-flex flex-wrap">
            <div class="imgGallery d-flex order-1 order-md-0 flex-md-column">
                ${setGallery(productPageObject.imgsGallery)}
            </div>
            <img class="mainImage" src="${productPageObject.imgsGallery[0]}" alt="">
        </div>
        <div class="col-12 col-lg-6 productDescription position-relative">
            ${(()=>{
                if(productPageObject.isSale){
                    return `<p class="saleIndicator position-absolute">SALE</p>`
                }else{
                    return ""
                 }
            })()}
            <h3>${productPageObject.name}</h3>
        <p class="productCode">SKU: ${productPageObject.productCode}</p>
        <div class="rating">
                ${displayRating(productPageObject.rating)}
        </div> 
        <p class="price">$${Math.round(productPageObject.price)}
        ${(()=>{
                    if(productPageObject.isSale){
                        return `<span>$${Math.round(productPageObject.oldPrice)}</span>`
                    }else{
                        return ''
                    }
                })()}
        </p>

            
            <div class="position-relative description">
                <p>Inceptos porta orci ac varius nostra arcu eu scelerisque placerat, turpis dui accumsan sociis et hendrerit luctus himenaeos lobortis.</p>
            </div>
            <form class="chooseForm" action="#">
                <div class="chooseOptionsGroup position-relative">
                    <div class="chooseOptions d-flex align-items-center justify-content-between col-12 col-md-5 col-lg-7 col-xxl-5 col-xl-6">
                        <p class="mb-0">Color</p>
                        <select name="userColor" size="1" required="">
                            <!-- <option value=""></option> -->
                            <option value="Green" selected="">Green</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Blue">Blue</option>
                        </select>
                    </div>
                    <div class="chooseOptions d-flex align-items-center justify-content-between col-12 col-md-5 col-lg-7 col-xxl-5 col-xl-6">
                        <p class="mb-0">Size</p>
                        <select name="userSize" size="1" required="">
                            <!-- <option value=""></option> -->
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L" selected="">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                </div>
                <div class="chooseOptions d-flex align-items-center justify-content-between col-12 col-md-5 col-lg-7 col-xxl-5 col-xl-6">
                    <div class="input_controls success">
                        <input name="quantity" type="number" class="quantity mb-0" value="1">
                    </div>
                    <button type="submit">Add to cart</button>
                </div>
                
            </form>
        </div>
    `)


    // document.querySelector(".mainImage").setAttribute("src", `${productPageObject.imgSource}`);
    // if (!productPageObject.isSale) {
    //     document.querySelector(".saleIndicator").remove();
    // }
    // document.querySelector(".productDescription h3").innerHTML =
    //     productPageObject.name;
    // document.querySelector(".productDescription h3").insertAdjacentHTML(
    //     "afterend",
    //     `
    // <p class="productCode">SKU: ${productPageObject.productCode}</p>
    // <p class="price">$${productPageObject.price}
    //     ${(() => {
    //         if (productPageObject.isSale) {
    //             return `<span>$${productPageObject.oldPrice}</span>`;
    //         } else {
    //             return "";
    //         }
    //     })()}
    // </p>
    // `
    // );
}
const form = document.querySelector('.commentaryForm')
const textAreaCommentary = document.querySelector('#textAreaCommentary')
const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')
const commentsContainer = document.querySelector('.commentsContainer')
const reviewsQuantity = document.querySelector('.reviewsQuantity')
function validate() {
    let bool = true
    bool = validateTextArea(bool)
    bool = validateName(bool)
    bool = validateEmail(bool)
    return bool
}
form.addEventListener("submit", function (e) {
    e.preventDefault()
    validate()
    // date:`${date.toLocaleString(['en-us'], { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`,
    if (validate()) {
        const itemId = localStorage.getItem('currentItem')
        const comment = {
            itemId,
            body: textAreaCommentary.value,
            name: userName.value,
            date: new Date(),
            email: userEmail.value,
            rating: ratingCounter
        }
        const comments = document.querySelectorAll('.commentaryContainer')
        const commentsSorted = []
        comments.forEach((e) => {
            commentsSorted.push(+e.getAttribute('data-rating'))
        })
        const rating = ((commentsSorted.reduce((sum, current) => sum + current, 0) + ratingCounter) / (comments.length + 1)).toFixed(1)
        console.log(rating)
        // console.log(comment)
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/commentaries', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => res.json())
            .then(createComment)
            .then(reviewsQuantity.innerHTML = +reviewsQuantity.innerHTML + 1)
            .catch((error) => {
                alert(error);
            });
        fetch('https://62d575ef15ad24cbf2c7a034.mockapi.io/products/' + itemId, {
            method: 'PUT',
            body: JSON.stringify({ rating }),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        })
            .then(res => res.json())
            .then(editedRes => {
                console.log(editedRes.rating)
                document.querySelector('.productDescription .rating').innerHTML=displayRating(editedRes.rating)
            })

    }
})
function renderComments() {
    const itemId = localStorage.getItem('currentItem')
    fetch(`https://62d575ef15ad24cbf2c7a034.mockapi.io/commentaries?itemId=${itemId}`)
        .then((data => data.json()))
        .then((array) => {
            reviewsQuantity.innerHTML = `${array.length}`
            array.forEach(createComment)
        })
}

function createComment(newComment) {
    const date = new Date(Date.parse(newComment.date))
    commentsContainer.insertAdjacentHTML('afterbegin', `
    <div class="commentaryContainer d-flex justify-content-between row" data-rating='${newComment.rating}'>
        <div class="col-6">
            <p class="autor mb-0"><strong>${newComment.name}</strong></p>
            <p class="date mb-0">${date.toLocaleString(['en-us'], { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}</p>
        </div>
        <div class="rating col-6 position-relative">
            <div class='position-absolute toRight'>${displayRating(newComment.rating)}</div>
        </div>
        
        <p class="col-12 commentary mb-0">${newComment.body}</p>
    </div>
`)
}
function displayRating(rating) {
    const imgs = []
    for (let i = 0; i < Math.round(rating); i++) {
        imgs.unshift(`<img class="rateImg active" src="images/Star1.svg">`)
    }
    for (let i = 0; i < 5 - Math.round(rating); i++) {
        imgs.push(`<img class="rateImg" src="images/Star0.svg">`)
    }
    console.log(imgs.join(' '))
    return imgs.join(' ')
}
form.addEventListener("focusout", function (e) {
    if (e.target.classList.contains("textAreaComment")) {
        validateTextArea()
    }
    if (e.target.classList.contains("userName")) {
        validateName()
    }
    if (e.target.classList.contains("userEmail")) {
        validateEmail()
    }
    let inputArr = Array.from(document.querySelectorAll(".input_controls input"))
    inputArr = inputArr.map((element) => {
        if (element.value.trim() !== "") {
            return element
        } else {
            return 0
        }
    })
    inputArr = inputArr.filter((e) => e !== 0)
    function validateFilledInputs(element) {//при автозаповненні щоб при втраті фокусу перевіряло
        if (element.classList.contains("firstName")) {
            validateName()
        } else if (element.classList.contains("email")) {
            validateEmail()
        }
    }
    inputArr.forEach(validateFilledInputs)
})
function validateName(bool) {
    const inputNameValue = userName.value.trim()
    const regexName = /^[A-Z А-Я]/
    if (inputNameValue === "") {
        setError(userName, "Не введене ім'я")
        return false
    } else if (!regexName.test(inputNameValue)) {
        setError(userName, "Ваше ім'я не з великої букви")
        return false
    } else {
        setSuccess(userName)
        return bool
    }
}

function validateEmail(bool) {
    const inputEmailValue = userEmail.value.trim()
    const regexEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
    if (inputEmailValue === "") {
        setError(userEmail, "Не введений email")
        return false
    } else if (!regexEmail.test(inputEmailValue)) {
        setError(userEmail, "не вірний email")
        return false
    } else {
        setSuccess(userEmail)
        return bool
    }
}
function validateTextArea(bool) {
    const inputTextAreaValue = textAreaCommentary.value.trim()
    if (inputTextAreaValue === "") {
        setError(textAreaCommentary, "empty comment field")
        return false
    } else {
        setSuccess(textAreaCommentary)
        return bool
    }
}