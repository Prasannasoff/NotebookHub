import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './Components/Navbar';
import Home from './Pages/Home';
import CustomOrderPage from './Pages/CustomOrderPage';
import TrackingPage from './Pages/TrackingPage';
import ShopPage from './Pages/ShopPage';
import ChatPage from './Pages/ChatPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import AdminDashboard from './Pages/Admin/AdminDashboard';
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/custom' element={<CustomOrderPage />}></Route>
        <Route path='/tracking' element={<TrackingPage />}></Route>
        <Route path='/shop' element={<ShopPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/admin' element={<AdminDashboard />}></Route>



        <Route path='/chat' element={<ChatPage />}></Route>
      </Routes>
    </Router>

  )
}

export default App
