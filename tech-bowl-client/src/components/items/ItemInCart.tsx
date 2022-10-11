import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Item } from "../../interfaces/Item";
import { addItemToCart, getUserCart, removeInstanceOfItemFromCart, removeItemFromCart } from "../../services/CartService";
import { getOneItem } from "../../services/ItemService";

interface ItemInCartProps {
    ID:string,
    amount:number,
    setCartData:Function
}
 
const ItemInCart: FunctionComponent<ItemInCartProps> = ({ID, amount, setCartData}) => {

    const userBrief = useContext(UserContext)


    const [item, setItem] = useState<Item>({title:'',description:'',price:0,category:'',img:''})

    useEffect(() => {
        getOneItem(ID).then((result)=>{
            setItem(result.data)
        }).catch((err)=>console.log(err))
    }, []);

    const handleAmountChange = async (type:string)=>{
        switch (type) {
            case 'inc':
                await addItemToCart(ID).then(()=>{
                    userBrief.setCartLength(userBrief.cartLength+1)
                    userBrief.setCartItems([...userBrief.cartItems, ID])
                    getOneItem(ID).then((res)=>{
                        userBrief.setCartTotal(userBrief.cartTotal+res.data.price)
                    }).catch((err)=>console.log(err))
                }).catch((err)=>console.log(err))
                break;
            case 'dec':
                await removeInstanceOfItemFromCart(ID).then(()=>{
                    userBrief.setCartLength(userBrief.cartLength-1)
                    let arr = [...userBrief.cartItems]
                    arr.splice(arr.indexOf(ID),1)
                    userBrief.setCartItems(arr)
                    getOneItem(ID).then((res)=>{
                        userBrief.setCartTotal(userBrief.cartTotal-res.data.price)
                    }).catch((err)=>console.log(err))
                    
                }).catch((err)=>console.log(err))
                break;
            case 'delete':
                await removeItemFromCart(ID).then(()=>{
                    userBrief.setCartLength(userBrief.cartLength-amount)
                    userBrief.setCartItems(userBrief.cartItems.filter((val, i , arr)=> val != ID))
                    getOneItem(ID).then((res)=>{
                        userBrief.setCartTotal(userBrief.cartTotal-res.data.price*amount)
                    }).catch((err)=>console.log(err))
                }).catch((err)=>console.log(err))
                break;
        }
        getUserCart().then((result)=>{
            setCartData(result.data.items)
        }).catch((err)=>console.log(err))
    }

    return ( <>
        <div className="">
            <section className="mx-auto my-2">
                <div className="card cart-card">
                    <div className="cart-card-head">
                        <img src={item.img} className="img-fluid w-25" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>

                        <p className="mb-2">in: {item.category}</p>
                        {/* <p className="card-text">{item.description}</p> */}

                        <hr className="mt-4"/>
                        
                        <div className="row lead mb-3">
                            <div className="col-5 text-end">
                                <p><small>{amount} x </small><strong className="fw-bolder pe-3">{item.price}₪</strong></p>
                            </div>
                            <div className="col-2">|</div>
                            <div className="col-5 text-start">
                                <p><small className="ps-3 text-muted">{amount * item.price}₪</small></p>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center">
                            <div className="px-1">
                                <a className="add-to-cart-btn fs-6 mt-2 py-3 px-4" onClick={()=>handleAmountChange('dec')}><i className="fa-solid fa-minus"></i></a>
                            </div>
                            <div className="px-1">
                                <a className="add-to-cart-btn fs-6 mt-2 py-3 px-4" onClick={()=>handleAmountChange('delete')}><i className="fa-regular fa-trash-can"></i></a>
                            </div>
                            <div className="px-1">
                                <a className="add-to-cart-btn fs-6 mt-2 py-3 px-4" onClick={()=>handleAmountChange('inc')}><i className="fa-solid fa-plus"></i></a>
                            </div>
                        </div> 
                    </div>
                </div>
            </section>
        </div>
    </> );
}
 
export default ItemInCart;