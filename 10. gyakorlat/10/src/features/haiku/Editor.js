import { useDispatch, useSelector } from "react-redux";
import styles from "./Editor.module.css";
import { add, changeText, save, selectEditedText, selectSelectedindex } from "./haikuSlice";

export const Editor = () => {
  const { text, isHaiku, vowelsPerRow } = useSelector(selectEditedText);
  const dispatch = useDispatch();
  const index = useSelector(selectSelectedindex)

  return (
    <div>
      <textarea
        value={text}
        onInput={(e) => dispatch(changeText(e.target.value))}
        rows="4"
        cols="40"
        className={isHaiku ? styles.good : styles.wrong}
      ></textarea>
      <p>Vowels per row: {vowelsPerRow.join(",")}</p>
      {isHaiku && <button onClick={() => dispatch(add(text))}>Add</button>}
      {index !== null && isHaiku && <button onClick={() => dispatch(save(text))}>Save</button>}
    </div>
  );
};
