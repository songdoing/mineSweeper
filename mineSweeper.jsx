import React, {useReducer, createContext, useMemo} from 'react';
import Table from './table';
import Form from './form';

export const TableContext = createContext({
    //초기값설정, 일단 모양만 그려
    tableData : [],
    dispatch : () => {},
});

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
    //cashing 해준다
    const [state, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => ({tableData: state.tableData, dispatch}), [])
    return(
        //value안에 컴퍼넌트에서 가져다 쓸 데이터를 적는다..근데 여기다 적으면
        //render될때마다 value라는 객체 생성되고 그 밑에 있는 컴퍼넌트도 다시 재렌더링
        //그래서 cashing를 해준다
        <TableContext.Provider value={value}>
        <Form />
        <div>{state.timer}</div>
        <Table />
        <div>{state.result}</div>
        </TableContext.Provider>
    );
};

export default MineSweeper;