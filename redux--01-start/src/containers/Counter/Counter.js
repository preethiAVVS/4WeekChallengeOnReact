import React, { Component } from 'react';
import * as actionTypes from "../../store/actions";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import {connect} from "react-redux";

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrememt} />
                <CounterControl label="Decrement" clicked={this.props.onDecrememt}  />
                <CounterControl label="Add 5" clicked={this.props.onADD}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSUB}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Data</button>
                <ul>
                    {this.props.storedVal.map(result => {
                        return   <li key={result.id} onClick={() => this.props.onDeleteResult(result.id)}>{result.value}</li>
                    })}
                  
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ctr: state.ctr.counter,
        storedVal: state.res.results
    }
}

const dispatchProps = (dispatch) => {
    return {
        onIncrememt: () => dispatch({type: actionTypes.INC}),
        onDecrememt: () => dispatch({type: actionTypes.DEC}),
        onADD: () => dispatch({type: actionTypes.ADD, value: 5}),
        onSUB: () => dispatch({type: actionTypes.SUB, value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE, value: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DEL, value: id})
    }
}
export default connect(mapStateToProps, dispatchProps)(Counter);