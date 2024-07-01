import { Piece } from './types';

export class PieceGenerator {
    private pieces: Piece[];

    constructor(pieces: Piece[]) {
        this.pieces = pieces;
    }

    public getRandomPiece(): Piece {
        return this.pieces[Math.floor(Math.random() * this.pieces.length)];
    }
}