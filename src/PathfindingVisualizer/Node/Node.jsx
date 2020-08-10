import React, { Component } from 'react'
import './Node.css'

export class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {
            col,
            row,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;
        const NodeClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';

        return(
            <div 
            id={`node-${row}-${col}`}
            className={`node ${NodeClassName}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}></div>
        )
    }
}

export default Node
