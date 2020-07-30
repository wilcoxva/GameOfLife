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

    // handleClick(e) {
    //     if (e.target.classList.contains("deadCell")) {
    //         e.target.className = "aliveCell";
    //     } else {
    //         e.target.className = "deadCell";
    //     }
    // }
    
    handleToggle(e,x,y) {
        console.log(x,y)
        let newGrid = [...this.state.grid];
        if (newGrid[x][y] === 0) {
            newGrid[x][y] = 1;
        } else {
            newGrid[x][y] = 0;
        }
        this.setState({grid: newGrid})
    }

    // check neighbors
    // start at count = 0
    checkNeighbors() {
        let count = 0;
        let i;
        let j;
        let rows = this.state.grid.length
        for (i = 0; i < rows; i++) {
            for (j = 0; j < rows; j++) {
                
            }
        }
        return 
        
    }

    // check whole array to update the board
    checkBoard() {
        // look at a cell and calculate neighbors
        // decide whether newGrid(x,y) will be alive or dead
        this.checkNeighbors()
    }

    render() {
        return (
            <div className="game" onClick={this.handleClick}>
                {this.state.grid.map((row, x) => <Row>{row.map((cell, y) => <Cell alive={this.state.grid[x][y]} onClick={(e) => this.handleToggle(e,x,y) } />)}</Row>)}
                <button onClick={this.checkBoard()}>Play</button>
            </div>
        )
    }
}

export default Game;