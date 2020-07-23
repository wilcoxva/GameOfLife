import React from 'react';
import './Game.css';

// Model the game world

// Comprised of rows and columns which can be represented using a multidimensional array
// The values in the array would be objects containing that cell's state
// That state includes what the cell contains, its coordinates in the grid, and perhaps other information for diagnostic purposes
// Using an object to store the state will allow you to add more properties later that you didn't consider at first, reducing rewrite
// Once you have grid set up you can bind UI to it

const ht = 600;
const wth = 800;
const cell = 20;

class Game extends React.Component {
    constructor() {
        super();
        this.row = ht / cell;
        this.col = wth / cell;

        this.grid = this.makeGrid();
    }

    state = {
        cells: [],
    }

    makeGrid() {
        let grid = [];
        for (let i=0; i < this.row; i++) {
            grid[i] = [];
            for (let j = 0; j < this.col; j++) {
                grid[i][j] = false;
            };
        };
        return grid;
    };

    makeCells() {
        let cells = [];
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.col; j++) {
                if (this.grid[i][j]) {
                    cells.push({ j,i });
                };
            };
        };
        return cells;
    };

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default Game;