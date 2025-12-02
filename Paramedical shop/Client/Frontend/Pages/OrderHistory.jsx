import React, { useState } from 'react';

const OrderHistory = () => {
    
  
      const [orders, setOrders] = useState([
        {
          id: 'ORD-7892',
          date: 'Oct 12, 2023',
          items: 3,
          amount: '$147.99',
          status: 'Delivered'
        },
        {
          id: 'ORD-7814',
          date: 'Sep 28, 2023',
          items: 2,
          amount: '$89.50',
          status: 'Delivered'
        },
        {
          id: 'ORD-7733',
          date: 'Sep 15, 2023',
          items: 5,
          amount: '$245.75',
          status: 'Processing'
        },
        {
          id: 'ORD-7651',
          date: 'Aug 29, 2023',
          items: 1,
          amount: '$49.99',
          status: 'Delivered'
        }
      ]);
    
  return (
    <div className="profile-details-container">
        <div className="profile-header">
        <h1>Order Details</h1>
        <p>Manage your order information and review your activity</p>
      </div>
        {/* Order History Card */}
          <div className="info-card">
            <h3>Order History</h3>
            
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Date</span>
                <span>Items</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              
              <div className="table-body">
                {orders.map((order, index) => (
                  <div key={index} className="table-row">
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                    <span className="order-items">{order.items} items</span>
                    <span className="order-amount">{order.amount}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="view-all-btn">
              View All Orders <i className="fas fa-arrow-right"></i>
            </button>
          </div>
    </div>)
}


export default OrderHistory;