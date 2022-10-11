import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { UserContext } from "../../App";
import { Item } from "../../interfaces/Item";
import { addItemToCart } from "../../services/CartService";
import { successMessage } from "../../services/ToastService";
import { getUserShelf } from "../../services/ShelfService";

interface ItemInExploreProps {
    item:Item
}
 
const ItemInExplore: FunctionComponent<ItemInExploreProps> = ({item}) => {
   
    const userBrief = useContext(UserContext)


    useEffect(() => {
        getUserShelf().then((res)=>{
            userBrief.setShelfItems(res.data.items)
            
        }).catch((err)=>console.log(err))
    }, []);


    const checkAmountInCart = (itemID:string):number =>{
        let counter = 0
        if(userBrief.cartItems.length == 0) return 0

        
        userBrief.cartItems.forEach((ID)=>{
            if(ID==itemID) counter++
        })
        return counter
    }

    const checkAmountInShelf = (itemID:string):number =>{
        let counter = 0
        if(userBrief.shelfItems.length == 0) return 0

        
        userBrief.shelfItems.forEach((itm:any)=>{
            if(itm.itemID==itemID) counter+=itm.amount
        })
        return counter
    }


    const handleAddToCart = (item:Item)=>{
        addItemToCart(item._id as string).then((result)=>{
            userBrief.setCartLength(userBrief.cartLength+1)
            userBrief.setCartItems([...userBrief.cartItems, item._id])
            successMessage(`${item.title} was added to Cart`)
        }).catch((err)=>console.log(err))
    }
    const [showDetails, setShowDetails] = useState(false)

    const handleOffcanvasClose = () => setShowDetails(false)
    const handleOffcanvasShow = (e:any) => {
        if(e.classList['0'] != 'add-to-cart-btn') setShowDetails(true)
    }

    return ( <>
          
                <div className="container">
            <section className="my-1">
                <div className="card display-4 fs-6 explore-card h-100"  onClick={(e)=>handleOffcanvasShow(e.target)}>
                    <div className="border border-bottom card-item-head">
                        <img src={item.img} className="img-fluid" />
                    </div>
                    <div className="card-body pb-1">
                        <h5 className="card-title">
                            {item.title.length >= 15 ? (
                                item.title.substring(0, 15) + '...')
                                :(item.title)}
                        </h5>
                        <p className="card-text">
                            {item.description.length >= 20 ? (
                                item.description.substring(0, 20) + '...')
                                :(item.description)}
                        </p>
                        <p className="card-text">in {item.category}</p>
                    </div>
                    <div className="card-footer text-center pb-3">
                        <h5 className="card-title display-5 fs-3">{item.price}<span className="fw-light fs-6">₪</span>
                        {checkAmountInCart(item._id as string) ? (<>
                            <small className="in-cart-label text-muted">({checkAmountInCart(item._id as string)} in cart)</small>
                        </>):(<></>)}
                        </h5>
                        
                        <a className="add-to-cart-btn px-5 py-2" onClick={()=>handleAddToCart(item)}><i className="fa-solid fa-cart-plus"></i></a>
                    </div>
                </div>
                
            </section>
        </div>
        <Offcanvas show={showDetails} onHide={handleOffcanvasClose}>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title className="display-5">
            </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <h4 className="display-5">{item.title}</h4>
            <span className="fs-6 text-muted">in: {item.category}</span>
          <hr />
          <img src={item.img} alt="" className="w-75 ms-5"/>
          <hr />
          <span className="fs-1">{item.price}<small className="fs-6">₪</small></span>
          <p className="display-6 fs-4">{item.description}</p>
          <hr />

          <table className="table offcanvas-table">
            <thead>
                <tr>
                    <th className="offcanvas-table-header" colSpan={2}>Instances of this Item you have:</th>
                </tr>
            </thead>
            <tbody>
                <tr className="offcanvas-table-row">
                    <td className="offcanvas-table-cell fs-4">{checkAmountInCart(item._id as string)} <span className="fs-6">in</span> Cart</td>
                    <td className="offcanvas-table-cell fs-4">{checkAmountInShelf(item._id as string)} <span className="fs-6">in</span> Shelf</td>
                </tr>
            </tbody>
          </table>
          
          <hr />

          <button className="add-to-cart-btn px-5 py-4 mt-3 w-100 border-0" onClick={()=>handleAddToCart(item)}><i className="fs-3 fa-solid fa-cart-plus"></i></button>

                
        </Offcanvas.Body>
      </Offcanvas>
    </> );
}
 
export default ItemInExplore;
