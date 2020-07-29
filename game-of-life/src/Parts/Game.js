import React from 'react';
import './Game.css';
import Row from './Row';
import Cell from './Cell';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            // board: this.makeBoard(25),
            grid: this.makeGrid(25),
        }
    }

    // makeBoard(numRows) {
    //     let i;
    //     let board = [];
    //     for (i = 0; i < numRows; i++) {
    //         board.push(<Row />)
    //     } console.log(board)
    //     return board
    // }

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

    handleClick(e) {
        if (e.target.classList.contains("deadCell")) {
            e.target.className = "aliveCell";
        } else {
            e.target.className = "deadCell";
        }
    }
    
    handleToggle(x,y) {
        console.log(x,y)
        let newGrid = [...this.state.grid]
        if (newGrid[x][y] === 0) {
            newGrid[x][y] = 1;
        } else {
            newGrid[x][y] = 0;
        }
        this.setState({grid: newGrid})
        console.log(this.state.grid)
    }

    // check neighbors
    // start at count = 0

    // check whole array to update the board

    render() {
        return (
            <div className="game" onClick={this.handleClick}>
                {/* <h1>{this.state.board.map(row => <div>{row}</div>)}</h1> */}
        {this.state.grid.map((row, x) => <Row>{row.map((cell, y) => <Cell onClick={() => this.handleToggle(x,y) } />)}</Row>)}
            </div>
        )
    }
}

export default Game;