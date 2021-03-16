import React, { useContext } from 'react';
import { TableContext } from './mineSweeper';
import Td from './td';

const Tr = ({ rowIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            {/* 하나의 행[0]에 열수 확인하여 td에 넣기, 몇번째 줄, 칸인지 td에 넘기기 */}
            {tableData[0] && Array(tableData[0].length).fill().map((td, i) => 
                <Td rowIndex={rowIndex} cellIndex={i} />
            )}
        </tr>
    )
};

export default Tr;