import { GameState } from './GameState';
import { Grid, Piece } from './types';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cellSize: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d')!;
        this.cellSize = 40; // Size of each cell in pixels
    }

    public render(gameState: GameState): void {
        this.clear();
        this.renderGrid(gameState.getGrid());
        this.renderCurrentPiece(gameState.getCurrentPiece(), gameState.getCurrentPiecePosition());
        this.renderNextPiece(gameState.getNextPiece());
    }

    public renderGameOver(): void {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
    }
    
    private clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private renderGrid(grid: Grid): void {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 1) {
                    this.drawRectangle(x, y, 'gray');
                } else {
                    this.drawRectangle(x, y, 'lightgray', true);
                }
            }
        }
    }

    private renderCurrentPiece(piece: Piece | null, position: { x: number, y: number }): void {
        if (!piece) return;

        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece[y].length; x++) {
                if (piece[y][x] === 1) {
                    this.drawRectangle(position.x + x, position.y + y, 'blue');
                }
            }
        }
    }

    private renderNextPiece(piece: Piece | null): void {
        if (!piece) return;

        const startX = this.canvas.width - 100;
        const startY = 50;

        this.ctx.fillStyle = 'black';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Next Piece:', startX, startY - 20);

        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece[y].length; x++) {
                if (piece[y][x] === 1) {
                    this.drawRectangle(
                        (startX / this.cellSize) + x,
                        (startY / this.cellSize) + y,
                        'blue',
                        false,
                        this.cellSize / 2
                    );
                }
            }
        }
    }

    private drawRectangle(x: number, y: number, color: string, outline: boolean = false, size: number = this.cellSize): void {
        const rectX = x * size;
        const rectY = y * size;

        if (outline) {
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(rectX, rectY, size, size);
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(rectX, rectY, size, size);
        }
    }
}