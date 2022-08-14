let productPageObject;
let productsArray;
const productsHomePage = document.querySelector(".productsOnHomepage");
const httpRequest = new XMLHttpRequest();
const productsUrl = "https://62d575ef15ad24cbf2c7a034.mockapi.io/products";
httpRequest.onreadystatechange = responseHandler;
httpRequest.open("GET", productsUrl);
httpRequest.responseType = "json";
httpRequest.send();
function responseHandler() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            productsArray = httpRequest.response;
            getproductPageObject();
            // console.log(productPageObject)
            price = productPageObject.price;
            productName = productPageObject.name;
            setProductPage();
            productsArray.forEach(createProductClosure(productsHomePage,4,3));
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
const reviews = document.querySelector(".descriptionAndReviews .reviews");
const miniImages = document.querySelector(".imgGallery");
const chooseForm = document.querySelector(".chooseForm");
const productImg = document.querySelector(".productImg");
const userColor = chooseForm.elements["userColor"];
const userSize = chooseForm.elements["userSize"];
const quantity = chooseForm.elements["quantity"];
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
function setError(element, error) {
    const inputControls = element.parentElement;
    // const errorMsg = inputControls.querySelector(".error")
    // errorMsg.innerHTML=error
    inputControls.classList.add("error");
    inputControls.classList.remove("success");
}
function setSuccess(element) {
    const inputControls = element.parentElement;
    // const errorMsg = inputControls.querySelector(".error")
    inputControls.classList.add("success");
    inputControls.classList.remove("error");
    // errorMsg.innerHTML=""
}
chooseForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userColorValue = userColor.value;
    const userSizeValue = userSize.value;
    const quantityValue = quantity.value.trim();
    const priceValue = +price;
    let bool = true;
    if (quantityValue === "") {
        setError(quantity, "quantity field is empty");
        bool = false;
    } else if (quantityValue === "0") {
        setError(quantity, "should be at least 1 item");
        bool = false;
    } else {
        setSuccess(quantity);
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

        userChosenProducts.push(obj);
        updateStorage();
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
function setProductPage() {
    document
        .querySelector(".mainImage")
        .setAttribute("src", `${productPageObject.imgSource}`);
    if (!productPageObject.isSale) {
        document.querySelector(".saleIndicator").remove();
    }
    document.querySelector(".productDescription h3").innerHTML =
        productPageObject.name;
    document.querySelector(".productDescription h3").insertAdjacentHTML(
        "afterend",
        `
    <p class="productCode">SKU: ${productPageObject.productCode}</p>
    <p class="price">$${productPageObject.price}
        ${(() => {
            if (productPageObject.isSale) {
                return `<span>$${productPageObject.oldPrice}</span>`;
            } else {
                return "";
            }
        })()}
    </p>
    `
    );
}
