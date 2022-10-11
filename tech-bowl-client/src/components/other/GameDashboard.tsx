import { FunctionComponent } from "react";
import Snake from "./Snake";

interface GameDashboardProps {
    
}
 
const GameDashboard: FunctionComponent<GameDashboardProps> = () => {
    return ( <>
        <h1 className="display-1 page-title my-4">Game Dashboard</h1>
        <Snake width={500} height={500}/>
    </> );
}
 
export default GameDashboard;