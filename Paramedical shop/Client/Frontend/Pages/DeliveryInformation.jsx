import React, { useEffect, useState } from "react";
import "../CSS/DeliveryInformation.css";

const DeliveryTracking = ({ delivered = false }) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [orderTime] = useState(new Date());
  const [deliveryTime] = useState(new Date(orderTime.getTime() + 6 * 60 * 60 * 1000));
  const [currentStatus, setCurrentStatus] = useState("confirmed");

  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    const difference = deliveryTime - now;
    
    if (difference <= 0) {
      return "00:00:00";
    }
    
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format time for display
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const elapsed = now - orderTime;
      const totalTime = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
      
      // Calculate progress percentage (0-75% for first 6 hours)
      let newProgress = Math.min(75, (elapsed / totalTime) * 75);
      
      // If delivered, progress goes to 100%
      if (delivered) {
        newProgress = 100;
        setCurrentStatus("delivered");
      } 
      // If 6 hours have passed, progress stays at 75% until delivered
      else if (elapsed >= totalTime) {
        newProgress = 75;
        setCurrentStatus("out-for-delivery");
      }
      // Update status based on progress
      else if (newProgress >= 50) {
        setCurrentStatus("shipped");
      }
      
      setProgress(newProgress);
      setTimeElapsed(elapsed);
    }, 1000);

    return () => clearInterval(timer);
  }, [delivered, orderTime]);

  return (
    <div className="delivery-container">
      <div className="delivery-card">
        {/* Header */}
        <div className="header">
          <div className="order-info">
            <h1>Delivery Tracking</h1>
            <p>Real-time updates on your order progress</p>
          </div>
          <div className="order-id">ORDER #3829B4</div>
        </div>

        {/* Delivery Time */}
        <div className="delivery-time">
          <div className="expected-delivery">
            <h3>Estimated Delivery</h3>
            <div className="time-display">
              <div className="time">{formatTime(deliveryTime)}</div>
              <div className="date">{formatDate(deliveryTime)}</div>
            </div>
          </div>
          <div className="countdown">
            <span className="clock-icon">⏱</span>
            <span>{getTimeRemaining()} remaining</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-header">
            <span>Order Placed</span>
            <span>Out for Delivery</span>
            <span>{delivered ? "Delivered" : "Expected Delivery"}</span>
          </div>
          
          <div className="timeline">
            <div 
              className="timeline-progress"
              style={{ width: `${progress}%` }}
            ></div>
            
            <div className="timeline-milestones">
              <div className={`milestone-dot ${progress >= 0 ? 'active' : ''}`}>
                <div className="milestone-label">Order Confirmed</div>
                <div className="milestone-time">{formatTime(orderTime)}</div>
              </div>
              
              <div className={`milestone-dot ${progress >= 25 ? 'active' : ''}`}>
                <div className="milestone-label">Processing</div>
                <div className="milestone-time">
                  {progress >= 25 ? formatTime(new Date(orderTime.getTime() + 1.5 * 60 * 60 * 1000)) : ''}
                </div>
              </div>
              
              <div className={`milestone-dot ${progress >= 50 ? 'active' : ''}`}>
                <div className="milestone-label">Shipped</div>
                <div className="milestone-time">
                  {progress >= 50 ? formatTime(new Date(orderTime.getTime() + 3 * 60 * 60 * 1000)) : ''}
                </div>
              </div>
              
              <div className={`milestone-dot ${progress >= 75 ? 'active' : ''}`}>
                <div className="milestone-label">Out for Delivery</div>
                <div className="milestone-time">
                  {progress >= 75 ? formatTime(new Date(orderTime.getTime() + 4.5 * 60 * 60 * 1000)) : ''}
                </div>
              </div>
              
              <div className={`milestone-dot ${progress >= 100 ? 'active' : 'delivered'}`}>
                <div className="milestone-label">Delivered</div>
                <div className="milestone-time">
                  {progress >= 100 ? formatTime(new Date()) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="current-status">
          <div className="status-header">Current Status</div>
          <div className={`status-indicator ${currentStatus}`}>
            <div className="status-icon">
              {currentStatus === "confirmed" && <span>✅</span>}
              {currentStatus === "shipped" && <span>📦</span>}
              {currentStatus === "out-for-delivery" && <span>🚚</span>}
              {currentStatus === "delivered" && <span>🏠</span>}
            </div>
            <div className="status-text">
              {currentStatus === "confirmed" && "Order Confirmed"}
              {currentStatus === "shipped" && "Shipped from Warehouse"}
              {currentStatus === "out-for-delivery" && "Out for Delivery"}
              {currentStatus === "delivered" && "Delivered Successfully"}
            </div>
          </div>
        </div>

        {/* Progress Bar with Milestones */}
        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="milestones">
            <div className={`milestone ${progress >= 0 ? 'active' : ''}`}>
              <div className="milestone-icon">
                <span>✅</span>
              </div>
              <div className="milestone-content">
                <div className="milestone-label">Confirmed</div>
                <div className="milestone-time">{formatTime(orderTime)}</div>
              </div>
            </div>

            <div className={`milestone ${progress >= 50 ? 'active' : ''}`}>
              <div className="milestone-icon">
                <span>📦</span>
              </div>
              <div className="milestone-content">
                <div className="milestone-label">Shipped</div>
                <div className="milestone-time">
                  {progress >= 50 ? formatTime(new Date(orderTime.getTime() + 3 * 60 * 60 * 1000)) : ''}
                </div>
              </div>
            </div>

            <div className={`milestone ${progress >= 75 ? 'active' : ''}`}>
              <div className="milestone-icon">
                <span>🚚</span>
              </div>
              <div className="milestone-content">
                <div className="milestone-label">Out for Delivery</div>
                <div className="milestone-time">
                  {progress >= 75 ? formatTime(new Date(orderTime.getTime() + 4.5 * 60 * 60 * 1000)) : ''}
                </div>
              </div>
            </div>

            <div className={`milestone ${progress >= 100 ? 'active delivered' : ''}`}>
              <div className="milestone-icon">
                <span>🏠</span>
              </div>
              <div className="milestone-content">
                <div className="milestone-label">Delivered</div>
                <div className="milestone-time">
                  {progress >= 100 ? formatTime(new Date()) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTracking;