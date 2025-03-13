import { drawAttractor } from './attractor';

// Define types for the messages
interface InitMessage {
  type: 'init';
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  dpr: number;
}

type WorkerMessage = InitMessage;

// Persistent canvas to hold the drawing
let persistentCanvas: OffscreenCanvas | null = null;
let persistentImage: ImageBitmap | null = null;

// Listen for messages from the main thread
self.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const data = event.data;
  
  if (data.type === 'init') {
    const { canvas, width, height, dpr } = data;
    
    // Get context for the received canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get context from transferred canvas');
      return;
    }
    
    // Apply device pixel ratio
    ctx.scale(dpr, dpr);
    
    // Check if we already have a persistent canvas
    if (!persistentCanvas) {
      console.log('Creating new persistent canvas');
      // Create a new persistent canvas
      persistentCanvas = new OffscreenCanvas(width, height);
      
      // Draw the attractor on the persistent canvas
      drawAttractor(persistentCanvas);
      
      try {
        // Create an ImageBitmap from the persistent canvas for faster copying
        persistentImage = await createImageBitmap(persistentCanvas);
      } catch (err) {
        console.error('Failed to create bitmap from persistent canvas', err);
      }
    }
    
    // Copy the persistent drawing to the new canvas
    if (persistentImage) {
      ctx.drawImage(persistentImage, 0, 0, width/dpr, height/dpr);
    } else if (persistentCanvas) {
      ctx.drawImage(persistentCanvas, 0, 0, width/dpr, height/dpr);
    }
  }
};
