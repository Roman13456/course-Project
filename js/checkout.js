const form = document.querySelector("form")//
const inputName = form.elements["firstName"]//
const inputLastName = form.elements["lastName"]
const inputNumber = form.elements["phone"]//
const inputEmail = form.elements["email"]//
const inputStreet = form.elements['street']//
const inputCity = form.elements['city']//
const inputZIPcode = form.elements['ZIPcode']//
const submit = document.querySelector(".submitBtn")

let productsArray 
function setError(element,error){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    errorMsg.innerHTML=error
    inputControls.classList.remove("validated")
    inputControls.classList.add("error")
    inputControls.classList.remove("success")
    
}
function setSuccess(element){
    const inputControls = element.parentElement
    const errorMsg = inputControls.querySelector(".error")
    inputControls.classList.add("success")
    inputControls.classList.add("validated")
    inputControls.classList.remove("error")
    errorMsg.innerHTML=""
}
function validate(){
    let bool = true
    bool = validateName(bool)
    bool = validateLastName(bool)
    bool = validateNumber(bool)
    bool = validateEmail(bool)
    bool = validateStreet(bool)
    bool = validateCity(bool)
    bool = validateZIPcode(bool)
    return bool
}
function validateName(bool){
    const inputNameValue = inputName.value.trim()
    const regexName = /^[A-Z А-Я]/
    if(inputNameValue===""){
        setError(inputName,"Не введене ім'я")
        return false
    }else if(!regexName.test(inputNameValue)){
        setError(inputName,"Ваше ім'я не з великої букви")
        return false
    }else{
        setSuccess(inputName)
        return bool
    }
}
function validateLastName(bool){
    const inputLastNameValue = inputLastName.value.trim()
    const regexName = /^[A-Z А-Я]/
    if(inputLastNameValue===""){
        setError(inputLastName,"Не введене прізвище")
        return false
    }else if(!regexName.test(inputLastNameValue)){
        setError(inputLastName,"Ваше прізвище не з великої букви")
        return false
    }else{
        setSuccess(inputLastName)
        return bool
    }
}
function validateNumber(bool){
    const inputNumberValue = inputNumber.value.trim()
    const regexNumber =/^\+380\d{9}/
    if(inputNumberValue===""){
        setError(inputNumber,"Не введений номер телефону")
        return false
    }else if(inputNumberValue.length>13){
        setError(inputNumber,"Номер занадто довгий")
        return false
    }else if(!regexNumber.test(inputNumberValue)){// - номер телефону, формат +380671234567
        setError(inputNumber,"Номер не в форматі +380123456789")
        return false
    }else{
        setSuccess(inputNumber)
        return bool
    }
}
function validateEmail(bool){
    const inputEmailValue = inputEmail.value.trim()
    const regexEmail=/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm
    if(inputEmailValue===""){
        setError(inputEmail,"Не введений email")
        return false
    }else if(!regexEmail.test(inputEmailValue)){
        setError(inputEmail,"не вірний email")
        return false
    }else{
        setSuccess(inputEmail)
        return bool
    }
}
function validateStreet(bool){
    const inputStreetValue = inputStreet.value.trim()
    const regexStreet=/^\s*\S+(?:\s+\S+){2}/
    if(inputStreetValue===""){
        setError(inputStreet,"вулиця не введена")
        return false
    }else if(!regexStreet.test(inputStreetValue)){
        setError(inputStreet,"не вірний формат вулиці")
        return false
    }else{
        setSuccess(inputStreet)
        return bool
    }
}
function validateCity(bool){
    const inputCityValue = inputCity.value.trim()
    const regexCity=/^[a-zA-ZА-Яа-я\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-ZА-Яа-я\u0080-\u024F]+)*$/
    if(inputCityValue===""){
        setError(inputCity,"місто не введене")
        return false
    }else if(!regexCity.test(inputCityValue)){
        setError(inputCity,"не вірно введене місто")
        return false
    }else{
        setSuccess(inputCity)
        return bool
    }
}
function validateZIPcode(bool){
    const inputZipCodeValue = inputZIPcode.value.trim()
    const regexZipCode=/(^\d{5}$)|(^\d{5}-\d{4}$)/
    if(inputZipCodeValue===""){
        setError(inputZIPcode,"zip code field is empty")
        return false
    }else if(!regexZipCode.test(inputZipCodeValue)){
        setError(inputZIPcode,"incorrect zip code")
        return false
    }else{
        setSuccess(inputZIPcode)
        return bool
    }
}
form.addEventListener("focusout",function(e){
    if(e.target.classList.contains("firstName")){
        validateName()
    }
    if(e.target.classList.contains("lastName")){
        validateLastName()
    }
    if(e.target.classList.contains("phone")){
        validateNumber()
    }
    if(e.target.classList.contains("email")){
        validateEmail()
    }
    if(e.target.classList.contains("street")){
        validateStreet()
    }
    if(e.target.classList.contains("city")){
        validateCity()
    }
    if(e.target.classList.contains("ZIPcode")){
        validateZIPcode()
    }
    let inputArr = Array.from(document.querySelectorAll(".input_controls input"))
    // const target = e.target.getAttribute("class")
    // const index = inputArr.findIndex((element)=>element.classList.contains(target))
    // inputArr.splice(index,1)
    inputArr = inputArr.map((element)=>{
        if(element.value.trim()!==""){
            return element
        }else{
            return 0
        }
    })
    inputArr = inputArr.filter((e)=>e!==0)
    function validateFilledInputs(element){//при автозаповненні щоб при втраті фокусу перевіряло
        if(element.classList.contains("firstName")){
            validateName()
        }else if(element.classList.contains("lastName")){
            validateLastName()
        }else if(element.classList.contains("phone")){
            validateNumber()
        }else if(element.classList.contains("email")){
            validateEmail()
        }else if(element.classList.contains("street")){
            validateStreet()
        }else if(element.classList.contains("city")){
            validateCity()
        }else if(element.classList.contains("ZIPcode")){
            validateZIPcode()
        }
    }
    inputArr.forEach(validateFilledInputs)
})
form.addEventListener("submit",function(e){
    e.preventDefault()
    validate()
    if(validate()){
        const radioInputs = document.querySelector(".paymentOptions").querySelectorAll("input")
        radioInputs.forEach((e)=>{
            if(e.checked){
                localStorage.setItem("paymentMethod",e.value)
            }
        })
        localStorage.removeItem("userChosenProducts")
        window.open('order_received.html','_self')
    }
})

