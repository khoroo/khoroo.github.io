interface Point {
    x: number;
    y: number;
}

interface Params {
    a: number;
    b: number;
    mu: number;
    x0: number;
    y0: number;
}

const knownParams: Params[] = [
    { a: 0.6, b: 0.995, mu: 0.6, x0: 2.25, y0: 7.75 },
    { a: 0.008, b: -0.7, mu: 0.008, x0: 10, y0: 0 }
];

/**
 * The Gumowski-Mira function used in the attractor calculations
 */
const calculateG = (mu: number) => (x: number): number => {
    return mu * x + 2 * (1 - mu) * x * x / (1 + x * x);
};

/**
 * Calculate the next point in the Gumowski-Mira attractor sequence
 */
const calculateNextPoint = (point: Point, params: Params): Point => {
    const g = calculateG(params.mu);
    const { a, b } = params;
    
    // X(n+1) = b * Y(n) + a * X(n) + 2 * (1 - a) * X(n)^2 / (1 + X(n)^2)
    const nextX = b * point.y + a * point.x + 2 * (1 - a) * point.x * point.x / (1 + point.x * point.x);
    
    // Y(n+1) = -X(n) + a * X(n+1) + 2 * (1 - a) * X(n+1)^2 / (1 + X(n+1)^2)
    const nextY = -point.x + a * nextX + 2 * (1 - a) * nextX * nextX / (1 + nextX * nextX);
    
    return { x: nextX, y: nextY };
};

/**
 * Generate points for the Gumowski-Mira attractor
 */
function* generatePoints(params: Params, iterations: number): Generator<Point> {
    let current: Point = { x: params.x0, y: params.y0 };
    for (let i = 0; i < iterations; i++) {
        yield current;
        current = calculateNextPoint(current, params);
    }
}

/**
 * Draw the Gumowski-Mira attractor using Canvas
 */
export const drawAttractor = (canvas: HTMLCanvasElement | OffscreenCanvas): void => {
    console.log('Starting attractor drawing with Canvas...');
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get 2D context');
        return;
    }
    
    // Get CSS variables with fallbacks
    const foregroundColor = 'black';
    
    // Get dimensions - handle both HTMLCanvasElement and OffscreenCanvas
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Define model parameters and initial conditions - exactly as in the JS version
    const a = 0.6;
    const b = 0.995;
    const X0 = 2.25;
    const Y0 = 7.75;
    const finalTime = 1000; // Number of iterations

    // Arrays to store X and Y values
    const xValues: number[] = [];
    const yValues: number[] = [];

    // Initialize current X and Y with initial conditions
    let x = X0;
    let y = Y0;

    // Simulate the system for 'finalTime' iterations
    for (let n = 0; n < finalTime; n++) {
        // Store current values
        xValues.push(x);
        yValues.push(y);

        // Compute next X using current X and Y
        const x_next = b * y + a * x + 2 * (1 - a) * x * x / (1 + x * x);

        // Compute next Y using current X and new X_next
        const y_next = -x + a * x_next + 2 * (1 - a) * x_next * x_next / (1 + x_next * x_next);

        // Update current values for the next iteration
        x = x_next;
        y = y_next;
    }

    // Determine the range of X and Y for scaling
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Set the fill color for plotting points
    ctx.fillStyle = foregroundColor;

    // Plot each point by mapping X and Y to canvas coordinates
    xValues.forEach((x, i) => {
        const y = yValues[i];
        // Map X from [minX, maxX] to [0, canvasWidth]
        const pixelX = (x - minX) / (maxX - minX) * canvasWidth;
        // Map Y from [minY, maxY] to [canvasHeight, 0] (invert Y-axis)
        const pixelY = canvasHeight - (y - minY) / (maxY - minY) * canvasHeight;
        // Draw a 1x1 pixel point
        ctx.fillRect(pixelX, pixelY, 1, 1);
    });
    
    console.log('Attractor drawing completed successfully');
};