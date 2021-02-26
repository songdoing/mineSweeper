import React, {useReducer} from 'react';
import Table from './table';
import Form from './form';

const initialState = {
    tableData : [],
    timer : 0,
    result : '',
};

const reducer = (state, action) => {
    switch (action.type) {
        default : 
        return state;
    }
};

const MineSweeper = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <>
        <Form />
        <div>{state.timer}</div>
        <Table />
        <div>{state.result}</div>
        </>
    );
};

export default MineSweeper;