import { useRef } from "react";
import { usePairNumber } from "../state/PairNumber";

import styles from "./Start.module.css";

const Start = () => {
  const { setPairNumber } = usePairNumber();
  const selectRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setPairNumber(Number(selectRef.current.value));
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <label>Kártyapárok száma:</label>
      <select ref={selectRef}>
        <option>4</option>
        <option>6</option>
        <option>8</option>
      </select>
      <button type="submit">Kezdés</button>
    </form>
  );
};

export default Start;
