import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { getBriefedCart } from "../../services/CartService";
import { successMessage } from "../../services/ToastService";
import { getUserBalance, getUserName } from "../../services/UserService";

interface NavbarProps {
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {

    const userBrief = useContext(UserContext)


    useEffect(() => {
        getUserBalance().then((result)=>{
            userBrief.setUserBalance(result.data.money)
            
        }).catch((err)=>console.log(err))

        getBriefedCart().then((result)=>{
            userBrief.setCartLength(result.data.cartLength)
            userBrief.setCartItems(result.data.itemsIDArr)
            
            
        }).catch((err)=>{console.log(err)})

        
    }, []);

    const navigate = useNavigate()

    const handleLogout = ()=>{
        userBrief.setLoggedIn(false)
        successMessage(`Goodbye ${getUserName()}, You Have Logged Out Successfully`)
        localStorage.removeItem('token')
        navigate('/')
    }
    return ( <>
        <nav className="navbar navbar-expand-lg navbar-dark main-nav">
            <div className="container-fluid">
                <NavLink className="nav-link fs-5 mx-3" aria-current="page" to="/home">
                    <img src="/logo-with-text.png" className="navbar-banner"/>
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" aria-current="page" to="/explore">Explore</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" to="/game">Earn Credits</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5 mx-3" to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/cart" type="button" className="nav-link me-3 position-relative card-length-link">
                            Cart
                            {userBrief.cartLength ? (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill cart-length-badge">
                                {userBrief.cartLength}
                                    <span className="visually-hidden">Items in Cart</span>
                                </span>
                            ):(<></>)}
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a className="balance-link nav-link me-3">Balance: {userBrief.userBalance}₪</a>
                        </li>
                        <li className="nav-item">
                            <a onClick={handleLogout} className="logout-link nav-link me-3">Logout</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    </> );
}
 
export default Navbar;