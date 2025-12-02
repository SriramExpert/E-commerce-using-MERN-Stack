// import React, { useState } from 'react'
// import '../css/Sidebar.css'

// const SideBar = () => {
//   const [activeItem, setActiveItem] = useState('home');
  
//   return (
//     <div className="sidenav-bar">
//       <ul>
//         <li className={activeItem === 'home' ? 'active' : ''}>
//           <a href="#" onClick={() => setActiveItem('home')}>
//             <i className="fas fa-home"></i>
//             <span>Home</span>
//           </a>
//         </li>
//         <li className={activeItem === 'cart' ? 'active' : ''}>
//           <a href="#" onClick={() => setActiveItem('cart')}>
//             <i className="fas fa-shopping-cart"></i>
//             <span>Cart</span>
//           </a>
//         </li>
//         <li className={activeItem === 'order' ? 'active' : ''}>
//           <a href="#" onClick={() => setActiveItem('order')}>
//             <i className="fas fa-clipboard-list"></i>
//             <span>Order Info</span>
//           </a>
//         </li>
//         <li className={activeItem === 'deals' ? 'active' : ''}>
//           <a href="#" onClick={() => setActiveItem('deals')}>
//             <i className="fas fa-tag"></i>
//             <span>Top Deals</span>
//           </a>
//         </li>
//         <li className={activeItem === 'profile' ? 'active' : ''}>
//           <a href="#" onClick={() => setActiveItem('profile')}>
//             <i className="fas fa-user"></i>
//             <span>Profile</span>
//           </a>
//         </li>
//       </ul>
//     </div>
//   )
// }

// export default SideBar;
import React, { useState } from 'react';
import '../CSS/SideBar.css';
import { Home, ShoppingCart, ClipboardList, Tag, User, Menu, X } from 'lucide-react';

const SideBar = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'order', label: 'Order Info', icon: ClipboardList },
    { id: 'deals', label: 'Top Deals', icon: Tag },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Desktop Navigation */}
      <div className="navbar-desktop">
        

        <ul className="nav-items">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.id} className={activeItem === item.id ? 'active' : ''}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.id);
                  }}
                >
                  <IconComponent size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

       
      </div>

      
    </nav>
  );
};

export default SideBar;