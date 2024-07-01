import { GameState } from './GameState';
import { Piece } from './types';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private smallCanvas: HTMLCanvasElement;
    private smallCtx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, smallCanvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.smallCanvas = smallCanvas;
        this.smallCtx = smallCanvas.getContext('2d')!;
    }

    render(gameState: GameState, draggingPiece?: Piece, dragOffset?: { x: number, y: number }) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const grid = gameState.getGrid();

        grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                this.ctx.fillStyle = cell === 1 ? '#808080' : (cell === 2 ? '#0000FF' : '#FFFFFF'); // Gray for 1, Blue for 2, White for 0
                this.ctx.fillRect(x * 30, y * 30, 30, 30);

                // Draw border
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x * 30, y * 30, 30, 30);
            });
        });

        this.renderSmallBoard(gameState.getNextPiece()!);

        if (draggingPiece && dragOffset) {
            this.renderDraggingPiece(draggingPiece, dragOffset);
        }
    }

    private renderSmallBoard(piece: Piece) {
        this.smallCtx.clearRect(0, 0, this.smallCanvas.width, this.smallCanvas.height);

        piece.forEach((row, y) => {
            row.forEach((cell, x) => {
                this.smallCtx.fillStyle = cell === 1 ? '#FF0000' : '#FFFFFF'; // Red for 1, White for 0
                this.smallCtx.fillRect(x * 30, y * 30, 30, 30);

                // Draw border
                this.smallCtx.strokeStyle = '#000000';
                this.smallCtx.lineWidth = 2;
                this.smallCtx.strokeRect(x * 30, y * 30, 30, 30);
            });
        });
    }

    private renderDraggingPiece(piece: Piece, offset: { x: number, y: number }) {
        piece.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    this.ctx.fillStyle = '#FF0000'; // Red for dragging piece
                    this.ctx.fillRect(offset.x + x * 30, offset.y + y * 30, 30, 30);

                    // Draw border
                    this.ctx.strokeStyle = '#000000';
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(offset.x + x * 30, offset.y + y * 30, 30, 30);
                }
            });
        });
    }
}