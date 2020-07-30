import React from 'react';
import './Game.css';
import Row from './Row';
import Cell from './Cell';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: this.makeGrid(25),
        }
    }

    makeGrid(numRows) {
        let i;
        let j;
        let grid = [];
        for (i = 0; i < numRows; i++) {
            grid[i] = [];
            for (j = 0; j < numRows; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }
    
    handleToggle(e,x,y) {
        console.log(x,y)
        console.log("checkneighbors ", this.checkNeighbors(this.state.grid,x,y))
        let newGrid = [...this.state.grid];
        if (newGrid[x][y] === 0) {
            newGrid[x][y] = 1;
        } else {
            newGrid[x][y] = 0;
        }
        this.setState({grid: newGrid})
        
    }

    checkNeighbors(grid, x, y) {
        let count = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.state.grid.length && y1 >= 0 && y1 < this.state.grid.length && grid[x1][y1]) {
                count++;
            }
        }
        return count;
        
    }

    checkBoard() {
        let rows = this.state.grid.length;
        let newGrid = this.makeGrid(25);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                let neighbors = this.checkNeighbors(newGrid, i, j);
                if (this.state.grid[i][j]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newGrid[i][j] = 1;
                    } else {
                        newGrid[i][j] = 0;
                    }
                } else {
                    if (!this.state.grid[i][j] && neighbors === 3) {
                        newGrid[i][j] = 1;
                    }
                }
            }
        }
        this.setState({grid: newGrid});
        console.log("newgrid", newGrid)
    }

    // display a count of how many times a button was clicked


    render() {
        return (
            <div className="game">
                {this.state.grid.map((row, x) => <Row>{row.map((cell, y) => <Cell alive={this.state.grid[x][y]} onClick={(e) => this.handleToggle(e,x,y) } />)}</Row>)}
                <button onClick={this.checkBoard}>Press Me</button>
            </div>
        )
    }
}

export default Game;