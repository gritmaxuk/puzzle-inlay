import { Grid, Piece, CellState } from './types';

export class GameState {
    private grid: Grid;
    private pieces: Piece[];
    private currentPiece: Piece | null;
    private nextPiece: Piece | null;
    private currentPiecePosition: { x: number, y: number };

    constructor(initialGrid: Grid, pieces: Piece[]) {
        this.grid = this.createGridFromShape(initialGrid);
        this.pieces = pieces;
        this.currentPiece = null;
        this.nextPiece = this.getRandomPiece();
        this.currentPiecePosition = { x: 0, y: 0 };
    }

    public reset(): void {
        this.grid = this.createGridFromShape(this.grid);
        this.currentPiece = null;
        this.nextPiece = this.getRandomPiece();
        this.currentPiecePosition = { x: 0, y: 0 };
    }

    private createGridFromShape(shape: Grid): Grid {
        return shape.map(row => row.slice());
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

    public getRandomPiece(): Piece {
        return this.pieces[Math.floor(Math.random() * this.pieces.length)];
    }

    public canPlacePiece(x: number, y: number, piece: Piece = this.currentPiece!): boolean {
        if (!piece) return false;

        for (let i = 0; i < piece.length; i++) {
            for (let j = 0; j < piece[i].length; j++) {
                if (piece[i][j] === 1) {
                    const gridY = y + i;
                    const gridX = x + j;

                    if (gridY < 0 || gridY >= this.grid.length || gridX < 0 || gridX >= this.grid[0].length) {
                        return false;
                    }

                    if (this.grid[gridY][gridX] !== 1) { // Ensure the piece can only be placed on gray cells
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public placePiece(x: number, y: number): boolean {
        if (!this.nextPiece) return false;

        if (this.canPlacePiece(x, y, this.nextPiece)) {
            for (let i = 0; i < this.nextPiece.length; i++) {
                for (let j = 0; j < this.nextPiece[i].length; j++) {
                    if (this.nextPiece[i][j] === 1) {
                        this.grid[y + i][x + j] = 2; // Mark the cell as occupied (blue)
                    }
                }
            }
            this.nextPiece = this.getRandomPiece();
            return true;
        }
        return false;
    }

    public rotateNextPiece(): void {
        if (this.nextPiece) {
            this.nextPiece = this.rotateMatrix(this.nextPiece);
        }
    }

    private rotateMatrix(matrix: Piece): Piece {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                rotated[x][rows - 1 - y] = matrix[y][x];
            }
        }

        return rotated;
    }
}