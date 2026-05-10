// CART DATA

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems =
document.getElementById("cartItems");

// LOAD CART

function loadCart(){

cartItems.innerHTML = "";

let subtotal = 0;

let itemCount = 0;

cart.forEach((item,index)=>{

subtotal += item.price * item.qty;

itemCount += item.qty;

cartItems.innerHTML += `

<div class="product-card">

<div class="product-left">

<img src="${item.image}"
class="product-img">

<div>

<div class="product-name">
${item.name}
</div>

<div class="price">
₹${item.price}
</div>

<div class="qty-box">

<button class="qty-btn"
onclick="decreaseQty(${index})">
-
</button>

<span>
${item.qty}
</span>

<button class="qty-btn"
onclick="increaseQty(${index})">
+
</button>

</div>

<button class="remove-btn"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

<h3>
₹${item.price * item.qty}
</h3>

</div>

`;

});

let tax = subtotal * 0.05;

let total = subtotal + tax + 50;

document.getElementById("subtotal")
.innerText = "₹" + subtotal;

document.getElementById("tax")
.innerText = "₹" + tax.toFixed(2);

document.getElementById("total")
.innerText = "₹" + total.toFixed(2);

document.getElementById("cartCount")
.innerText = itemCount + " Items";

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

// INCREASE

function increaseQty(index){

cart[index].qty++;

loadCart();

}

// DECREASE

function decreaseQty(index){

if(cart[index].qty > 1){

cart[index].qty--;

}

loadCart();

}

// REMOVE

function removeItem(index){

cart.splice(index,1);

loadCart();

}

// SHIPPING

function goShipping(){

if(cart.length == 0){

alert("Cart Is Empty");

return;

}

document.getElementById("cartSection")
.style.display = "none";

document.getElementById("shippingSection")
.style.display = "block";

document.getElementById("step2")
.classList.add("active");

}

// PAYMENT

function goPayment(){

const name =
document.getElementById("name").value;

const phone =
document.getElementById("phone").value;

const address =
document.getElementById("address").value;

const city =
document.getElementById("city").value;

const pincode =
document.getElementById("pincode").value;

if(!name || !phone || !address || !city || !pincode){

alert("Please Fill All Fields");

return;

}

document.getElementById("shippingSection")
.style.display = "none";

document.getElementById("paymentSection")
.style.display = "block";

document.getElementById("step3")
.classList.add("active");

}

// PLACE ORDER

function placeOrder(){

document.getElementById("paymentSection")
.style.display = "none";

document.getElementById("successSection")
.style.display = "block";

document.getElementById("step4")
.classList.add("active");

const orderNumber =
"KM" + Math.floor(Math.random()*100000);

document.getElementById("orderId")
.innerText =
"Order ID : " + orderNumber;

localStorage.removeItem("cart");

}

// INITIAL LOAD

loadCart();