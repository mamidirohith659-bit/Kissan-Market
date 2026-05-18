// ======================
// GET CART DATA
// ======================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");

// ======================
// LOAD CART ITEMS
// ======================

function loadCart() {

    cartItems.innerHTML = "";

    let subtotal = 0;

    let itemCount = 0;

    // EMPTY CART

    if(cart.length === 0){

        cartItems.innerHTML = `
        
        <div style="text-align:center; padding:30px;">
            <h3>Your Cart Is Empty</h3>
        </div>

        `;

        document.getElementById("subtotal").innerText = "₹0";
        document.getElementById("tax").innerText = "₹0";
        document.getElementById("total").innerText = "₹0";
        document.getElementById("cartCount").innerText = "0 Items";

        return;
    }

    // LOAD PRODUCTS

    cart.forEach((item, index) => {

        // DEFAULT QUANTITY

        if(!item.qty){
            item.qty = 1;
        }

        subtotal += item.price * item.qty;

        itemCount += item.qty;

        cartItems.innerHTML += `

        <div class="product-card">

            <div class="product-left">

                <img src="${item.image}" class="product-img">

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

                        <span>${item.qty}</span>

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

    // TAX & TOTAL

    let shipping = 50;

    let tax = subtotal * 0.05;

    let total = subtotal + shipping + tax;

    document.getElementById("subtotal").innerText =
    "₹" + subtotal.toFixed(2);

    document.getElementById("tax").innerText =
    "₹" + tax.toFixed(2);

    document.getElementById("total").innerText =
    "₹" + total.toFixed(2);

    document.getElementById("cartCount").innerText =
    itemCount + " Items";

    // SAVE UPDATED CART

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

// ======================
// INCREASE QTY
// ======================

function increaseQty(index){

    cart[index].qty++;

    saveCart();

}

// ======================
// DECREASE QTY
// ======================

function decreaseQty(index){

    if(cart[index].qty > 1){

        cart[index].qty--;

    }

    saveCart();

}

// ======================
// REMOVE ITEM
// ======================

function removeItem(index){

    cart.splice(index, 1);

    saveCart();

}

// ======================
// SAVE CART
// ======================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}

// ======================
// SHIPPING PAGE
// ======================

function goShipping(){

    if(cart.length === 0){

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

// ======================
// PAYMENT PAGE
// ======================

function goPayment(){

    const name =
    document.getElementById("name").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const address =
    document.getElementById("address").value.trim();

    const city =
    document.getElementById("city").value.trim();

    const pincode =
    document.getElementById("pincode").value.trim();

    // VALIDATION

    if(!name || !phone || !address || !city || !pincode){

        alert("Please Fill All Fields");

        return;
    }

    // STORE SHIPPING DATA

    const shippingData = {
        name,
        phone,
        address,
        city,
        pincode
    };

    localStorage.setItem(
        "shippingData",
        JSON.stringify(shippingData)
    );

    document.getElementById("shippingSection")
    .style.display = "none";

    document.getElementById("paymentSection")
    .style.display = "block";

    document.getElementById("step3")
    .classList.add("active");
}

// ======================
// PLACE ORDER
// ======================

function placeOrder(){

    const paymentMethod =
    document.getElementById("paymentMethod").value;

    const orderNumber =
    "KM" + Math.floor(Math.random() * 100000);

    // STORE ORDER

    const orderData = {
        orderId: orderNumber,
        items: cart,
        payment: paymentMethod,
        date: new Date().toLocaleString()
    };

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(orderData)
    );

    // SHOW SUCCESS

    document.getElementById("paymentSection")
    .style.display = "none";

    document.getElementById("successSection")
    .style.display = "block";

    document.getElementById("step4")
    .classList.add("active");

    document.getElementById("orderId")
    .innerText =
    "Order ID : " + orderNumber;

    // CLEAR CART

    localStorage.removeItem("cart");

    cart = [];
}

// ======================
// INITIAL LOAD
// ======================

loadCart();