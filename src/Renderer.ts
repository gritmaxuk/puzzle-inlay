import { GameState } from './GameState';
import { Grid, Piece } from './types';
import { CAT_SHAPE } from './gameData';

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
        this.renderBoard();
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

    private renderBoard(): void {
        for (let y = 0; y < CAT_SHAPE.length; y++) {
            for (let x = 0; x < CAT_SHAPE[y].length; x++) {
                if (CAT_SHAPE[y][x] === 1) {
                    this.drawTriangle(x, y, '#e0e0e0', this.isTriangleBaseDown(x, y));
                }
            }
        }
    }

    private renderGrid(grid: Grid): void {
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] === 1) {
                    this.drawTriangle(x, y, 'gray', this.isTriangleBaseDown(x, y));
                }
            }
        }
    }

    private renderCurrentPiece(piece: Piece | null, position: { x: number, y: number }): void {
        if (!piece) return;

        for (let y = 0; y < piece.length; y++) {
            for (let x = 0; x < piece[y].length; x++) {
                if (piece[y][x] === 1) {
                    this.drawTriangle(position.x + x, position.y + y, 'blue', this.isTriangleBaseDown(position.x + x, position.y + y));
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
                    const pieceX = Math.floor(startX / this.cellSize) + x;
                    const pieceY = Math.floor(startY / this.cellSize) + y;
                    this.drawTriangle(
                        pieceX,
                        pieceY,
                        'blue',
                        this.isTriangleBaseDown(pieceX, pieceY),
                        this.cellSize / 2
                    );
                }
            }
        }
    }

    private isTriangleBaseDown(x: number, y: number): boolean {
        return (y % 2 === 0) ? (x % 2 === 1) : (x % 2 === 0);
    }

    private drawTriangle(x: number, y: number, color: string, isBaseDown: boolean, size: number = this.cellSize): void {
        const leftX = x * size;
        const rightX = (x + 1) * size;
        const topY = y * size;
        const bottomY = (y + 1) * size;

        this.ctx.fillStyle = color;
        this.ctx.beginPath();

        if (isBaseDown) {
            // Triangle with base down
            this.ctx.moveTo(leftX, topY);
            this.ctx.lineTo(rightX, topY);
            this.ctx.lineTo((leftX + rightX) / 2, bottomY);
        } else {
            // Triangle with base up
            this.ctx.moveTo(leftX, bottomY);
            this.ctx.lineTo(rightX, bottomY);
            this.ctx.lineTo((leftX + rightX) / 2, topY);
        }

        this.ctx.closePath();
        this.ctx.fill();

        // Draw triangle outline
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
    }
}