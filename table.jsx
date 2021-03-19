import React, { useContext, memo } from 'react';
import { TableContext } from './mineSweeper';
import Tr from './tr';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table> 
            {/* 행수열수 확인해서 행수 만들어주기 , tr에다가 몇번째 줄인지 넘기기*/}
            {Array(tableData.length).fill().map((tr,i) => <Tr rowIndex = {i} />)}
        </table>
    )

});

export default Table;