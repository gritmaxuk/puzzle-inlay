import { GameState } from './GameState';
import { PieceGenerator } from './PieceGenerator';
import { Renderer } from './Renderer';
import { Grid, Piece } from './types';

class Game {
    private gameState: GameState;
    private pieceGenerator: PieceGenerator;
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
        // Initialize with a placeholder grid (you'll need to implement the actual grid parsing)
        const initialGrid: Grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        // Initialize with placeholder pieces (you'll need to implement the actual piece parsing)
        const pieces: Piece[] = [
            [[1, 1], [1, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[1, 0], [1, 1]]
        ];

        this.gameState = new GameState(initialGrid);
        this.pieceGenerator = new PieceGenerator(pieces);
        this.renderer = new Renderer(this.canvas);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
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

    private placePiece(): void {
        if (this.gameState.placePiece()) {
            this.gameState.setCurrentPiece(this.gameState.getNextPiece()!);
            this.gameState.setNextPiece(this.pieceGenerator.getRandomPiece());
            this.gameState.setCurrentPiecePosition(0, 0);
        }
    }

    private startGame(): void {
        this.gameState.setCurrentPiece(this.pieceGenerator.getRandomPiece());
        this.gameState.setNextPiece(this.pieceGenerator.getRandomPiece());
        this.gameState.setCurrentPiecePosition(0, 0);
        this.render();
        this.gameLoop();
    }

    private gameLoop(): void {
        // Move the piece down
        if (!this.gameState.movePiece(0, 1)) {
            this.placePiece();
        }
        this.render();
        setTimeout(() => this.gameLoop(), 1000); // Move down every second
    }

    private render(): void {
        this.renderer.render(this.gameState);
    }
}

// Start the game
new Game('gameCanvas');