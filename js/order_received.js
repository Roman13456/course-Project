const date = new Date()
const orderNumberStr = new Date().getTime()
const paymentMethodStr = localStorage.getItem("paymentMethod")
const orderNumber = document.querySelector(".orderNumber")
const currentDate = document.querySelector(".currentDate")
const paymentMethod = document.querySelector(".paymentMethod")
orderNumber.innerHTML = orderNumberStr
currentDate.innerHTML = `${new Date().toLocaleString(['en-us'], { month: 'long' })} ${new Date().getDate()}, ${new Date().getFullYear()}`
paymentMethod.innerHTML = paymentMethodStr
