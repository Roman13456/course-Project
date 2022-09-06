function setListenersOnLinks(){
    const productsHomePage = document.querySelectorAll(".productsOnHomepage")
    productsHomePage.forEach((e)=>{
        e.addEventListener("click",function(e){
            if(e.target.tagName === "A"){
                localStorage.setItem("currentItem",e.target.closest('.productItemLink').getAttribute("data-id"))
        
            }else if(e.target.tagName === "IMG"){
                const target = e.target.closest('.productItemLink')
                // console.log(target)
                if(target!==null){
                    localStorage.setItem("currentItem",e.target.closest('.productItemLink').getAttribute("data-id"))
                }
            }
        })
    })
}
