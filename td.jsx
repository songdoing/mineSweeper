import React, {useContext} from 'react';
import { TableContext } from './mineSweeper';

const Td = ( { rowIndex, cellIndex }) => {
    const { tableData} = useContext(TableContext);
    return (
        <td>{tableData[rowIndex][cellIndex]}</td>
    );
};

export default Td;