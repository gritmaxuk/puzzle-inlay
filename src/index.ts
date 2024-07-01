import { GameState } from './GameState';
import { Renderer } from './Renderer';
import { Grid, Piece } from './types';
import { parseBoardFromFile, parsePiecesFromFile } from './BoardParser';

class Game {
    private gameState: GameState;
    private renderer: Renderer;
    private canvas: HTMLCanvasElement;

    constructor(canvasId: string, fileContent: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        
        const initialGrid: Grid = parseBoardFromFile(fileContent);
        const pieces: Piece[] = parsePiecesFromFile(fileContent);

        // Set canvas size based on grid dimensions
        const cellSize = 40; // Should match the cellSize in Renderer
        this.canvas.width = initialGrid[0].length * cellSize;
        this.canvas.height = initialGrid.length * cellSize;

        this.gameState = new GameState(initialGrid, pieces);
        this.renderer = new Renderer(this.canvas);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    private handleKeyPress(e: KeyboardEvent): void {
        if (this.gameState.isOver()) return; // Ignore input if game is over

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
            this.gameState.setNextPiece(this.gameState.getRandomPiece());
            this.gameState.setCurrentPiecePosition(0, 0);
        }
    }

    private startGame(): void {
        this.gameState.setCurrentPiece(this.gameState.getRandomPiece());
        this.gameState.setNextPiece(this.gameState.getRandomPiece());
        this.gameState.setCurrentPiecePosition(0, 0);
        this.render();
        this.gameLoop();
    }

    private gameLoop(): void {
        if (this.gameState.isOver()) {
            this.handleGameOver();
            return;
        }

        // Move the piece down
        if (!this.gameState.movePiece(0, 1)) {
            this.placePiece();
        }
        this.render();
        setTimeout(() => this.gameLoop(), 1000); // Move down every second
    }

    private handleGameOver(): void {
        console.log('Game Over!');
        // You can add more game over handling here, like showing a message on the canvas
        this.renderer.renderGameOver();
    }

    private render(): void {
        this.renderer.render(this.gameState);
    }
}

// Start the game
fetch('cat.txt')
    .then(response => response.text())
    .then(fileContent => {
        new Game('gameCanvas', fileContent);
    })
    .catch(error => console.error('Error loading cat.txt:', error));