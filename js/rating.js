const rating = document.querySelector('.rating')
const rateStars = Array.from(document.querySelectorAll('.rateImg')) 
let ratingCounter = 5//значення за замовчуванням
setSrc(rateStars,'images/Star0.svg','images/Star2.svg')
rateStars.forEach(ratingCallbackClosure('mouseover'))
rateStars.forEach(ratingCallbackClosure('click'))

function ratingCallbackClosure(event){
    return (e,index)=>{
        e.addEventListener(event,()=>{
            ratingCounter = index+1
            rateStars.forEach((b)=>{
                b.classList.remove('active')
            })
            const localArr = rateStars.slice(0,index+1)
            localArr.forEach((b)=>{
                b.classList.add('active')
            })
            setSrc(rateStars,'images/Star0.svg','images/Star2.svg')
        })
    } 
} 
function setSrc(array,src0,src1){
    array.forEach((e)=>{
        if(e.classList.contains('active')){
            e.setAttribute('src',src1)
        }else{
            e.setAttribute('src',src0)
        }
    })
}