//  function sendMessage() {
//         const input = document.getElementById("messageInput");
//         const chatBody = document.getElementById("chatBody");

//         if (input.value.trim() === "") return;

//         const msg = document.createElement("div");
//         msg.className = "message buyer";
//         msg.innerText = input.value;

//         chatBody.appendChild(msg);
//         input.value = "";
//         chatBody.scrollTop = chatBody.scrollHeight;

//         setTimeout(() => {
//             const reply = document.createElement("div");
//             reply.className = "message farmer";
//             reply.innerText = "Yes, fresh stock is available.";
//             chatBody.appendChild(reply);
//             chatBody.scrollTop = chatBody.scrollHeight;
//         }, 700);
//     }


//     function toggleMenu() {
//   document.getElementById("navMenu").classList.toggle("show");
// }

// const openPopup = document.getElementById("openPopup");
// const popup = document.getElementById("locationPopup");
// const closeBtn = document.querySelector(".close");

// openPopup.onclick = () => {
//   popup.style.display = "flex";
// };

// closeBtn.onclick = () => {
//   popup.style.display = "none";
// };

// popup.onclick = (e) => {
//   if (e.target === popup) {
//     popup.style.display = "none";
//   }
// };



// function toggleMenu() {
//   document.getElementById("navMenu").classList.toggle("active");
// }


//  // CART DRAWER FUNCTIONALITY
//   const cartToggle = document.getElementById('cartToggle');
//   const cartDrawer = document.getElementById('cartDrawer');
//   const closeCart = document.getElementById('closeCart');
//   const overlay = document.getElementById('overlay');

//   cartToggle.addEventListener('click', (e) => {
//     e.preventDefault();
//     cartDrawer.classList.add('active');
//     overlay.classList.add('active');
//   });

//   closeCart.addEventListener('click', () => {
//     cartDrawer.classList.remove('active');
//     overlay.classList.remove('active');
//   });

//   overlay.addEventListener('click', () => {
//     cartDrawer.classList.remove('active');
//     overlay.classList.remove('active');
//   });

//   // Remove cart item
//   document.querySelectorAll('.remove-item').forEach((btn) => {
//     btn.addEventListener('click', () => {
//       const item = btn.closest('.cart-item');
//       item.remove();
//       // Optionally update totals here
//     });
//   });


//   function toggleMenu() {
//   const nav = document.getElementById("navMenu");
//   nav.classList.toggle("show");
//   document.body.classList.toggle("menu-open");
// }

// /* click outside closes menu */
// document.addEventListener("click", function (e) {
//   const nav = document.getElementById("navMenu");
//   const menuIcon = document.querySelector(".menu-icon");

//   if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
//     nav.classList.remove("show");
//     document.body.classList.remove("menu-open");
//   }
// });


  
function send() {
    let input = document.getElementById("input");
    let text = input.value.toLowerCase().trim();
    if (text === "") return;

    let chatBox = document.getElementById("chatBox");

    // USER MESSAGE
    let userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.textContent = input.value;
    chatBox.appendChild(userMsg);

    let reply = "";

    // 🌱 GREETING
    if (text.includes("hi") || text.includes("hello")) {
        reply = "Hi 😊  How can I help you today?";
    }

    // 🍅 TODAY MARKET PRICE
    else if (text.includes("tomato") && text.includes("price")) {
        reply = "🍅 Today’s tomato price is ₹50 per kg.";
    }

    // 💰 GENERAL MARKET PRICE
    else if (text.includes("price") || text.includes("market")) {
        reply = "📊 Today's Market Prices:\n🍅 Tomato - ₹50/kg\n🧅 Onion - ₹40/kg\n🥔 Potato - ₹25/kg\n🥕 Carrot - ₹30/kg";
    }

    // 📉 LOW PRICE PROBLEM
    else if (text.includes("low price") || text.includes("less price")) {
        reply = "Prices may vary daily 😔\nYou can store your crops or sell directly to customers for better profit.";
    }

    // 🛒 SELL DIRECTLY
    else if (text.includes("sell") || text.includes("direct")) {
        reply = "You can sell directly by:\n1. Adding your product\n2. Setting price\n3. Customers will order from you 🛒";
    }

    // 💰 PAYMENT
    else if (text.includes("payment") || text.includes("money")) {
        reply = "💰 You will receive payment within 24 hours after delivery.";
    }

    // 🚚 DELIVERY
    else if (text.includes("delivery") || text.includes("time")) {
        reply = "🚚 Delivery will be arranged same day or next day based on location.";
    }

    // 📦 ORDER STEPS
    else if (text.includes("order") || text.includes("how to buy")) {
        reply = "🛒 Steps to order:\n1. Select product\n2. Add to cart\n3. Enter address\n4. Place order ✅";
    }

    // ❗ PROBLEM
    else if (text.includes("problem") || text.includes("issue")) {
        reply = "😔 Sorry for the issue.\nPlease go to Contact page or call 9876543210.";
    }

    // 🙏 THANK YOU
    else if (text.includes("thank")) {
        reply = "🙏 Thank you for your hard work. We are happy to support farmers 🌾";
    }

    // DEFAULT
    else {
        reply = "You can ask:\n✔ Today's market price\n✔ Sell products\n✔ Delivery details\n✔ Payment info 🙂";
    }

    // BOT MESSAGE
    let botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = reply;

    setTimeout(() => {
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    input.value = "";
}

// ENTER KEY
function enterKey(e) {
    if (e.key === "Enter") send();
}