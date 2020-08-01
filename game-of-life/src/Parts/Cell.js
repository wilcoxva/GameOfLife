import React from 'react';
import './Cell.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isRunning = this.props.isRunning ? "disableCell" : "";
        const className = this.props.alive ? "aliveCell" : "deadCell";
        return (
            <div className={[isRunning, className].join(" ")} style={{height:'25px', width:'25px', border: '1px solid azure' }} onClick={this.props.onClick}>{this.props.children}</div>
        )
    }
}

export default Cell;