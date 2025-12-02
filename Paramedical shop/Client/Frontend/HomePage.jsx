// import BaseDesign from './Component/BaseDesign.jsx'
// import Header from './Helper/header.jsx'
// import SideBar from './Helper/SideBar.jsx'
// import CartPage from './Pages/CartPage.jsx'
// import DeliveryInformation from './Pages/DeliveryInformation.jsx'
// import LivePage from './Pages/LivePage.jsx'
// import OrderHistory  from './Pages/OrderHistory.jsx'
// import ProductList from './Pages/ProductList.jsx'
// import ProfilePage from './Pages/ProfilePage.jsx'
//  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// const HomePage = () => {
//   const router=createBrowserRouter([
//     {
//       path:"/",
//       element:<LivePage />
//     },
//     {
//         path: "/cart-page",
//         element: <CartPage />
//     },
//     {
//         path: "/delivery",
//         element: <DeliveryInformation />
//     },
//     {
//         path: "/orders",
//         element: <OrderHistory />
//     },
//     {
//         path: "/profile",
//         element: <ProfilePage />
//     },


//   ])
//   return (
//     <>
//     {/* <Header />
//     <SideBar /> */}
//     {/* <RouterProvider router={router} ></RouterProvider>  */}
//     {/* <ProductList /> */}
//     {/* <BaseDesign /> */}
//     </>
    
//   )
// }

// export default HomePage;

import { useEffect } from 'react';
import { useAuth } from '../../Context/authContext';
import BaseDesign from './Component/BaseDesign.jsx';
import Header from '../Helper/header.jsx';
import SideBar from './Helper/SideBar.jsx';
import CartPage from './Pages/CartPage.jsx';
import DeliveryInformation from './Pages/DeliveryInformation.jsx';
import LivePage from './Pages/LivePage.jsx';
import OrderHistory from './Pages/OrderHistory.jsx';
import ProductList from './Pages/ProductList.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

const HomePage = () => {
  const { userLoggedIn } = useAuth();

  // Redirect to login if not authenticated
  if (!userLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LivePage />
    },
    {
      path: "/cart-page",
      element: <CartPage />
    },
    {
      path: "/delivery",
      element: <DeliveryInformation />
    },
    {
      path: "/orders",
      element: <OrderHistory />
    },
    {
      path: "/profile",
      element: <ProfilePage />
    },
    {
      path: "/products",
      element: <ProductList />
    }
  ]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="homepage-content">
        <SideBar />
        <main className="main-content">
          <RouterProvider router={router} />
        </main>
      </div>
    </div>
  );
}

export default HomePage;