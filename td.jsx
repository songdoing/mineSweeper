import React, {useContext, useCallback} from 'react';
import { CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from './mineSweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
        case CODE.MINE :
            return {
                background : 'dodgerblue',
            };
        case CODE.CLICKED_MINE :
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
                background : 'orange',
            };
        default : 
            return {
                background : 'skyblue',
            };
    }
};

const getTdText = (code) => {
    switch (code) {
        case CODE.NORMAL :
            return  '';
        case CODE.MINE :
            return '💣';
        case CODE.CLICKED_MINE : 
            return '💥';
        case CODE.FLAG_MINE :
        case CODE.FLAG :
            return '🚩';
        case CODE.QUESTION_MINE :
        case CODE.QUESTION :
            return '❓';
        default :
            return code;    
    }
};

const Td = ( { rowIndex, cellIndex }) => {
    const { tableData, dispatch , halted} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        // td를 클릭하면, dispatch에 클릭한 정보가 들어가고, MineSweeper에서 정보변경
        if (halted) {
            return;
        } //게임이 멈췄으면 아무일도
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
        
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault(); //우클릭해도 메뉴 안 뜨도록
        if (halted) {
            return;
        } //게임이 멈췄으면 아무일도
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL :
            case CODE.MINE :
                dispatch( { type : FLAG_CELL, row: rowIndex, cell : cellIndex});
                return;
            case CODE.FLAG_MINE :
            case CODE.FLAG :
                dispatch( { type : QUESTION_CELL, row: rowIndex, cell : cellIndex});
                return;
            case CODE.QUESTION_MINE :
            case CODE.QUESTION :
                dispatch( { type : NORMALIZE_CELL, row: rowIndex, cell : cellIndex});
                return;
            default :
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    return (
        <td
            style = {getTdStyle(tableData[rowIndex][cellIndex])}
            onClick = {onClickTd}
            onContextMenu = {onRightClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;