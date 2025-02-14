let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Update cart UI and localStorage
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        
        // Add increment and decrement buttons
        const incrementBtn = document.createElement('button');
        incrementBtn.textContent = '+';
        incrementBtn.onclick = () => updateQuantity(item.name, 1);
        
        const decrementBtn = document.createElement('button');
        decrementBtn.textContent = '-';
        decrementBtn.onclick = () => updateQuantity(item.name, -1);
        
        li.appendChild(incrementBtn);
        li.appendChild(decrementBtn);
        cartItems.appendChild(li);
        
        total += item.price * item.quantity;
        count += item.quantity;
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update quantity (increment or decrement)
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== name);  // Remove item if quantity is 0
        }
    }
    updateCart();
}

// Function to clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Toggle cart visibility
function toggleCart() {
    document.getElementById('cart').classList.toggle('visible');
}

updateCart();