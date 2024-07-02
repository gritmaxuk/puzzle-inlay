import { GameState } from './GameState';
import { Renderer } from './Renderer';
import { CAT_SHAPE, PIECE_VARIANTS } from './gameData';
import { Piece } from './types'; // Import Piece type

class Game {
    private gameState: GameState;
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;
    private smallCanvas: HTMLCanvasElement;
    private uiOverlay: HTMLElement;
    private restartButton: HTMLButtonElement;
    private draggingPiece: boolean = false;
    private dragOffset: { x: number, y: number } = { x: 0, y: 0 };
    private draggedPiece: Piece | null = null;
    private cellSize: number = 30; // Define cell size here
    private smallBoardSize: number = 150; // Define small board size here

    constructor(canvasId: string, smallCanvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.smallCanvas = document.getElementById(smallCanvasId) as HTMLCanvasElement;
        this.uiOverlay = document.getElementById('uiOverlay') as HTMLElement;
        this.restartButton = document.getElementById('restartButton') as HTMLButtonElement;

        // Set canvas size based on grid dimensions
        this.canvas.width = CAT_SHAPE[0].length * this.cellSize;
        this.canvas.height = CAT_SHAPE.length * this.cellSize;

        this.smallCanvas.width = this.smallBoardSize;
        this.smallCanvas.height = this.smallBoardSize;

        this.gameState = new GameState(CAT_SHAPE, PIECE_VARIANTS);
        this.renderer = new Renderer(this.canvas, this.smallCanvas, this.cellSize, this.smallBoardSize);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.smallCanvas.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.handleDrag(e));
        document.addEventListener('mouseup', (e) => this.endDrag(e));
        this.smallCanvas.addEventListener('contextmenu', (e) => this.handleRightClick(e));
    }

    private handleKeyPress(e: KeyboardEvent): void {
        switch (e.key) {
            case ' ':
                this.rotatePiece();
                break;
        }
        this.render();
    }

    private handleRightClick(e: MouseEvent): void {
        e.preventDefault(); // Prevent the context menu from appearing
        this.rotatePiece();
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
        const cellX = Math.floor(x / this.cellSize);
        const cellY = Math.floor(y / this.cellSize);

        if (this.gameState.placePiece(cellX, cellY)) {
            this.draggingPiece = false;
            this.draggedPiece = null;
            this.render();
        }
    }

    private render(): void {
        this.renderer.render(this.gameState, this.draggingPiece ? this.draggedPiece || undefined : undefined, this.dragOffset);
    }

    private startDrag(e: MouseEvent): void {
        if (e.button === 2) {
            // Right-click drag should not start the drag-and-drop process
            return;
        }

        e.preventDefault();
        const rect = this.smallCanvas.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        this.draggingPiece = true;
        this.draggedPiece = this.gameState.getNextPiece()!;
    }

    private handleDrag(e: MouseEvent): void {
        if (!this.draggingPiece) return;

        const rect = this.canvas.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        this.render();
    }

    private endDrag(e: MouseEvent): void {
        if (this.draggingPiece) {
            this.placePiece();
        }
    }

    private rotatePiece(e?: MouseEvent): void {
        if (e) e.preventDefault();
        this.gameState.rotateNextPiece();
        this.render();
    }
}

// Start the game
new Game('gameCanvas', 'smallBoardCanvas');