function init(element){
    return JSON.parse(localStorage.getItem(`${element}`)) 
}
const httpRequest = new XMLHttpRequest()
const productsUrl = 'https://62d575ef15ad24cbf2c7a034.mockapi.io/products'
httpRequest.onreadystatechange = responseHandler
httpRequest.open("GET",productsUrl)
httpRequest.responseType = "json"
httpRequest.send()
function responseHandler(){
    if(httpRequest.readyState === 4){
        if(httpRequest.status === 200){
            productsArray = httpRequest.response;
            const total = document.querySelector(".total")
            document.querySelector(".totalPrice").innerHTML=`${total.innerHTML}`
            busketItems.forEach((e)=>{
                const fullObj = productsArray.filter((b)=>b.id ===e.id)
                ordersList.insertAdjacentHTML("beforeend",`
                <div class="justify-content-between d-flex align-items-center orderExample">
                    <div class="d-flex align-items-center imgAndName">
                        <img src="${fullObj[0].imgSource}" alt="blazer">
                        <p class="mb-0">${e.productName}</p>
                    </div>
                    <div class="quantityAndPrice">
                        ${e.quantity} × $${e.priceForItem}
                    </div>
                </div>
            `)})
        }
    }else{
        console.log("not ready yet")
    }
}
const ordersList = document.querySelector(".ordersList")
const busketItems = init("userChosenProducts")
console.log(busketItems)



