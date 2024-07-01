import { GameState } from './GameState';

export class Renderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
    }

    render(gameState: GameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const grid = gameState.getGrid();

        grid.forEach((row, y) => {
            row.forEach((cell, x) => {
                this.ctx.fillStyle = cell === 1 ? '#808080' : '#FFFFFF'; // Gray for 1, White for 0
                this.ctx.fillRect(x * 30, y * 30, 30, 30);

                // Draw border
                this.ctx.strokeStyle = '#000000';
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x * 30, y * 30, 30, 30);
            });
        });
    }
}