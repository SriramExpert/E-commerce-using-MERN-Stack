import React, { useState } from 'react';
import '../CSS/ProductList.css'
// import { ChevronDown, ChevronUp, Search, ShoppingCart, Heart } from 'lucide-react';
import LivePage from './LivePage';
 import SideBar from '../Helper/SideBar';
 import '../CSS/SideBar.css'
// import MobileNav from '../Helper/MobileNav';

// const PharmacyCatalog = () => {
//   const [activeDepartment, setActiveDepartment] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [cartCount, setCartCount] = useState(0);

//   const departments = [
//     {
//       id: 1,
//       name: "Tablets & Capsules",
//       icon: "💊",
//       categories: [
//         "Pain / Fever tablets",
//         "Antibiotic tablets",
//         "Diabetes tablets",
//         "BP / Heart tablets",
//         "Vitamin & Mineral tablets",
//         "Multivitamin capsules"
//       ]
//     },
//     {
//       id: 2,
//       name: "Syrups & Liquids",
//       icon: "🍶",
//       categories: [
//         "Cough syrups",
//         "Fever syrups (kids)",
//         "Antacid syrups",
//         "Vitamin syrups",
//         "Tonic (Iron, Liver, etc.)",
//         "ORS solution"
//       ]
//     },
//     {
//       id: 3,
//       name: "Injections",
//       icon: "💉",
//       categories: [
//         "Pain killer injections",
//         "Vitamin injections",
//         "Insulin injections",
//         "Antibiotic injections"
//       ]
//     },
//     {
//       id: 4,
//       name: "Drops",
//       icon: "👁️",
//       categories: [
//         "Eye drops",
//         "Ear drops",
//         "Nasal drops",
//         "Pediatric vitamin drops"
//       ]
//     },
//     {
//       id: 5,
//       name: "Ointments / Creams / Gels",
//       icon: "🧴",
//       categories: [
//         "Pain relief ointment / gel",
//         "Antifungal cream",
//         "Antiseptic ointment",
//         "Burn cream",
//         "Skin care cream (Moisturizer, Sunscreen)"
//       ]
//     },
//     {
//       id: 6,
//       name: "Powders & Sachets",
//       icon: "📦",
//       categories: [
//         "ORS powder",
//         "Protein powder",
//         "Baby milk powder",
//         "Chyawanprash / Herbal powder",
//         "Health drink powders (Horlicks, Bournvita)"
//       ]
//     },
//     {
//       id: 7,
//       name: "Medical Devices",
//       icon: "🩺",
//       categories: [
//         "Thermometer",
//         "BP monitor",
//         "Glucometer + strips",
//         "Oximeter",
//         "Nebulizer",
//         "Vaporizer",
//         "Syringe (disposable)",
//         "Surgical gloves",
//         "Face masks (3-ply, N95)"
//       ]
//     },
//     {
//       id: 8,
//       name: "First Aid & Dressings",
//       icon: "🩹",
//       categories: [
//         "Bandages",
//         "Adhesive band-aid",
//         "Cotton rolls",
//         "Gauze pads",
//         "Surgical tape",
//         "Pain relief spray",
//         "Antiseptic solution"
//       ]
//     },
//     {
//       id: 9,
//       name: "Baby & Mother Care",
//       icon: "👶",
//       categories: [
//         "Baby soap / shampoo",
//         "Baby powder",
//         "Diapers",
//         "Baby wipes",
//         "Feeding bottles",
//         "Infant formula"
//       ]
//     },
//     {
//       id: 10,
//       name: "Personal Care & Hygiene",
//       icon: "🧼",
//       categories: [
//         "Soap / Handwash",
//         "Toothpaste / Toothbrush",
//         "Mouthwash",
//         "Shampoo / Conditioner",
//         "Lotion / Cold cream",
//         "Sanitary pads",
//         "Adult diapers",
//         "Shaving items"
//       ]
//     }
//   ];

//   const filteredCategories = departments
//     .find(dept => dept.id === activeDepartment)?.categories
//     .filter(category => 
//       category.toLowerCase().includes(searchQuery.toLowerCase())
//     ) || [];

//   const addToCart = () => {
//     setCartCount(prev => prev + 1);
//   };

//   return (
//     <div className="pharmacy-catalog">
//       <header className="catalog-header">
//        {/* <MobileNav /> */}
//         <div className="header-top">
//           <h1>MediCare Pharmacy</h1>
//           <div className="header-actions">
//             <button className="icon-button">
//               <Heart size={20} />
//             </button>
//             <button className="icon-button cart-button">
//               <ShoppingCart size={20} />
//               {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//             </button>
//           </div>
//         </div>
        
