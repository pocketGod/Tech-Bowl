import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
    
}
 
const Home: FunctionComponent<HomeProps> = () => {

    const navigate = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem('token')) navigate('/')
    }, [])

    return ( <>
        <h1 className="display-1 page-title py-4">Tech Bowl Store</h1>
        <div className="home-container container bg-light rounded-pill py-5 px-3 mb-3">
            <h4 className="display-4 my-2">How This Works</h4>
            <p className="display-6 fs-3">Upon Registration you will recieve 500$ to spend on any Item you wish to own and display in your SHELF
            <br/>
            <small>(check out 'Profle' page)</small></p>
        </div>
        <div className="home-container container bg-light rounded-pill py-5">
            <h4 className="display-4">Ran Out Of Money?</h4>
            <p className="display-6 fs-3">No Worries! You can win some more playing various games
            <br/>
            <small>(check out 'Profle' page)</small></p>
        </div>
    </> );
}
 
export default Home;