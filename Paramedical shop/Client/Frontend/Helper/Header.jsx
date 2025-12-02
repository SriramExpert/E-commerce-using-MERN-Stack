import React, { useState } from 'react'
import '../css/headerCss.css'

const Header = () => {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className='container'>
      <div>
        <img src="logo.png" alt="Logo" />
      </div>

      <div className='searchAction'>            
        <input type='text' id='search' placeholder='search' />          
      </div>

      <div className='cart'>
        <img src="cart.png" alt="Cart" />
        <h3>Cart</h3>
        <p>{cartCount}</p>
      </div>
    </div>
  )
}

export default Header
