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

    private clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private renderGrid(grid: Grid): void {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 1) {
                    this.drawTriangle(x, y, 'blue');
                } else {
                    this.drawTriangle(x, y, 'lightgray', true);
                }
            }
        }
    }

    private renderCurrentPiece(piece: Piece | null, position: { x: number, y: number }): void {
        if (!piece) return;

        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece[y].length; x++) {
                if (piece[y][x] === 1) {
                    this.drawTriangle(position.x + x, position.y + y, 'red');
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
                    this.drawTriangle(
                        (startX / this.cellSize) + x,
                        (startY / this.cellSize) + y,
                        'purple',
                        false,
                        this.cellSize / 2
                    );
                }
            }
        }
    }

    private drawTriangle(x: number, y: number, color: string, outline: boolean = false, size: number = this.cellSize): void {
        const centerX = x * size + size / 2;
        const centerY = y * size + size / 2;
        const direction = (x + y) % 2 === 0 ? 1 : -1; // Alternate direction

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        if (direction === 1) {
            // Pointing up
            this.ctx.moveTo(centerX, centerY - size / 2);
            this.ctx.lineTo(centerX - size / 2, centerY + size / 2);
            this.ctx.lineTo(centerX + size / 2, centerY + size / 2);
        } else {
            // Pointing down
            this.ctx.moveTo(centerX, centerY + size / 2);
            this.ctx.lineTo(centerX - size / 2, centerY - size / 2);
            this.ctx.lineTo(centerX + size / 2, centerY - size / 2);
        }
        this.ctx.closePath();

        if (outline) {
            this.ctx.strokeStyle = color;
            this.ctx.stroke();
        } else {
            this.ctx.fill();
        }
    }
}