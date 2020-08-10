import React, { Component } from 'react'
import Node from './Node/Node'
import './PathfindingVisualizer.css'
import {dijkstra,getShortestPathNodes} from '../Algorithms/Dijkstra'
import Navbar from '../Navbar/Navbar'
import GetInput from '../Input/Input'

export class PathfindingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            grid: [],
            mouseIsPressed: false,
            START_NODE_ROW: 3,
            START_NODE_COL: 7,
            END_NODE_COL: 39,
            END_NODE_ROW: 15,

        };
    }

    componentDidMount() {
        const grid = createGrid(this.state.START_NODE_COL, this.state.START_NODE_ROW, this.state.END_NODE_COL, this.state.END_NODE_ROW);
        this.setState({grid});
    }

    handleMouseDown(row, col) {
        const newGrid = getGridWithWall(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }
    
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getGridWithWall(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
    
    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }
    
    animateVisitedNodes(visitedNodes, nodesInShortestPath) {
        for (let i = 0; i <= visitedNodes.length; i++) {
          if (i === visitedNodes.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPath);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }
    
    animateShortestPath(nodesInShortestPath) {
        for (let i = 0; i < nodesInShortestPath.length; i++) {
            setTimeout(() => {
            const node = nodesInShortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 50 * i);
        }
    }
    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const endNode = grid[this.state.END_NODE_ROW][this.state.END_NODE_COL];
        const edges = makeEdges(grid);
        const visitedNodes = dijkstra(grid, startNode, endNode, edges);
        const nodesInShortestPath = getShortestPathNodes(startNode,endNode);
        const n = nodesInShortestPath.length;
        const m = visitedNodes.length;
        this.animateVisitedNodes(visitedNodes.slice(1,m-1), nodesInShortestPath.slice(1,n-1));
    }
    
    resetGrid() {
        const newGrid = createGrid(this.state.START_NODE_COL, this.state.START_NODE_ROW, this.state.END_NODE_COL, this.state.END_NODE_ROW);
        this.setState({grid: newGrid});
        const nodes = [];
        const {grid} = this.state;
        for (const row of grid) {
            for (const node of row) {
                nodes.push(node);
            }
        }
        for(let i = 0;i < nodes.length;i++) {
            const node = nodes[i];
            const {col, row, isFinish, isStart} = node;
            const NodeClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
            document.getElementById(`node-${row}-${col}`).className = `node ${NodeClassName}`;
        }
    }
    handleChange(stX, stY, endX, endY) {
        if(parseInt(stX) < 0 || parseInt(stX) >= 20 || parseInt(stY) < 0 || parseInt(stY) >= 50 || parseInt(endX) < 0 || parseInt(endX) >= 20 || parseInt(endY) < 0 || parseInt(endY) >= 50) {
            alert("Values entered dont fit in the Grid!!");
        }else {
            this.setState({START_NODE_ROW: parseInt(stX), START_NODE_COL: parseInt(stY), END_NODE_ROW: parseInt(endX), END_NODE_COL: parseInt(endY)}, () => {
                this.resetGrid();
            });
        }
    }
    render() {
        const {grid, mouseIsPressed} = this.state;    
        return (
            <>
            <Navbar></Navbar>
            <button className="button button1" onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <button className="button button1" onClick={() => this.resetGrid()}>
                Reset Grid
            </button>
            <GetInput handleChange = {this.handleChange} stX = {this.state.START_NODE_ROW} stY = {this.state.START_NODE_COL}
                        endX = {this.state.END_NODE_ROW} endY = {this.state.END_NODE_COL}></GetInput>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {col, row, isFinish, isStart, isWall} = node;
                            return (
                                <Node
                                key = {nodeIdx}
                                col = {col}
                                row = {row}
                                isFinish = {isFinish}
                                isStart = {isStart}
                                isWall={isWall}
                                mouseIsPressed={mouseIsPressed}
                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                onMouseUp={() => this.handleMouseUp()}></Node>
                            );
                        })}
                        </div>
                    );
                })}              
            </div>
            </>
        ); 
    }
}

const createGrid = (startc, startr, endc, endr) => {
    const grid = [];
    for(let row = 0; row < 20; row++){
        const currentRow = [];
        for(let col = 0; col < 50; col++){
            currentRow.push(createNode(row,col,startr,startc,endr,endc));
            console.log(row,col,startr,startc,endr,endc);
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (row,col,startr,startc,endr,endc) => {
    return {
        col,
        row,
        isStart: row === startr && col === startc,
        isFinish: row === endr && col === endc,
        isWall: false,
    };
};

function makeEdges(grid) {
    const row = grid.length;
    const col = grid[0].length;
    const edges = [];
    let totalNodes = row*col;
    for(let i=0;i<row*col;i++){
        edges[i] = [];
        for(let j=0;j<row*col;j++){
            edges[i][j] = 0;
        }
    }
    let tempRow = 0;
    let tempCol = 0;
    for(let i=0;i<totalNodes;i++){
        if(tempCol + 1 < col){
            edges[i][tempRow*col + tempCol + 1] = 1;
        }
        if(tempCol - 1 >= 0){
            edges[i][tempRow*col + tempCol - 1] = 1;
        }
        if(tempRow + 1 < row){
            edges[i][(tempRow+1)*col + tempCol] = 1;            
        }
        if(tempRow - 1 >= 0){
            edges[i][(tempRow-1)*col + tempCol] = 1;    
        }
        tempCol += 1;
        if(tempCol >= col){
            tempCol = 0;
            tempRow += 1;
        }
    }
    return edges;
}

const getGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
  

export default PathfindingVisualizer


