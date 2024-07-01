import { Grid, Piece } from './types';

export function parseBoardFromFile(fileContent: string): Grid {
    const lines = fileContent.trim().split('\n');
    const boardEnd = lines.findIndex(line => line === '');
    return lines.slice(0, boardEnd).map(line => 
        line.split('').map(char => char === '1' ? 1 : 0)
    );
}

export function parsePiecesFromFile(fileContent: string): Piece[] {
    const lines = fileContent.trim().split('\n');
    const boardEnd = lines.findIndex(line => line === '');
    const piecesContent = lines.slice(boardEnd + 1).join('\n');
    const pieces = piecesContent.split('\n\n');
    return pieces.map(piece => 
        piece.trim().split('\n').map(line => 
            line.split('').map(char => char === '1' ? 1 : 0)
        )
    );
}