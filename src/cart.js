let basket = JSON.parse(localStorage.getItem("data")) || [];
let Top = document.getElementById("top");
let Bottom = document.getElementById("bottom");
Toshow=document.getElementById('label');

let calculation = () => {
  let Icon = document.getElementById("cart-num");
  Icon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();

let getDatabtn = () => {
  if (basket.length !== 0) {
  
    return (Bottom.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = boxesData.find((y) => y.id === id) || [];
        return `
      <div class="bot">
      <div class="bottom-img"> <img width="100px" src=${search.img}></img></div>

      <div><h4> 
      <i onclick="remove(${id})" class="bi bi-x-lg"></i>
       <p> ${search.name}</p>
      <p>Rs ${search.price}</p>  </h4>   </div>

      <div class="bottom-element">
      <i onclick="Increment(${id})" class="bi bi-plus-lg"></i>
      <div id="${id}"class="button-quantity">${item}</div>
      
                  <i onclick="Decrement(${id})" class="bi bi-dash-lg"></i>
      
      </div>
      <h3>Rs ${item*search.price}</h3>
      </div>

      `
      })
      .join(""));
  } else {
    Bottom.innerHTML=``;
    Top.innerHTML = `
       <h2>cart is empty</h2>

      <a href="index.html"><button class="Boom">back to home</button></a>
       
       
       `;
  }
};
getDatabtn();

let Increment = (id) => {
  let systemid = id;
  let search = basket.find((x) => x.id === systemid.id);

  if (search === undefined) {
    basket.push({
      id: systemid.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  getDatabtn();
  //  console.log(basket)
  update(systemid.id);

  localStorage.setItem("data", JSON.stringify(basket));


};

let Decrement = (id) => {
  let systemid = id;
  let search = basket.find((x) => x.id === systemid.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  basket = basket.filter((x) => x.item !== 0);
  getDatabtn();

  //  console.log(basket)
  update(systemid.id);

  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  totalAmount()
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation()
  totalAmount()
};


let remove=((id)=>{
  let selected=id
basket=basket.filter((x)=>x.id !==selected.id)
getDatabtn()
totalAmount()
  localStorage.setItem("data", JSON.stringify(basket));
})

let clearCart = () =>{
  basket=[];
  getDatabtn();
  localStorage.setItem("data",JSON.stringify(basket));
};



let totalAmount=()=>{
  if(basket.length !== 0){
     let amount=basket.map((x)=>{
      let {item,id}=x;
      let search=boxesData.find((y)=>y.id===id)||[];
      return item * search.price;
     })
.reduce((x,y)=>x+y,0)
     Toshow.innerHTML=`
     <h1>Total:${amount}</h1>
     <button onclick="" id="primary">checkout</button>
     
     <button onclick="clearCart()" id="secondary">clear</button>
     
     
     `  

  }
  else return;
 
} ;
totalAmount()