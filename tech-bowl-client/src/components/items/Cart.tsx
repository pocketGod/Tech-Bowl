import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Item } from "../../interfaces/Item";
import { getBriefedCart, getUserCart } from "../../services/CartService";
import { getOneItem } from "../../services/ItemService";
import { checkout } from "../../services/ShelfService";
import { errorMessage, successMessage } from "../../services/ToastService";
import Navbar from "../general/Navbar";
import ItemInCart from "./ItemInCart";

interface CartProps {
    
}
 
const Cart: FunctionComponent<CartProps> = () => {

    const [cartData, setCartData] = useState<Item[]>([])

    const user = useContext(UserContext);
    
    const handleCheckout = ()=>{
        let moneyLeft = user.userBalance - user.cartTotal
        if(moneyLeft>= 0){
            checkout(moneyLeft).then((result)=>{
                user.setUserBalance(moneyLeft)
                user.setCartItems([])
                user.setCartLength(0)
                user.setCartTotal(0)
                setCartData([])

                successMessage('Purchase Was Successfull, Check out your shelf to view all the items you own')

            }).catch((err)=>{
                errorMessage('error with checkout process')
            })
        }
        else{
            errorMessage('Not enough credits to make this purchase')
        }
    }

    useEffect(() => {
        let cartSum = 0
        getUserCart().then((result)=>{
            setCartData(result.data.items)
            result.data.items.forEach((itm:any)=>{
                getOneItem(itm.itemID).then((res)=>{
                    cartSum += res.data.price*itm.amount
                    user.setCartTotal(cartSum)
                }).catch((err)=>console.log(err))
                
            })
        }).catch((err)=> {
            console.log(err)
        })

        getBriefedCart().then((result)=>{
            user.setCartLength(result.data.cartLength)     
        }).catch((err)=>{console.log(err)})

        
    }, []);

    return ( <>
        <h1 className="display-2 text-light">Cart</h1>
        <div className="container mx-auto d-flex justify-content-center w-100 mb-5 mt-3">
            <div className="">
                <p className="gen-sum">cart total: {user.cartTotal}<span className="fw-light fs-6">₪</span></p>
            </div>
            <div className="">
                <button className="gen-btn" onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
        {cartData.length? (
            <div className="row mx-0 px-5">
                {cartData.map((minItem:any)=>(
                    <div key={minItem._id} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                        <ItemInCart ID={minItem.itemID} amount={minItem.amount} setCartData={setCartData}/>
                    </div>
                ))}
            </div>
                ):(<p className="text-light">No Products in Cart...</p>)}
        
    </> );
}
 
export default Cart;