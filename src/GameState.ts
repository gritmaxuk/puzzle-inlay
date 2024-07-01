import { Grid, Piece } from './types';

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
        this.nextPiece = null;
        this.currentPiecePosition = { x: 0, y: 0 };
    }

    public reset(): void {
        this.grid = this.createGridFromShape(this.grid);
        this.currentPiece = this.getRandomPiece();
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
        const rotatedPiece = this.rotateMatrix(this.currentPiece);
        if (this.canPlacePiece(this.currentPiecePosition.x, this.currentPiecePosition.y, rotatedPiece)) {
            this.currentPiece = rotatedPiece;
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

                    if (gridY < 0 || gridY >= this.grid.length || gridX < 0 || gridX >= this.grid[0].length) {
                        return false;
                    }

                    if (this.grid[gridY][gridX] === 1) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    private rotateMatrix(matrix: Piece): Piece {
        const N = matrix.length;
        const rotated = matrix.map((row, i) =>
            row.map((val, j) => matrix[N - 1 - j][i])
        );
        return rotated;
    }
}