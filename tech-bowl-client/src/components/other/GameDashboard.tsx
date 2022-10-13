import { FunctionComponent, useState } from "react";
import Breakout from "./Breakout";
import Snake from "./Snake";

interface GameDashboardProps {
    
}
 
const GameDashboard: FunctionComponent<GameDashboardProps> = () => {

    const [choosenGame, setChoosenGame] = useState<string>('')

    const displayGame = () =>{
        switch (choosenGame) {
            case '':
                return <div className="waiting-to-select-game rounded-pill container my-5 py-5">
                    <h4 className="display-4 my-5 pt-1">Select a Game</h4>
                    <h4 className="display-5 mb-5 py-5">(Play with Arrow Keys)</h4>
                </div>
            case 'snake':
                return <Snake width={500} height={500}/>
            case 'breakout':
                return <Breakout width={400} height={500}/>
            
        }
    }

    const handleGameChange = (e:any)=>{
        setChoosenGame(e.target.value)
    }

    return ( <>
            <h1 className="display-1 page-title my-4">Game Dashboard</h1>
                <div onChange={handleGameChange}>
                    <input type="radio" id="snakeOption" value="snake" name="options" />
                    <label className="me-4 ms-1" htmlFor="snakeOption">Snake</label>

                    <input type="radio" value="breakout" name="options" id="breakoutOption"/>
                    <label className="ms-1" htmlFor="breakoutOption">Breakout</label>
                </div>
        
            <div className="mt-4 mb-5">
                {displayGame()}
            </div>
        
        

            
    </> );
}
 
export default GameDashboard;