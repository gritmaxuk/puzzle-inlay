import { Piece } from './types';

export class PieceGenerator {
    private pieces: Piece[];

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }

    public getRandomPiece(): Piece {
        const index = Math.floor(Math.random() * this.pieces.length);
        return this.pieces[index];
    }
}