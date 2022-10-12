import { FunctionComponent, useEffect, useState } from "react";
import { Item } from "../../interfaces/Item";
import { getOneItem } from "../../services/ItemService";
import { getUserShelf } from "../../services/ShelfService";
import { getUserName } from "../../services/UserService";
import ItemInShelf from "../items/itemInShelf";

interface ProfileProps {
    
}
 
const Profile: FunctionComponent<ProfileProps> = () => {

    const [shelfItems, setShelfItems] = useState<[]>([])

    useEffect(() => {
        getUserShelf().then((result)=>{
            setShelfItems(result.data.items)
            // console.log(result.data)
        }).catch((err)=>console.log(err))
    }, []);


    return ( <>
        <h1 className="display-1 page-title mt-3"><small>Logged in as </small>{getUserName()}</h1>
        <hr className="text-dark container"/>
        <h2 className="display-3 page-title mt-5">Your Shelf:</h2>

        <table className="table text-dark container mt-5">
            <thead>
                
            </thead>
            <tbody>
                {shelfItems.map((itm:any)=> (
                    <ItemInShelf key={itm.itemID} itemID={itm.itemID} amount={itm.amount}/>
                ))}
            </tbody>
        </table>
    </> );
}
 
export default Profile;