//         <div className="search-bar">
//           <Search size={20} />
//           <input 
//             type="text" 
//             placeholder="Search for medicines, health products..." 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </header>

//       <SideBar />
//       <LivePage />
      

//       <div className="catalog-content">
//         <nav className="department-nav">
//           {departments.map(dept => (
//             <button
//               key={dept.id}
//               className={`nav-item ${activeDepartment === dept.id ? 'active' : ''}`}
//               onClick={() => setActiveDepartment(dept.id)}
//             >
//               <span className="nav-icon">{dept.icon}</span>
//               <span className="nav-text">{dept.name}</span>
//             </button>
//           ))}
//         </nav>

//         <main className="products-main">
//           <div className="department-header">
//             <h2>
//               {departments.find(d => d.id === activeDepartment)?.icon}
//               {" "}
//               {departments.find(d => d.id === activeDepartment)?.name}
//             </h2>
//             <p>Browse our range of {departments.find(d => d.id === activeDepartment)?.name.toLowerCase()}</p>
//           </div>

//           <div className="category-grid">
//             {filteredCategories.map((category, index) => (
//               <div key={index} className="category-card">
//                 <div className="category-content">
//                   <h3>{category}</h3>
//                   <p>View products</p>
//                 </div>
//                 <button className="add-to-cart-btn" onClick={addToCart}>
//                   <ShoppingCart size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {filteredCategories.length === 0 && (
//             <div className="no-results">
//               <p>No categories found for "{searchQuery}"</p>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default PharmacyCatalog;
// import React, { useState, useEffect } from 'react';

// import { ChevronDown, ChevronUp, Search, ShoppingCart, Heart } from 'lucide-react';

// import { fetchDepartments, fetchProductsByDepartment, searchProducts } from '../services/api';

