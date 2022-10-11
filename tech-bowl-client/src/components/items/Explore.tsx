import { FunctionComponent, useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { Item } from "../../interfaces/Item";
import { getAllItems, getCategoriesArr } from "../../services/ItemService";
import ItemInExplore from "./ItemInExplore";


interface ExploreProps {
    
}
 
const Explore: FunctionComponent<ExploreProps> = () => {


    const [selectedCategory, setSelectedCategory] = useState<string>('All')
    const [categoryArr, setCategoryArr] = useState<string[]>([])
    const [inputSearch, setInputSearch] = useState<string>('')
    const [items, setItems] = useState<Item[]>([])


    const checkIfItemMatchesCategory = (itemCat:string):boolean=>{
        if(itemCat == selectedCategory || selectedCategory == 'All') return true
        return false
    }

    const checkIfItemTitleMatchesSearch = (itemCat:string):boolean=>{
        if(itemCat.toLowerCase().includes(inputSearch.toLowerCase()) || inputSearch=='') return true
        return false
    }

    useEffect(() => {
        getAllItems().then((result)=>{
            setItems(result.data)
        }).catch((err)=>console.log(err))

        getCategoriesArr().then((result)=>{
            setCategoryArr(result.data)            
        }).catch((err)=>console.log(err))
    }, [])

    

    return ( <>
        <h1 className="display-1 page-title my-4">Explore our products</h1>
        <div className="col-12 row mb-3 container mx-auto">
                            <div className="col-sm-7 col-12 form-floating">
                                <input type="text" className="form-control" id="searchInput" name='search' placeholder="c" onChange={(e)=>setInputSearch(e.target.value)}/>
                                <label htmlFor="searchInput" className="form-label ps-4 display-6 fs-5">Search</label>
                            </div>
                            <div className="col-sm-5 col-12 form-floating">
                                <select className="form-select display-6 fs-6"   id="itemCategory" name='category' onChange={(e)=>setSelectedCategory(e.target.value)}>
                                <option key={'All'} value='All'>All</option>
                                    {categoryArr.map((cat)=>(
                                        <option className="text-capitalize" key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <label htmlFor="itemCategory" className="form-label ps-4 display-6 fs-5">Category</label>
                            </div>
                        </div>
        <div className="row mx-auto container">
            {items.length ? (
                items.map((item:Item)=>(
                    checkIfItemMatchesCategory(item.category) ? (
                        checkIfItemTitleMatchesSearch(item.title) ? (
                            <div key={item._id} className=" col-md-4 col-sm-6 col-xl-3 col-xxl-2 col-12 my-1 g-0" >
                                <ItemInExplore item={item}/>    
                            </div>
                        ):(null)
                    ):(null)
                ))
            ) : (
                <div className="text-center display-1">
                    <div className="spinner-border text-light fs-1" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
        
    </> );
}
 
export default Explore;