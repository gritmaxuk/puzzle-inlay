import { Grid, Piece } from './types';

export class GameState {
    private grid: Grid;
    private currentPiece: Piece | null;
    private nextPiece: Piece | null;
    private currentPiecePosition: { x: number, y: number };

    constructor(initialGrid: Grid) {
        this.grid = initialGrid;
        this.currentPiece = null;
        this.nextPiece = null;
        this.currentPiecePosition = { x: 0, y: 0 };
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

    public getCurrentPiecePosition(): { x: number, y: number } {
        return this.currentPiecePosition;
    }

    public setCurrentPiece(piece: Piece): void {
        this.currentPiece = piece;
    }

    public setNextPiece(piece: Piece): void {
        this.nextPiece = piece;
    }

    public setCurrentPiecePosition(x: number, y: number): void {
        this.currentPiecePosition = { x, y };
    }

    public movePiece(dx: number, dy: number): boolean {
        const newX = this.currentPiecePosition.x + dx;
        const newY = this.currentPiecePosition.y + dy;

        if (this.canPlacePiece(newX, newY)) {
            this.currentPiecePosition = { x: newX, y: newY };
            return true;
        }
        return false;
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

        if (this.canPlacePiece(this.currentPiecePosition.x, this.currentPiecePosition.y, rotated)) {
            this.currentPiece = rotated;
        }
    }

    public placePiece(): boolean {
        if (!this.currentPiece) return false;

        const { x, y } = this.currentPiecePosition;

        if (this.canPlacePiece(x, y)) {
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

    private canPlacePiece(x: number, y: number, piece: Piece = this.currentPiece!): boolean {
        if (!piece) return false;

        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                if (piece[i][j] === 1) {
                    const gridY = y + i;
                    const gridX = x + j;
                    if (gridY >= this.grid.length || gridX >= this.grid[0].length || gridX < 0 || gridY < 0) {
                        return false; // Out of bounds
                    }
                    if (this.grid[gridY][gridX] === 1) {
                        return false; // Collision with existing piece
                    }
                }
            }
        }
        return true;
    }
}