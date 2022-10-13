import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import { errorMessage, successMessage } from "../../services/ToastService";
import { editUserBalance } from "../../services/UserService";

interface BreakoutProps {
    width: number;
    height: number;
}
 
const Breakout: FunctionComponent<BreakoutProps> = ({width, height}) => {

    const userBrief = useContext(UserContext)

    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [inGamePoints, setInGamePoints] = useState<number>(0)
    const score = useRef<number>(0)
    const [scoreAsState, setScoreAsState] = useState<number>(0)
    const [newGameFlag, setNewGameFlag] = useState<boolean>(false)
    const lives = useRef<number>(4)
    const [livesAsState, setLivesAsState] = useState<number>(4)
    const [isDead, setIsDead] = useState<boolean>(true)


    let canvas: any = {}
    let ctx: any = {}

    const level1 = [
        [],
        [],
        [],
        [],
        [],
        [],
        ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
        ['R','R','R','R','R','R','R','R','R','R','R','R','R','R'],
        ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
        ['O','O','O','O','O','O','O','O','O','O','O','O','O','O'],
        ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
        ['G','G','G','G','G','G','G','G','G','G','G','G','G','G'],
        ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'],
        ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y']
    ]

    const colorMap:any = {
        'R': '#000000',
        'O': '#474a4c',
        'G': '#8b9193',
        'Y': '#aeb5ba'
    }

    const brickGap = 2;
    const brickWidth = 25;
    const brickHeight = 8;

    const wallSize = 12;
    const bricks: any[] = [];

    const paddle = {
        // place the paddle horizontally in the middle of the screen
        x: width / 2 - brickWidth / 2,
        y: 440,
        width: brickWidth*1.7,
        height: brickHeight,
      
        // paddle x velocity
        dx: 0
    };

    const ball = {
        x: 130,
        y: 260,
        width: 5,
        height: 5,
        // how fast the ball should go in either the x or y direction
        speed: 2,
        // ball velocity
        dx: 0,
        dy: 0
    };

    const collides = (obj1:any, obj2:any) => {
        return obj1.x < obj2.x + obj2.width &&
               obj1.x + obj1.width > obj2.x &&
               obj1.y < obj2.y + obj2.height &&
               obj1.y + obj1.height > obj2.y;
      }

    const loop = () => {
        requestAnimationFrame(loop);
        ctx.clearRect(0,0,width,height);
      
        // move paddle by it's velocity
        paddle.x += paddle.dx;
      
        // prevent paddle from going through walls
        if (paddle.x < wallSize) {
          paddle.x = wallSize
        }
        else if (paddle.x + brickWidth > width - wallSize) {
          paddle.x = width - wallSize - brickWidth;
        }
      
        // move ball by it's velocity
        ball.x += ball.dx;
        ball.y += ball.dy;
      
        // prevent ball from going through walls by changing its velocity
        // left & right walls
        if (ball.x < wallSize) {
          ball.x = wallSize;
          ball.dx *= -1;
        }
        else if (ball.x + ball.width > width - wallSize) {
          ball.x = width - wallSize - ball.width;
          ball.dx *= -1;
        }
        // top wall
        if (ball.y < wallSize) {
          ball.y = wallSize;
          ball.dy *= -1;
        }
      
        // reset ball if it goes below the screen
        if (ball.y > height-wallSize-2) {
          ball.x = 130;
          ball.y = 260;
          ball.dx = 0;
          ball.dy = 0;
          lives.current -= 1
          setLivesAsState((prevVal)=>prevVal-1)
          
          setTimeout(()=>{
            if (lives.current > 0 && ball.dx === 0 && ball.dy === 0) {
                ball.dx = ball.speed;
                ball.dy = ball.speed;
                
              }
            else if(lives.current == 0){
                setIsDead(true)
                if(score.current == 0) errorMessage(`you've won 0₪ playing Breakout, Better luck next time...`)
                else {
                    successMessage(`Congratulations!, you've won ${score.current}₪ playing Breakout`)
                    editUserBalance(score.current).then(()=>{
                        userBrief.setUserBalance((prevVal:number)=>prevVal+score.current)
                    }).catch((err)=>console.log(err))
                }
            }
          }, 500)
          
        }
      
        // check to see if ball collides with paddle. if they do change y velocity
        if (collides(ball, paddle)) {
          ball.dy *= -1;
      
          // move ball above the paddle otherwise the collision will happen again
          // in the next frame
          ball.y = paddle.y - ball.height;
        }
      
        // check to see if ball collides with a brick. if it does, remove the brick
        // and change the ball velocity based on the side the brick was hit on
        for (let i = 0; i < bricks.length; i++) {
          const brick = bricks[i];
      
          if (collides(ball, brick)) {
            // remove brick from the bricks array
            bricks.splice(i, 1);
            score.current += 25
            setScoreAsState((prevVal)=>prevVal+25)
      
            // ball is above or below the brick, change y velocity
            // account for the balls speed since it will be inside the brick when it
            // collides
            if (ball.y + ball.height - ball.speed <= brick.y ||
                ball.y >= brick.y + brick.height - ball.speed) {
              ball.dy *= -1;
            }
            // ball is on either side of the brick, change x velocity
            else {
              ball.dx *= -1;
            }
      
            break;
          }
        }
        // draw walls
        ctx.fillStyle = 'lightgray';
        ctx.fillRect(0, 0, width, wallSize);
        ctx.fillRect(0, 0, wallSize, height);
        ctx.fillRect(width - wallSize, 0, wallSize, height);
        ctx.fillRect(0, height-wallSize, width, wallSize);

        // draw ball if it's moving
        if (ball.dx || ball.dy) {
            ctx.fillStyle = '#3491FF';
            ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
        }

        // draw bricks
        bricks.forEach((brick) => {
            ctx.fillStyle = brick.color;
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        });

        // draw paddle
        ctx.fillStyle = '#3491FF';
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

    }

    

// listen to keyboard events to move the paddle
window.addEventListener('keydown', (e) => {
    // left arrow key
    if (e.keyCode === 37) {
      paddle.dx = -5;
    }
    // right arrow key
    else if (e.keyCode === 39) {
      paddle.dx = 5;
    }
  });
  
  
  // listen to keyboard events to stop the paddle if key is released
  window.addEventListener('keyup', (e) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      paddle.dx = 0;
    }
  });

      


    useEffect(() => {
        if (canvasRef.current) {
            canvas = canvasRef.current;
            ctx = canvas.getContext('2d');  
            if (ctx) {

                // ctx.beginPath();
                // ctx.arc(50, 50, 100, 0, 2 * Math.PI);
                // ctx.fill(); 
                canvas.setAttribute('tabindex','1');
                canvas.style.outline = 'none';
                canvas.focus();

                // ctx.beginPath();
                // ctx.rect(20, 40, 50, 50);
                // ctx.fillStyle = "#FF0000";
                // ctx.fill();
                // ctx.closePath();
                if(isDead){
                    setLivesAsState(4)
                    lives.current = 4
                    score.current = 0
                    setScoreAsState(0)
                    setIsDead(false)
                    requestAnimationFrame(loop)

                    setTimeout(()=>{
                        if (ball.dx === 0 && ball.dy === 0) {
                            ball.dx = ball.speed;
                            ball.dy = ball.speed;
                        }
                    }, 500)
                }

            }

            for (let row = 0; row < level1.length; row++) {
                for (let col = 0; col < level1[row].length; col++) {
                  const colorCode = level1[row][col];
              
                  bricks.push({
                    x: wallSize + (brickWidth + brickGap) * col,
                    y: wallSize + (brickHeight + brickGap) * row,
                    color: colorMap[colorCode],
                    width: brickWidth,
                    height: brickHeight
                  });
                }
            }

        }
    }, [newGameFlag])

    const handleRestart = ()=>{
        if(isDead) setNewGameFlag(!newGameFlag)
    }

    return ( <>
        <h4 className="d-inline me-4">Score: {scoreAsState}</h4>
        <h4 className="d-inline ms-4">Lives: {livesAsState}</h4>
        <br />
        <canvas ref={canvasRef} height={height} width={width} />
        <br />
        <button disabled={!isDead} onClick={handleRestart}>New Game</button>

    </> );
}
 
export default Breakout;