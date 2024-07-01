import { GameState } from './GameState';
import { Renderer } from './Renderer';
import { CAT_SHAPE, PIECE_VARIANTS } from './gameData';

class Game {
    private gameState: GameState;
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;
    private uiOverlay: HTMLElement;
    private restartButton: HTMLButtonElement;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.uiOverlay = document.getElementById('uiOverlay') as HTMLElement;
        this.restartButton = document.getElementById('restartButton') as HTMLButtonElement;

        // Set canvas size based on grid dimensions
        const cellSize = 30; // Size of each cell
        this.canvas.width = CAT_SHAPE[0].length * cellSize;
        this.canvas.height = CAT_SHAPE.length * cellSize;

        this.gameState = new GameState(CAT_SHAPE, PIECE_VARIANTS);
        this.renderer = new Renderer(this.canvas);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    private handleKeyPress(e: KeyboardEvent): void {
        switch (e.key) {
            case 'ArrowLeft':
                this.gameState.movePiece(-1, 0);
                break;
            case 'ArrowRight':
                this.gameState.movePiece(1, 0);
                break;
            case 'ArrowDown':
                this.gameState.movePiece(0, 1);
                break;
            case 'ArrowUp':
                this.gameState.rotatePiece();
                break;
            case ' ':
                this.placePiece();
                break;
        }
        this.render();
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
        if (this.gameState.placePiece()) {
            this.gameState.setCurrentPiece(this.gameState.getNextPiece()!);
            this.gameState.setNextPiece(this.gameState.getRandomPiece());
            this.gameState.setCurrentPiecePosition(0, 0);
        }
    }

    private render(): void {
        this.renderer.render(this.gameState);
    }
}

// Start the game
new Game('gameCanvas');