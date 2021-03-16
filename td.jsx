import React, {useContext, useCallback} from 'react';
import { CODE, OPEN_CELL, TableContext } from './mineSweeper';

const getTdStyle = (code) => {
    switch (code) {
        case CODE.NORMAL :
        case CODE.MINE :
            return {
                background : 'dodgerblue',
            };
        case CODE.OPENED :
            return {
                background : 'skyblue',
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
        default :
            return '';    
    }
};

const Td = ( { rowIndex, cellIndex }) => {
    const { tableData, dispatch} = useContext(TableContext);

    const onClickTd = useCallback(() => {
        
        // td를 클릭하면, dispatch에 클릭한 정보가 들어가고, MineSweeper에서 정보변경
        dispatch({ type : OPEN_CELL, row:rowIndex, cell: cellIndex });
    }, []);

    return (
        <td
            style = {getTdStyle(tableData[rowIndex][cellIndex])}
            onClick = {onClickTd}
        >{getTdText(tableData[rowIndex][cellIndex])}</td>
    );
};

export default Td;