const date = new Date();
const orderNumberStr = new Date().getTime();
const paymentMethodStr = localStorage.getItem("paymentMethod");
const orderNumber = document.querySelector(".orderNumber");
const currentDate = document.querySelector(".currentDate");
const paymentMethod = document.querySelector(".paymentMethod");
let productsArray;
if (localStorage.getItem("order_received") !== null) {
    localStorage.removeItem("order_received");
    window.open('index.html', '_self')
} else {
    localStorage.setItem("order_received", "true");
    orderNumber.innerHTML = orderNumberStr;
    currentDate.innerHTML = `${new Date().toLocaleString(["en-us"], {
        month: "long",
    })} ${new Date().getDate()}, ${new Date().getFullYear()}`;
    paymentMethod.innerHTML = paymentMethodStr;
    fetch("https://62d575ef15ad24cbf2c7a034.mockapi.io/products")
        .then((res) => res.json())
        .then((products) => {
            productsArray = products;
        });
}
