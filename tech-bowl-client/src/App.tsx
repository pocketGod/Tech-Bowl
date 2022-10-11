import React, { createContext, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/starter/Login';
import Register from './components/starter/Register';
import Home from './components/general/Home';
import Explore from './components/items/Explore';
import Cart from './components/items/Cart';
import Navbar from './components/general/Navbar';
import Footer from './components/general/Footer';
import Profile from './components/general/Profile';
import About from './components/general/About';
import GameDashboard from './components/other/GameDashboard';


export const UserContext = React.createContext({userBalance:0, cartLength:0, loggedIn:false, cartItems:[''], cartTotal:0, shelfItems: [''], setUserBalance: '' as unknown as any, setCartLength: '' as unknown as any, setLoggedIn: '' as unknown as any, setCartItems: '' as unknown as any, setCartTotal: '' as unknown as any, setShelfItems: '' as unknown as any})

function App() {

  const [loggedIn, setLoggedIn] = useState<boolean>(localStorage.getItem('token')? true:false)
  const [userBalance, setUserBalance] = useState<number>(0)
  const [cartLength, setCartLength] = useState<number>(0)
  const [cartItems, setCartItems] = useState<string[]>([])
  const [shelfItems, setShelfItems] = useState<string[]>([])
  const [cartTotal, setCartTotal] = useState<number>(0)

  return (
    <div className="App">
      <ToastContainer
        // theme='dark'
        toastStyle={{ backgroundColor: "var(--dark)", color:'var(--light)', border:'1px solid var(--semi-dark)', fontFamily:'Josefin Sans', fontWeight:'500' }}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <Router>
        <UserContext.Provider value={{ userBalance, setUserBalance, cartLength, setCartLength, loggedIn, setLoggedIn, cartItems, setCartItems, cartTotal, setCartTotal, shelfItems, setShelfItems}}>
          {loggedIn ? <Navbar/> : <></>}
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/explore' element={<Explore/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/game' element={<GameDashboard/>}/>

            </Routes>
          {loggedIn ? <Footer/> : <></>}
        </UserContext.Provider>
         
        </Router>
    </div>
  );
}

export default App;
