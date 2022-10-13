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
        x: width / 2 - brickWidth / 2,
        y: 440,
        width: brickWidth*1.7,
        height: brickHeight,
        dx: 0
    };

    const ball = {
        x: 130,
        y: 260,
        width: 5,
        height: 5,
        speed: 2,
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

        paddle.x += paddle.dx;
      
        if (paddle.x < wallSize) {
          paddle.x = wallSize
        }
        else if (paddle.x + brickWidth*1.7 > width - wallSize) {
          paddle.x = width - wallSize - brickWidth*1.7;
        }

        ball.x += ball.dx;
        ball.y += ball.dy;
      
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
      
        // bottom wall
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

        if (collides(ball, paddle)) {
          ball.dy *= -1;
          ball.y = paddle.y - ball.height;
        }

        for (let i = 0; i < bricks.length; i++) {
          const brick = bricks[i];
      
          if (collides(ball, brick)) {
            bricks.splice(i, 1);
            score.current += 25
            setScoreAsState((prevVal)=>prevVal+25)

            if (ball.y + ball.height - ball.speed <= brick.y ||
                ball.y >= brick.y + brick.height - ball.speed) {
              ball.dy *= -1;
            }
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

        // draw ball if it has moved since last iteration
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

    


    window.addEventListener('keydown', (e) => {
        if (e.keyCode === 37) {
        paddle.dx = -5;
        }
        else if (e.keyCode === 39) {
        paddle.dx = 5;
        }
    });
  
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