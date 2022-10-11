import { FunctionComponent, useEffect, useState } from "react";
import { Item } from "../../interfaces/Item";
import { getOneItem } from "../../services/ItemService";

interface ItemInShelfProps {
    itemID:string
    amount:number
}
 
const ItemInShelf: FunctionComponent<ItemInShelfProps> = ({itemID, amount}) => {

    const [item, setItem] = useState<Item>({title:'',description:'',price:0,category:'',img:''})


    useEffect(() => {
        getOneItem(itemID).then((result)=>{
            setItem(result.data)
        }).catch((err)=>console.log(err))
    }, [])

    return ( <>
    <tr className="item-shelf-row">
        <td className="text-end">{amount} x </td>
        <td>
            <span className="float-start display-6 me-2">{item.title}</span>
        </td>
        <td><img className="shelf-item-pic" src={item.img} alt="" /></td>
        <td className="fs-4">{item.price*amount} <span className="fs-6">₪ spent</span></td>
    </tr>
    </> );
}
 
export default ItemInShelf;