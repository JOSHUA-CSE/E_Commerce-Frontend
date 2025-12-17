import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Cart from './Components/Cart.jsx'
import Login from './Components/Login.jsx'
import HomeLayout from './Layouts/HomeLayout.jsx'
import ProductList from './Components/ProductList.jsx'
import ProductDetails from './Components/ProductDetails.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import AdminPage from './Components/AdminPage.jsx'
import Orders from './Components/Orders.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <>
    <ToastContainer/>
    <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout/>}>
            <Route path="/" element={<App />} />
            <Route path="/products">
              <Route index element={<ProductList/>}/>
              <Route path=':id' element={<ProductDetails/>}/>
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPage/>
              </ProtectedRoute>
            }/>

        </Routes>
          
        
    </BrowserRouter>
    </>

)