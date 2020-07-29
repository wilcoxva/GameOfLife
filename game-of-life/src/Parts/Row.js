import React from 'react';
import './Row.css';
import Cell from './Cell';

class Row extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            row: this.makeRow(25),
        }
    }

    makeRow(numCells) {
        let i;
        let row = [];
        for (i = 0; i < numCells; i++) {
            row.push(<Cell />)
        }
        return row;
    }

    render() {
        const {children} = this.props
        return (
            <div className="row" {...this.props}>{children}</div>
        )
    }
}

export default Row;