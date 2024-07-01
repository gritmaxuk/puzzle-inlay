import { Grid, Piece } from './types';

export class GameState {
    private grid: Grid;
    private currentPiece: Piece | null;
    private nextPiece: Piece | null;

    constructor(initialGrid: Grid) {
        this.grid = initialGrid;
        this.currentPiece = null;
        this.nextPiece = null;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public getCurrentPiece(): Piece | null {
        return this.currentPiece;
    }

    public getNextPiece(): Piece | null {
        return this.nextPiece;
    }

    public setCurrentPiece(piece: Piece): void {
        this.currentPiece = piece;
    }

    public setNextPiece(piece: Piece): void {
        this.nextPiece = piece;
    }

    public placePiece(x: number, y: number): boolean {
        if (!this.currentPiece) return false;

        // Check if the piece can be placed at the given position
        if (this.canPlacePiece(x, y)) {
            // Place the piece on the grid
            for (let i = 0; i < this.currentPiece.length; i++) {
                for (let j = 0; j < this.currentPiece[i].length; j++) {
                    if (this.currentPiece[i][j] === 1) {
                        this.grid[y + i][x + j] = 1;
                    }
                }
            }
            return true;
        }
        return false;
    }

    private canPlacePiece(x: number, y: number): boolean {
        if (!this.currentPiece) return false;

        for (let i = 0; i < this.currentPiece.length; i++) {
            for (let j = 0; j < this.currentPiece[i].length; j++) {
                if (this.currentPiece[i][j] === 1) {
                    if (y + i >= this.grid.length || x + j >= this.grid[0].length) {
                        return false; // Out of bounds
                    }
                    if (this.grid[y + i][x + j] === 1) {
                        return false; // Collision with existing piece
                    }
                }
            }
        }
        return true;
    }

    public rotatePiece(): void {
        if (!this.currentPiece) return;

        const rows = this.currentPiece.length;
        const cols = this.currentPiece[0].length;
        const rotated: Piece = Array(cols).fill(0).map(() => Array(rows).fill(0));

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = this.currentPiece[i][j];
            }
        }

        this.currentPiece = rotated;
    }
}
