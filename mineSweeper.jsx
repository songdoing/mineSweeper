import React, {useReducer, createContext, useMemo} from 'react';
import Table from './table';
import Form from './form';

export const TableContext = createContext({
    //초기값설정, 일단 모양만 그려
    tableData : [],
    halted : true,
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
    halted : true,
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
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';


const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME :
            return {
                ...state,
                tableData : plantMine(action.row, action.cell, action.mine),
                halted : false,
            };
        case OPEN_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            //tableData[action.row][action.cell] = CODE.OPENED;
            // 클릭한 칸이 code.opened로 바뀐다, td에서 dispatch해주라

            //클릭 주변 숫자보이기
            let around = [];
            //윗줄이 있는경우
            //윗세칸 concat 넣어주고
            if(tableData[action.row - 1]) {
                around = around.concat(
                    tableData[action.row - 1][action.cell - 1],
                    tableData[action.row - 1][action.cell],
                    tableData[action.row - 1][action.cell + 1],
                );
            }
            //양옆칸
                around = around.concat(
                    tableData[action.row][action.cell - 1],
                    tableData[action.row][action.cell + 1],
                );
            //아랫줄있는지 확인, 있는경우
            //아랫줄 넣어주기
            if(tableData[action.row + 1]){
                around = around.concat(
                    tableData[action.row + 1][action.cell - 1],
                    tableData[action.row + 1][action.cell],
                    tableData[action.row + 1][action.cell + 1],
                );
            }
            //주변 8칸 중에 filter로 몇개가 있는지 카운트   
            const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
            console.log(count);
            tableData[action.row][action.cell] = count;
            return {
                ...state,
                tableData,                
            };
        }
        case CLICK_MINE : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted : true,
            };
        }
        //보통칸-깃발칸-물음표칸-보통칸 : 우클릭할때마다 순환
        case FLAG_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
                console.log(tableData[action.row][action.cell]);
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
                console.log(tableData[action.row][action.cell]);
            }
            return {
                ...state,
                tableData,
            };
        }
        case QUESTION_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
              tableData[action.row][action.cell] = CODE.QUESTION_MINE;
              console.log(tableData[action.row][action.cell]);
            } else {
              tableData[action.row][action.cell] = CODE.QUESTION;
              console.log(tableData[action.row][action.cell]);
            }
            return {
              ...state,
              tableData,
            };
        }
        case NORMALIZE_CELL : {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
              tableData[action.row][action.cell] = CODE.MINE;
              console.log(tableData[action.row][action.cell]);
            } else {
              tableData[action.row][action.cell] = CODE.NORMAL;
              console.log(tableData[action.row][action.cell]);
            }
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
    const {tableData, halted, timer, result} = state;
    const value = useMemo(() => ({tableData: tableData, halted : halted, dispatch}), [tableData, halted]);

    return(
        //value안에 컴퍼넌트에서 가져다 쓸 데이터를 적는다..근데 여기다 적으면
        //render될때마다 value라는 객체 생성되고 그 밑에 있는 컴퍼넌트도 다시 재렌더링
        //그래서 cashing를 해준다
        <TableContext.Provider value={value}>
        <Form />
        <div>{timer}</div>
        <Table />
        <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSweeper;