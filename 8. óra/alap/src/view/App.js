import { useGameProgress } from "../state/GameProgress";
import { usePairNumber } from "../state/PairNumber";
import Board from "./Board";
import Card from "./Card";
import Start from "./Start";
import Won from "./Won";

const App = () => {
  const { pairNumber } = usePairNumber();
  const { catImages, foundIds, flip, isFlipped } = useGameProgress();

  if (!pairNumber) {
    return <Start />;
  }

  if (!catImages) {
    return "Betöltés alatt...";
  }

  if (foundIds.length === pairNumber) {
    return <Won />;
  }

  return (
    <Board>
      {catImages.map(({ id, url }, idx) => (
        <Card key={idx} flipped={isFlipped(idx)} onClick={() => flip(idx)} url={url} />
      ))}
    </Board>
  );
};

export default App;
