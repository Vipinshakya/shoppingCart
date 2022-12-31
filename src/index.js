let shop=document.getElementById("boxes")
console.log(boxes)
let basket=JSON.parse(localStorage.getItem("data"))||[];





let getShop=()=>{
    return(shop.innerHTML=boxesData.map((x)=>{
        let{id,name,price,img} =x;
        let search=basket.find((x)=>x.id===id)||[]
       
        return`
        <div id="product-id-${id}"class="items">

            <div class="top">
                  <img width="219px" src="${img}" alt="">
            </div>
            <div class="bottom">
                 <h4 align="center">${name}</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id velit quas consequuntur dicta molestiae </p>
            </div>
      
       
       
        <div class="button">
             <div class="price">price: Rs ${price}</div>
             <div class="btn">
                 <i onclick="Increment(${id})" class="bi bi-plus-lg"></i>
<div id="${id}"class="button-quantity">${search.item===undefined? 0:search.item}</div>

            <i onclick="Decrement(${id})" class="bi bi-dash-lg"></i>
             </div>
           


        </div>
    </div>
        
        `
    }).join(""))
   
}
getShop() 

let Increment = (id) =>{
    let systemid=id;
    let search=basket.find((x)=> x.id === systemid.id);

if(search===undefined){
     basket.push({
        id:systemid.id,
        item:1,
    }); 
} else{
    search.item +=1;
}

  

 
calculation();

update(systemid.id)

localStorage.setItem("data",JSON.stringify(basket));

   
}

let Decrement = (id) =>{
    let systemid=id;
    let search=basket.find((x)=> x.id === systemid.id);

    if(search===undefined)return

else if(search.item===0) return; 

 else{
    search.item -=1;
}


basket=basket.filter((x)=>x.item !== 0)

  calculation();

update(systemid.id)


  localStorage.setItem("data",JSON.stringify(basket)) 
 
}


let update=(id)=>{
    let search=basket.find((x)=> x.id===id)
console.log(search.item)
document.getElementById(id).innerHTML=search.item;
}

let calculation=()=>{
   let Icon=document.getElementById("cart-num")
   Icon.innerHTML=basket.map((x)=>x.item).reduce((x,y) => x+y ,0)
}
calculation()

