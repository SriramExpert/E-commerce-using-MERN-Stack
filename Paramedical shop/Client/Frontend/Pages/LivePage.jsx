import React, { useEffect, useState, useRef } from 'react';
import '../CSS/LivePage.css';


const LivePage = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: "Flash Sale",
      description: "50% off on all electronics - Limited time only!",
      badge: "HOT",
      timeLeft: "02:15:33",
      color: "#ff7e5f",
      position: 0
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "Buy one pizza, get one free. Use code: WEEKEND",
      badge: "NEW",
      timeLeft: "01:20:45",
      color: "#00c9ff",
      position: 1
    },
    {
      id: 3,
      title: "Free Delivery",
      description: "Order above $50 and get free delivery anywhere!",
      badge: "SALE",
      timeLeft: "03:45:12",
      color: "#67b26f",
      position: 2
    },
    {
      id: 4,
      title: "Clearance Event",
      description: "Up to 70% off on summer collection. Hurry!",
      badge: "LAST CHANCE",
      timeLeft: "00:45:18",
      color: "#ffd166",
      position: 3
    },
    {
      id: 5,
      title: "Member Discount",
      description: "Extra 10% off for premium members. Apply code: PREMIUM10",
      badge: "EXCLUSIVE",
      timeLeft: "05:30:25",
      color: "#a166ff",
      position: 4
    }
  ]);

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollSpeed = useRef(1); // Use ref to avoid closure issues

  useEffect(() => {
    // Function to update timer every second
    const timerInterval = setInterval(() => {
      setOffers(prevOffers => 
        prevOffers.map(offer => {
          let [hours, minutes, seconds] = offer.timeLeft.split(':').map(Number);
          
          // Decrement time
          seconds--;
          if (seconds < 0) {
            seconds = 59;
            minutes--;
            if (minutes < 0) {
              minutes = 59;
              hours--;
              if (hours < 0) {
                // Reset timer if expired
                hours = Math.floor(Math.random() * 3) + 1;
                minutes = Math.floor(Math.random() * 60);
                seconds = Math.floor(Math.random() * 60);
              }
            }
          }
          
          // Format time back to string
          const formatTime = (value) => value.toString().padStart(2, '0');
          return {
            ...offer,
            timeLeft: `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
          };
        })
      );
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Start the continuous scrolling animation
    const startScrolling = () => {
      const container = containerRef.current;
      const content = contentRef.current;
      
      if (!container || !content) return;
      
      // Reset position to start
      container.scrollLeft = 0;
      
      const animate = () => {
        if (!isPaused && container && content) {
          // Check if we've reached the end of the original content
          if (container.scrollLeft >= content.scrollWidth / 2) {
            // Jump back to the beginning (but keep the scroll position visually the same)
            container.scrollLeft = container.scrollLeft - content.scrollWidth / 2;
          } else {
            // Continue scrolling
            container.scrollLeft += scrollSpeed.current;
          }
        }
        animationRef.current = requestAnimationFrame(animate);
      };
      
      // Start the animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start scrolling after a brief delay
    const scrollTimeout = setTimeout(startScrolling, 1000);

    // Cleanup
    return () => {
      clearTimeout(scrollTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Handle mouse events to pause/resume scrolling
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Duplicate the offers for seamless scrolling
  const duplicatedOffers = [...offers, ...offers];

  return (
    <div className="live-offers-page dark-theme">
      <div className="header">
        <h1>Live Exclusive Offers</h1>
        <p>Limited time deals - Grab them before they're gone!</p>
      </div>

      <div 
        className="scrolling-container" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="horizontal-offers-container" ref={containerRef}>
          <div className="offers-content" ref={contentRef}>
            {duplicatedOffers.map((offer, index) => (
              <div 
                key={`${offer.id}-${index}`} 
                className="offer-card"
                style={{ 
                  '--accent-color': offer.color,
                }}
              >
                <div className="badge" style={{ backgroundColor: offer.color }}>
                  {offer.badge}
                </div>
                <h2>{offer.title}</h2>
                <p>{offer.description}</p>
                <div className="timer">⏳ {offer.timeLeft}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="scrolling-gradient left"></div>
        <div className="scrolling-gradient right"></div>
        
        <div className="scroll-indicator">
          <span className={isPaused ? "paused" : ""}>
            {isPaused ? "Scroll Paused" : "Auto Scrolling"}
          </span>
        </div>
      </div>

      <div className="footer">
        <p>Check back often for new exciting offers! 🔥</p>
      </div>
    </div>
  );
};

export default LivePage;