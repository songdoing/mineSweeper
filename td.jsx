import React, {useContext, useCallback} from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, TableContext } from './mineSweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
        case CODE.MINE :
            return {
                background : 'dodgerblue',
            };
        case CODE.CLICKED_MINE :
            return {
                background : 'black',
            }
        case CODE.OPENED :
            return {
                background : 'skyblue',
            };
        case CODE.QUESTION :
        case CODE.QUESTION_MINE :
            return {
                background : 'yellow',
            };
        case CODE.FLAG_MINE :
        case CODE.FLAG :
            return {
                background : 'red',
            };
        default : 
            return {
                background : 'white',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL :
            return  '';
        case CODE.MINE :
            return 'X';
        case CODE.CLICKED_MINE : 
            return 'B';
        case CODE.FLAG_MINE :
        case CODE.FLAG :
            return '!';
        case CODE.QUESTION_MINE :
        case CODE.QUESTION :
            return '?';
        default :
            return '';    
    }
};

const Td = ( { rowIndex, cellIndex }) => {
    const { tableData, dispatch} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        // td를 클릭하면, dispatch에 클릭한 정보가 들어가고, MineSweeper에서 정보변경

        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED :
            case CODE.FLAG_MINE :
            case CODE.FLAG :
            case CODE.QUESTION_MINE :
            case CODE.QUESTION :
                return;
            case CODE.NORMAL :
                dispatch({ type : OPEN_CELL, row:rowIndex, cell: cellIndex });
                return;
            case CODE.MINE : 
                dispatch ( { type : CLICK_MINE, row : rowIndex, cell : cellIndex});
                return;
            default : 
                return;
        }
        
        
    }, []);

    return (
        <td
            style = {getTdStyle(tableData[rowIndex][cellIndex])}
            onClick = {onClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;