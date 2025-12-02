import React, { useState } from 'react';
import '../CSS/Cart-Page.css';

const CartPage = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 129.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      name: "Wireless Charging Pad",
      price: 39.99,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2lyZWxlc3MlMjBjaGFyZ2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? {...item, quantity: newQuantity} : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-container">
      <div className="cart-heading">
        <h5>Your Cart ({items.length} items)</h5>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="product-info">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p className="product-name">{item.name}</p>
                        <p className="product-sku">SKU: {item.id}2479</p>
                      </div>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Grand Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <div className="or-divider">
              <span>OR</span>
            </div>

            <div className="payment-options">
              <button className="continue-btn">
                Continue Shopping
              </button>
              
              <button className="gpay-btn">
                <i className="fab fa-google-pay"></i>
                Google Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;