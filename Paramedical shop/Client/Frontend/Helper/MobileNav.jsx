import React from 'react'
import '../CSS/SideBar.css'
const MobileNav = () => {
  return (
   <div>
    {/* Mobile Navigation */}
      <div className="navbar-mobile">
        <div className="mobile-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
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
        )}

        <div className="mobile-bottom-bar">
          {navItems.slice(0, 3).map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={activeItem === item.id ? 'active' : ''}
                onClick={() => handleItemClick(item.id)}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
   </div>
  )
}

export default MobileNav;