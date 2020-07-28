import React from 'react';
import './Game.css';
import Row from './Row';

class Game extends React.Component {
    constructor() {
        super();
    }

    state = {
    }

    makeBoard(numberOfRows) {
        for (i = 0; i < numberOfRows; i++) {
            <Row />
        }
    }

    render() {
        return (
            <div class="game">
                {this.makeBoard(25)}
            </div>
        )
    }
}

export default Game;