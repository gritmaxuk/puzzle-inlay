import { GameState } from './GameState';
import { Renderer } from './Renderer';
import { CAT_SHAPE, PIECE_VARIANTS } from './gameData';

class Game {
    private gameState: GameState;
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;
    private smallCanvas: HTMLCanvasElement;
    private uiOverlay: HTMLElement;
    private restartButton: HTMLButtonElement;
    private draggingPiece: boolean = false;
    private dragOffset: { x: number, y: number } = { x: 0, y: 0 };

    constructor(canvasId: string, smallCanvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.smallCanvas = document.getElementById(smallCanvasId) as HTMLCanvasElement;
        this.uiOverlay = document.getElementById('uiOverlay') as HTMLElement;
        this.restartButton = document.getElementById('restartButton') as HTMLButtonElement;

        // Set canvas size based on grid dimensions
        const cellSize = 30; // Size of each cell
        this.canvas.width = CAT_SHAPE[0].length * cellSize;
        this.canvas.height = CAT_SHAPE.length * cellSize;

        this.gameState = new GameState(CAT_SHAPE, PIECE_VARIANTS);
        this.renderer = new Renderer(this.canvas, this.smallCanvas);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.smallCanvas.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', (e) => this.endDrag(e));
    }

    private startGame(): void {
        this.uiOverlay.style.display = 'none';
        this.gameState.reset();
        this.render();
    }

    private restartGame(): void {
        this.gameState.reset();
        this.restartButton.style.display = 'none';
        this.render();
    }

    private placePiece(): void {
        const { x, y } = this.dragOffset;
        const cellX = Math.floor(x / 30);
        const cellY = Math.floor(y / 30);

        if (this.gameState.placePiece(cellX, cellY)) {
            this.draggingPiece = false;
            this.render();
        }
    }

    private render(): void {
        this.renderer.render(this.gameState);
    }

    private startDrag(e: MouseEvent): void {
        const rect = this.smallCanvas.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        this.draggingPiece = true;
    }

    private handleDrag(e: MouseEvent): void {
        if (!this.draggingPiece) return;

        const rect = this.canvas.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    }

    private endDrag(e: MouseEvent): void {
        if (this.draggingPiece) {
            this.placePiece();
        }
    }
}

// Start the game
new Game('gameCanvas', 'smallBoardCanvas');