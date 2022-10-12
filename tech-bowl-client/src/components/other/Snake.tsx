import { FunctionComponent, useEffect, useRef, useState } from "react";
import { successMessage } from "../../services/ToastService";

interface SnakeProps {
    width: number;
    height: number;
}
 
const Snake: FunctionComponent<SnakeProps> = ({ width, height }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState<number>(0)
    const [newGameFlag, setNewGameFlag] = useState<boolean>(false)
    const [isDead, setIsDead] = useState<boolean>(true)
    // // scoreIs = document.getElementById('score'),
    let direction = ''
    let directionQueue = ''
    let fps = 70
    let snake: any[] = []
    let snakeLength = 5
    let cellSize = 20
    let snakeColor = '#3498db'
    let foodColor = '#ff3636'
    let foodX: number[] = []
    let foodY: number[] = []
    let food = {
        x: 0, 
        y: 0
    }
    let loop:any

    let canvas: any = {}
    let context: any = {}

    useEffect(() => {

        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault()
            }
        }, false);


        for(let i = 0; i <= width - cellSize; i+=cellSize) {
            foodX.push(i);
            foodY.push(i);
        }
        if (canvasRef.current) {
            canvas = canvasRef.current;
            context = canvas.getContext('2d');  
            if (context) {
                // context.beginPath();
                // context.arc(50, 50, 100, 0, 2 * Math.PI);
                // context.fill(); 
                canvas.setAttribute('tabindex','1');
                canvas.style.outline = 'none';
                canvas.focus();

                newGame()

            }

        }
    }, [newGameFlag])

    const drawSquare = (x:number,y:number,color:string)=> {
        context.fillStyle = color;
        context.fillRect(x, y, cellSize, cellSize);	
    }

    const createFood = ()=> { 
        food.x = foodX[Math.floor(Math.random()*foodX.length)]
        food.y = foodY[Math.floor(Math.random()*foodY.length)] 

        for(let i = 0; i < snake.length; i++) {
            if(checkCollision(food.x, food.y, snake[i].x, snake[i].y)) {
                createFood(); 
            }
        }
    }

    const drawFood = () => {
        drawSquare(food.x, food.y, foodColor)
    }


    const setBackground = (color1:string, color2:string) => {
        context.fillStyle = color1;
        context.strokeStyle = color2;

        context.fillRect(0, 0, canvas.height, canvas.width);

        for(let x = 0.5; x < canvas.width; x += cellSize) {
            context.moveTo(x, 0);
            context.lineTo(x, canvas.height);
        }
        for(let y = 0.5; y < canvas.height; y += cellSize) {
            context.moveTo(0, y);
            context.lineTo(canvas.width, y);
        }

        context.stroke()
    }

    const createSnake = () => {
        snake = [];
            for(let i = snakeLength; i > 0; i--) {
            let k:number = i * cellSize;
            snake.push({x: k, y:0});
        }
    }

    const drawSnake = () => {
        for(let i = 0; i < snake.length; i++) {
            drawSquare(snake[i].x, snake[i].y, snakeColor);
        }
    }

    const changeDirection = (keycode:number) => {
        if(keycode == 37 && direction != 'right') { directionQueue = 'left'; }
        else if(keycode == 38 && direction != 'down') { directionQueue = 'up'; }
        else if(keycode == 39 && direction != 'left') { directionQueue = 'right'; }
        else if(keycode == 40 && direction != 'top') { directionQueue = 'down' }
    }


    const moveSnake = () => {
        let x = snake[0].x; 
        let y = snake[0].y;
    
        direction = directionQueue;
    
        if(direction == 'right') {
            x+=cellSize;
        }
        else if(direction == 'left') {
            x-=cellSize;
        }
        else if(direction == 'up') {
            y-=cellSize;
        }
        else if(direction == 'down') {
            y+=cellSize;
        }
        // removes the tail and makes it the new head
        let tail:any = snake.pop(); 
        tail.x = x;
        tail.y = y;
        snake.unshift(tail);
    }

    const checkCollision = (x1:number,y1:number,x2:number,y2:number) => {
        if(x1 == x2 && y1 == y2) {
            return true;
        }
        else {
            return false;
        }
    }

    const game = () =>{
        let head = snake[0];
        // checking for wall collisions
        if(head.x < 0 || head.x > canvas.width - cellSize  || head.y < 0 || head.y > canvas.height - cellSize) {
            
            handleDeath()
        }
        // checking for snake's body colisions
        for(let i = 1; i < snake.length; i++) {
            if(head.x == snake[i].x && head.y == snake[i].y) {
               
                handleDeath()
            }
        }
        // checking for collision with food
        if(checkCollision(head.x, head.y, food.x, food.y)) {
            snake[snake.length] = {x: head.x, y: head.y};
            createFood();
            drawFood();
            setScore((currentScore)=> currentScore+10)

        }
    
        canvas.onkeydown = (evt: any) => {
            evt = evt || window.event;
            changeDirection(evt.keyCode);
        };
    
       context.beginPath();
       setBackground('#fff', '#eee');
       drawSnake();
       drawFood();
       moveSnake();
    }

    const newGame = () => {
        setIsDead(false)
        snakeLength = 5
        drawSnake();
        setScore(0)
        direction = 'right'; // initial direction
        directionQueue = 'right';
        context.beginPath();
        createSnake();
        createFood();
    
        if(typeof loop != 'undefined') {
            clearInterval(loop);
        }
        else {
            loop = setInterval(game, fps);
        }
    }

    const handleDeath = ()=>{
        clearInterval(loop);
        loop = undefined
        setIsDead(true)
        successMessage(`you've won ${score}$`)
        
    }

    const handleRestart = ()=>{
        if(isDead) setNewGameFlag(!newGameFlag)
    }
        
    return ( <>
    <button disabled={!isDead} onClick={handleRestart}>New Game</button>
    <h3 className="text-dark">{score}</h3>
        <canvas ref={canvasRef} height={height} width={width} />
    </> );
}
 
export default Snake;