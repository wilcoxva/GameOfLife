import React from 'react';
import './Cell.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const className = this.props.alive ? "aliveCell" : "deadCell";
        return (
            <div className={className} style={{height:'25px', width:'25px', border: '1px solid azure'}} onClick={this.props.onClick}></div>
        )
    }
}

export default Cell;