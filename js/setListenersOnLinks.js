function setListenersOnLinks(){
    const productsHomePage = document.querySelectorAll(".productsOnHomepage")
    productsHomePage.forEach((e)=>{
        e.addEventListener("click",function(e){
            if(e.target.tagName === "A"){
                localStorage.setItem("currentItem",e.target.parentElement.getAttribute("data-id"))
        
            }else if(e.target.tagName === "IMG"){
                localStorage.setItem("currentItem",e.target.parentElement.parentElement.getAttribute("data-id"))
            }
        })
    })
}