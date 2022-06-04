import { useDispatch, useSelector } from "react-redux";

import { checkSolution } from "../state/nonogramSlice";
import {
  useLazyGetNonogramQuery,
  useGetNonogramsQuery,
} from "../state/nonogramApiSlice";
import { Nonogram } from "./nonogram/Nonogram";
import Login from "./login/Login";
import { selectCurrentUser } from "../state/authSlice";

function App() {
  const dispatch = useDispatch();
  const { data: puzzles, isLoading } = useGetNonogramsQuery();
  const [getNonogram, nonogramResult] = useLazyGetNonogramQuery();
  const selectedPuzzleid = nonogramResult.originalArgs;

  const user = useSelector(selectCurrentUser)

  const handleChange = (event) => {
    const id = Number(event.target.value);
    getNonogram(id);
  };

  const handleCheck = () => dispatch(checkSolution());

  if (isLoading) {
    return "Betöltés alatt...";
  }

  if (!puzzles) {
    return;
  }

  if (!user) {
    return (
      <Login></Login>
    );
  }

  return (
    <>
      <h1>Grafilogika</h1>
      <label>
        Rejtvény:{" "}
        <select value={selectedPuzzleid ?? ""} onChange={handleChange}>
          <option disabled value="">
            Válassz...
          </option>
          {puzzles.map((puzzle) => (
            <option key={puzzle.id} value={puzzle.id}>
              {puzzle.title}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleCheck}>Ellenőrzés</button>
      {nonogramResult.currentData && (
        <Nonogram puzzle={nonogramResult.currentData} />
      )}
      {!nonogramResult.currentData &&
        nonogramResult.isFetching &&
        "Betöltés alatt..."}
    </>
  );
}

export default App;
