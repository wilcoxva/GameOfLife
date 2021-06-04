import React from 'react';
import './Game.css';
import Row from './Row';
import Cell from './Cell';

class Game extends React.Component {
    constructor() {
        super();
        let count = 0;
        let media = window.matchMedia('(max-width: 768px)');
        if (media.matches) {
            count = 10;
        } else {
            count = 20;
        }
        this.runGenerations = this.runGenerations.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            grid: this.makeGrid(count),
            isRunning: false,
            interval: 100,
            generation: 0,
            size: count,
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
    
    handleToggle(x,y) {
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
        }
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
        this.setState({ grid: newGrid });
        this.setState({ generation: this.state.generation += 1 })

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
            this.setState({ size: event.target.value, grid: this.makeGrid(event.target.value)});
        } else {
            return
        }
        if (event.target.value === 0) {
            this.setState({ size: '' })
        } else {
            return
        }
    }

    handleClear = () => {
        this.setState({ grid: this.makeGrid(25)});
        this.setState({ generation: 0 })
    }

    generationSteps() {
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
        this.setState({ grid: newGrid });
        this.setState({ generation: this.state.generation += 1 })
    }

    runGenerations() {
        this.generationSteps();
    }

    render() {
        return (
            <div className="game">
                <div className="center">
                    <div className="bio">
                        <h1 className="title">Conway's Game of Life!</h1>
                        <p>The Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.</p>
                        <h3 className="title">Rules:</h3>
                        <p>Any live cell with two or three live neighbours survives.
                            Any dead cell with three live neighbours becomes a live cell.
                            All other live cells die in the next generation. Similarly, all other dead cells stay dead.</p>
                    </div>
                    <div className="controls">
                        <h3 className="title">Control Panel</h3>
                        <p>Change board <span>dimensions</span>: <input type="number" value={this.state.size} onChange={this.handleSizeChange} /></p>
                        <p>Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> <span>msec</span>.</p>
                        <p><span>Generation</span>: #{this.state.generation}</p>
                        <p>Step through each generation <span>manually</span>: <button onClick={this.runGenerations}>Click Me</button></p>
                        {this.state.isRunning ?
                            <button onClick={this.stopGame}>Stop</button> :
                            <button onClick={this.runGame}>Run</button>
                        }
                        <button className="button" onClick={this.handleClear}>Clear</button>
                        <br />
                        <a href='https://www.freepik.com/photos/background'>Background photo created by denamorado - www.freepik.com</a>
                    </div>
                </div>
                <div className="grid">{this.state.grid.map((row, x) => <Row key={x}>{row.map((cell, y) => <Cell key={y} isRunning={this.state.isRunning} alive={this.state.grid[x][y]} onClick={(e) => this.handleToggle(x,y) } />)}</Row>)}</div>
            </div>
        )
    }
}

export default Game;