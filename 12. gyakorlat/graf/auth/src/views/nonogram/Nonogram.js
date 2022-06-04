import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Nonogram.module.css";

import {
  start,
  CELL_STATE,
  selectTable,
  toggleCell,
} from "../../state/nonogramSlice";

const getClassName = (value, solution) => {
  if (
    (value === CELL_STATE.SELECTED && solution === false) ||
    (value === CELL_STATE.DESELECTED && solution === true)
  ) {
    return styles.red;
  }

  switch (value) {
    case CELL_STATE.SELECTED:
      return styles.black;
    case CELL_STATE.DESELECTED:
      return styles.gray;
    default:
      return styles.white;
  }
};

export const Nonogram = ({ puzzle }) => {
  const dispatch = useDispatch();
  const { upperNumbers, leftNumbers, solution, solutionChecked, table } =
    useSelector(selectTable);

  useEffect(() => {
    if (puzzle) {
      dispatch(start(puzzle));
    }
  }, [dispatch, puzzle]);

  const upperNumbersDOM = (
    <table className={styles.upperNumbers}>
      <tbody>
        <tr>
          {upperNumbers.map((col, colIdx) => (
            <td key={colIdx}>
              {col.map((n, nIdx) => (
                <span key={nIdx}>{n}</span>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  const leftNumbersDOM = (
    <table className={styles.leftNumbers}>
      <tbody>
        {leftNumbers.map((row, rowIdx) => (
          <tr key={rowIdx}>
            <td>
              {row.map((n, nIdx) => (
                <span key={nIdx}>{n}</span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const tableDOM = (
    <table className={styles.table}>
      <tbody>
        {table.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((value, colIdx) => (
              <td
                key={colIdx}
                className={getClassName(
                  value,
                  solutionChecked ? solution[rowIdx][colIdx] : undefined
                )}
                onClick={() => dispatch(toggleCell({ x: colIdx, y: rowIdx }))}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <table className={styles.root}>
      <tbody>
        <tr>
          <td></td>
          <td>{upperNumbersDOM}</td>
        </tr>
        <tr>
          <td>{leftNumbersDOM}</td>
          <td>{tableDOM}</td>
        </tr>
      </tbody>
    </table>
  );
};
