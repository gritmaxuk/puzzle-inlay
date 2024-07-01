import { Grid, Piece, CellState } from './types';

export function parseBoardFromFile(fileContent: string): Grid {
    const lines = fileContent.trim().split('\n');
    const boardEnd = lines.findIndex(line => line === '');
    const rawGrid = lines.slice(0, boardEnd).map(line => 
        line.split('').map(char => char === '1' ? 1 : 0)
    );

    // Convert single cells to connected rectangles
    const connectedGrid: Grid = [];
    for (let y = 0; y < rawGrid.length; y += 2) {
        const row: CellState[] = [];
        for (let x = 0; x < rawGrid[y].length; x += 2) {
            if (y + 1 < rawGrid.length && x + 1 < rawGrid[y].length) {
                const cellValue: CellState = (
                    rawGrid[y][x] + 
                    rawGrid[y][x+1] + 
                    rawGrid[y+1][x] + 
                    rawGrid[y+1][x+1]
                ) > 0 ? 1 : 0;
                row.push(cellValue);
            }
        }
        connectedGrid.push(row);
    }

    return connectedGrid;
}

export function parsePiecesFromFile(fileContent: string): Piece[] {
    const lines = fileContent.trim().split('\n');
    const boardEnd = lines.findIndex(line => line === '');
    const piecesContent = lines.slice(boardEnd + 1).join('\n');
    const pieces = piecesContent.split('\n\n');
    return pieces.map(piece => 
        piece.trim().split('\n').map(line => 
            line.split('').map(char => char === '1' ? 1 : 0) as CellState[]
        )
    );
}