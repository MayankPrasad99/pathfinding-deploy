import React , { Component } from 'react'
import styles from './Input.module.css'
import {TextField} from '@material-ui/core'
export class GetInput extends Component {
    constructor(props) {
        super(props);
        this.startXchange = this.startXchange.bind(this);
        this.startYchange = this.startYchange.bind(this);
        this.endXchange = this.endXchange.bind(this);
        this.endYchange = this.endYchange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        newXst: this.props.stX,
        newYst: this.props.stY,
        newXend: this.props.endX,
        newYend: this.props.endY,
    }
    startXchange(new_value) {
        this.setState({newXst: new_value});
    }
    
    startYchange(new_value) {
        this.setState({newYst: new_value});
    }
    
    endXchange(new_value) {
        this.setState({newXend: new_value});
    }
    
    endYchange(new_value) {
        this.setState({newYend: new_value});
    }
    handleChange () {
        this.props.handleChange(this.state.newXst,this.state.newYst,this.state.newXend,this.state.newYend);
    }
    render () {
        return (
            <form className={styles.input} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Starting Postion (X)" onChange={(e) => this.startXchange(e.target.value)} />
                <TextField id="standard-basic" label="Staring Position (Y)" onChange={(e) => this.startYchange(e.target.value)} />
                <TextField id="standard-basic" label="Final Position (X)" onChange={(e) => this.endXchange(e.target.value)} />
                <TextField id="standard-basic" label="Final Position (Y)" onChange={(e) => this.endYchange(e.target.value)} />
                <button className="button button1" type="button" onClick={this.handleChange}>Change</button>
            </form>
        )
        
    }
};
export default GetInput
