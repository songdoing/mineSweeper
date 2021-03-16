import React, { useContext } from 'react';
import { TableContext } from './mineSweeper';
import Tr from './tr';

const Table = () => {
    const { tableData } = useContext(TableContext);
    return (
        <table> 
            {/* 행수열수 확인해서 행수 만들어주기 */}
            {Array(tableData.length).fill().map((tr,i) => <Tr />)}
        </table>
    )

};

export default Table;