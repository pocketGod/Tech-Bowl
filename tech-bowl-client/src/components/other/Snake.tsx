import { FunctionComponent, useEffect, useRef } from "react";

interface SnakeProps {
    width: number;
    height: number;
}
 
const Snake: FunctionComponent<SnakeProps> = ({ width, height }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');  
            if (context) {
                context.beginPath();
                context.arc(50, 50, 100, 0, 2 * Math.PI);
                context.fill(); 
            }

        }
    }, [])
        
    return ( <>
        <canvas ref={canvasRef} height={height} width={width} />
    </> );
}
 
export default Snake;