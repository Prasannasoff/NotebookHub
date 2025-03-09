import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from './Components/Navbar';
import Home from './Pages/Home';
import CustomOrderPage from './Pages/CustomOrderPage';
import TrackingPage from './Pages/TrackingPage';
import ShopPage from './Pages/ShopPage';
import ChatPage from './Pages/ChatPage';
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/custom' element={<CustomOrderPage />}></Route>
        <Route path='/tracking' element={<TrackingPage />}></Route>
        <Route path='/shop' element={<ShopPage />}></Route>
        <Route path='/chat' element={<ChatPage />}></Route>




      </Routes>
    </Router>

  )
}

export default App
