import React, { useState, useCallback, memo, useContext } from 'react';
import {START_GAME, TableContext} from './mineSweeper';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);  
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);    
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch( { type:  START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder="how many row" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="how many cell" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="how many mine" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>START</button>
    </div>
  );
});

export default Form;