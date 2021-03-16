import React, {useReducer, createContext, useMemo} from 'react';
import Table from './table';
import Form from './form';

export const TableContext = createContext({
    //초기값설정, 일단 모양만 그려
    tableData : [],
    dispatch : () => {},
});

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION : -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE : -6,
    OPENED : 0, //0 이상이면 모두 opened인것임
}

const initialState = {
    tableData : [], //2차원 배열이 될거임
    timer : 0,
    result : '',
};

//지뢰를 심는 함수
const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i; //0~99
    });
    const shuffle = [];
    while(candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i = 0; i <row; i++){ //100칸중에 정상적인 칸
        const rowData = [];
        data.push(rowData);
        for(let j =0 ; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k =0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }
    console.log(data);
    return data;  //tableData
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME :
            return {
                ...state,
                tableData : plantMine(action.row, action.cell, action.mine)
            };
        case OPEN_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.OPENED;
            // 클릭한 칸이 code.opened로 바뀐다, td에서 dispatch해주라
            return {
                ...state,
                tableData,                
            };
        }
        default : 
        return state;
    }
};

const MineSweeper = () => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    //cashing 해준다: useMemo를 이용해서 state.tableData가 바뀔때만 실행되도록 해야
    //contextAPI의 매번 랜더링되어 발생하는 성능저하를 막을 수 있다.
    const value = useMemo(() => ({tableData: state.tableData, dispatch}), [state.tableData]);

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