const PharmacyCatalog = () => {
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('products'); // 'products' or 'categories'

  // Fetch departments on component mount
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        setLoading(true);
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
        
        // Set initial active department to first one
        if (departmentsData.length > 0) {
          setActiveDepartment(departmentsData[0]._id);
        }
      } catch (err) {
        setError('Failed to load departments');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadDepartments();
  }, []);

  // Fetch products when department changes
  useEffect(() => {
    const loadDepartmentProducts = async () => {
      if (!activeDepartment || !departments.length) return;
      
      try {
        setLoading(true);
        const data = await fetchProductsByDepartment(activeDepartment, 1, 12);
        setProducts(data.products || []);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (activeDepartment) {
      loadDepartmentProducts();
    }
  }, [activeDepartment, departments]);

  // Handle search
  useEffect(() => {
    const searchProductsHandler = async () => {
      if (searchQuery.trim() === '') {
        // If search is cleared, reload department products
        if (activeDepartment) {
          const data = await fetchProductsByDepartment(activeDepartment);
          setProducts(data.products || []);
        }
        return;
      }
      
      try {
        setLoading(true);
        const data = await searchProducts(searchQuery);
        setProducts(data.products || []);
        setViewMode('products');
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      if (searchQuery !== '') {
        searchProductsHandler();
      }
    }, 500); // Debounce search
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, activeDepartment]);

  // Filter categories based on search
  const filteredCategories = activeDepartment 
    ? departments
        .find(dept => dept._id === activeDepartment)?.categories
        ?.filter(category => 
          category.toLowerCase().includes(searchQuery.toLowerCase())
        ) || []
    : [];

  // Add to cart function
  const addToCart = (product) => {
    setCartCount(prev => prev + 1);
    // Here you would typically dispatch to Redux or context
    console.log('Added to cart:', product.name);
  };

  // Handle department click
  const handleDepartmentClick = (deptId) => {
    setActiveDepartment(deptId);
    setSearchQuery('');
    setViewMode('products');
  };

  // Get active department name
  const activeDept = departments.find(d => d._id === activeDepartment);

  if (loading && !departments.length) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading departments...</p>
      </div>
    );
  }

  if (error && !products.length) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pharmacy-catalog">
      <header className="catalog-header">
        {/* <MobileNav /> */}
        <div className="header-top">
          <h1>MediCare Pharmacy</h1>
          <div className="header-actions">
            <button className="icon-button" title="Wishlist">
              <Heart size={20} />
            </button>
            <button className="icon-button cart-button" title="Cart">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
          </div>
        </div>
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search for medicines, health products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </header>
      
      <SideBar />
      <LivePage />
      
      <div className="catalog-content">
        <nav className="department-nav">
          {departments.map(dept => (
            <button 
              key={dept._id} 
              className={`nav-item ${activeDepartment === dept._id ? 'active' : ''}`}
              onClick={() => handleDepartmentClick(dept._id)}
              title={dept.name}
            >
              <span className="nav-icon">{dept.icon}</span>
              <span className="nav-text">{dept.name}</span>
            </button>
          ))}
        </nav>
        
        <main className="products-main">
          <div className="department-header">
            <h2>
              {activeDept?.icon} {activeDept?.name}
            </h2>
            <p>Browse our range of {activeDept?.name?.toLowerCase() || 'products'}</p>
            
            {/* View Toggle */}
            {products.length > 0 && (
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'products' ? 'active' : ''}`}
                  onClick={() => setViewMode('products')}
                >
                  Products
                </button>
                <button 
                  className={`view-btn ${viewMode === 'categories' ? 'active' : ''}`}
                  onClick={() => setViewMode('categories')}
                >
                  Categories
                </button>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="loading-products">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              {viewMode === 'products' && products.length > 0 && (
                <div className="product-grid">
                  {products.map(product => (
                    <div key={product._id} className="product-card">
                      <div className="product-image-container">
                        {product.images && product.images[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name} 
                            className="product-image"
                            onError={(e) => {
                              e.target.src = '/images/placeholder-medicine.jpg';
                            }}
                          />
                        ) : (
                          <div className="product-image-placeholder">
                            <span className="placeholder-icon">💊</span>
                          </div>
                        )}
                        {product.requiresPrescription && (
                          <span className="prescription-badge" title="Prescription Required">
                            Rx
                          </span>
                        )}
                        {product.stock === 0 && (
                          <span className="out-of-stock-badge">Out of Stock</span>
                        )}
                      </div>
                      
                      <div className="product-info">
                        <h3 className="product-name" title={product.name}>
                          {product.name.length > 50 
                            ? product.name.substring(0, 50) + '...' 
                            : product.name}
                        </h3>
                        
                        {product.genericName && (
                          <p className="generic-name" title={product.genericName}>
                            Generic: {product.genericName.length > 30 
                              ? product.genericName.substring(0, 30) + '...' 
                              : product.genericName}
                          </p>
                        )}
                        
                        <p className="product-brand">Brand: {product.brand}</p>
                        
                        <div className="product-price">
                          <span className="current-price">
                            ₹{product.discountPrice || product.price}
                          </span>
                          {product.discountPrice && product.discountPrice < product.price && (
                            <span className="original-price">₹{product.price}</span>
                          )}
                          {product.discountPrice && (
                            <span className="discount-percent">
                              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                            </span>
                          )}
                        </div>
                        
                        <div className="product-meta">
                          <span className="stock-status">
                            {product.stock > 0 ? (
                              <span className="in-stock">
                                In Stock ({product.stock})
                              </span>
                            ) : (
                              <span className="out-of-stock">Out of Stock</span>
                            )}
                          </span>
                          
                          {product.strength && (
                            <span className="product-strength">{product.strength}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="product-actions">
                        <button 
                          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          title={product.stock > 0 ? 'Add to cart' : 'Out of stock'}
                        >
                          <ShoppingCart size={16} />
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        
                        <button 
                          className="wishlist-btn"
                          title="Add to wishlist"
                        >
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Categories Grid */}
              {viewMode === 'categories' && (
                <div className="category-grid">
                  {filteredCategories.map((category, index) => (
                    <div key={index} className="category-card">
                      <div className="category-content">
                        <h3>{category}</h3>
                        <p>View all {category.toLowerCase()} products</p>
                      </div>
                      <button 
                        className="view-category-btn"
                        onClick={() => {
                          // Here you would navigate to category page
                          console.log('View category:', category);
                        }}
                      >
                        View Products →
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {products.length === 0 && filteredCategories.length === 0 && searchQuery && (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <p>No products found for "{searchQuery}"</p>
                  <button 
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </button>
                </div>
              )}
              
              {/* No Products in Department */}
              {products.length === 0 && !searchQuery && activeDept && (
                <div className="no-products">
                  <div className="no-products-icon">📦</div>
                  <p>No products available in {activeDept.name} department</p>
                  <p className="sub-text">Check back soon or browse other departments</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PharmacyCatalog;