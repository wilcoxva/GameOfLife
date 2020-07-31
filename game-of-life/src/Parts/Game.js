import React from 'react';
import './Game.css';
import Row from './Row';
import Cell from './Cell';

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            grid: this.makeGrid(25),
            isRunning: false,
            interval: 100,
            generation: 0,
            size: 25,
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
            let x1 = x + dir[0];
            let y1 = y + dir[1];

            if (x1 >= 0 && x1 < this.state.grid.length && y1 >= 0 && y1 < this.state.grid.length && grid[x1][y1]) {
                count++;
            }
        }console.log(count)
        return count;
    }

    checkBoard() {
        let rows = this.state.grid.length;
        let newGrid = this.makeGrid(25);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < rows; j++) {
                let neighbors = this.checkNeighbors(this.state.grid, i, j);
                if (this.state.grid[i][j]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newGrid[i][j] = 1;
                    } else {
                        newGrid[i][j] = 0;
                    }
                } else {
                    if (!this.state.grid[i][j] && neighbors === 3) {
                        newGrid[i][j] = 1;
                    } else {
                        newGrid[i][j] = 0;
                    }
                }
            }
        }
        this.setState({grid: newGrid});

        this.timeoutHandler = window.setTimeout(() => {
            this.runGame();
        }, this.state.interval);
    }

    runGame = () => {
        this.setState({ isRunning: true });
        this.checkBoard();
    }

    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    handleSizeChange = (event) => {
        if (event.target.value < 100) {
        this.setState({ size: Number(event.target.value), grid: this.makeGrid(Number(event.target.value))});
        }
    }

    handleClear = () => {
        this.state.grid = this.makeGrid(25);
    }

    render() {
        return (
            <div className="game">
                {this.state.grid.map((row, x) => <Row>{row.map((cell, y) => <Cell alive={this.state.grid[x][y]} onClick={(e) => this.handleToggle(e,x,y) } />)}</Row>)}
                Use the up and down arrows to
                <br />Change board dimensions: <input type="number" value={this.state.size} onChange={this.handleSizeChange} />
                <br />Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
                <br />Generation: #{this.state.generation}
                <br />Step through each generation manually <button>Click Me</button>
                <br />{this.state.isRunning ?
                    <button className="button" onClick={this.stopGame}>Stop</button> :
                    <button className="button" onClick={this.runGame}>Run</button>
                }
                <button className="button" onClick={this.handleClear}>Clear</button>
            </div>
        )
    }
}

export default Game;