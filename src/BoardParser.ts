import { Grid, Piece } from './types';
import { CAT_SHAPE, PIECE_VARIANTS } from './gameData';

export function parseBoard(): Grid {
    return CAT_SHAPE;
}

export function parsePieces(): Piece[] {
    return PIECE_VARIANTS;
}