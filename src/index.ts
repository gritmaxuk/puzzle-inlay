import { GameState } from './GameState';
import { PieceGenerator } from './PieceGenerator';
import { Grid, Piece } from './types';

class Game {
    private gameState: GameState;
    private pieceGenerator: PieceGenerator;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;

        // Initialize with a placeholder grid
        const initialGrid: Grid = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0]
        ];

        // Initialize with placeholder pieces
        const pieces: Piece[] = [
            [[1, 1], [1, 0]],
            [[1, 1, 1], [0, 1, 0]],
            [[1, 0], [1, 1]]
        ];

        this.gameState = new GameState(initialGrid);
        this.pieceGenerator = new PieceGenerator(pieces);

        this.setupEventListeners();
        this.startGame();
    }

    private setupEventListeners(): void {
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('contextmenu', (e) => this.handleRightClick(e));
    }

    private handleClick(e: MouseEvent): void {
        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / 20);  // Assuming each cell is 20px
        const y = Math.floor((e.clientY - rect.top) / 20);

        if (this.gameState.placePiece(x, y)) {
            this.gameState.setCurrentPiece(this.gameState.getNextPiece()!);
            this.gameState.setNextPiece(this.pieceGenerator.getRandomPiece());
        }

        this.render();
    }

    private handleRightClick(e: MouseEvent): void {
        e.preventDefault();
        this.gameState.rotatePiece();
        this.render();
    }

    private startGame(): void {
        this.gameState.setCurrentPiece(this.pieceGenerator.getRandomPiece());
        this.gameState.setNextPiece(this.pieceGenerator.getRandomPiece());
        this.render();
    }

    private render(): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render the grid
        const grid = this.gameState.getGrid();
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 1) {
                    this.ctx.fillStyle = 'blue';
                    this.ctx.fillRect(x * 20, y * 20, 20, 20);
                }
            }
        }

        // Render the current piece
        const currentPiece = this.gameState.getCurrentPiece();
        if (currentPiece) {
            this.ctx.fillStyle = 'red';
            for (let y = 0; y < currentPiece.length; y++) {
                for (let x = 0; x < currentPiece[y].length; x++) {
                    if (currentPiece[y][x] === 1) {
                        this.ctx.fillRect(x * 20, y * 20, 20, 20);
                    }
                }
            }
        }
    }
}

// Start the game
new Game('gameCanvas');