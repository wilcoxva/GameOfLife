import React from 'react';
import './Cell.css';

class Cell extends React.Component {
    constructor() {
        super();
    }

    state = {
    }

    render() {
        return (
            <div>
                <div class="cell"></div>
            </div>
        )
    }
}

export default Cell;