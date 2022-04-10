import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getImages } from "../api/api";
import useStoredState from "../hooks/useStoredState";
import { usePairNumber } from "./PairNumber";
import { shuffle } from "lodash";

const GameProgressContext = createContext();

const GameProgressProvider = ({ children }) => {
    const { pairNumber } = usePairNumber();

    const prevPairNumber = useRef(pairNumber);
    const [catImages, setCatImages] = useStoredState("catImages");
    const [foundIds, setFoundIds] = useStoredState("foundIds", []);
    const [firstFlipped, setFirstFlipped] = useState(null);
    const [secondFlipped, setSecondFlipped] = useState(null);

    const flip = (idx) => {
        if (firstFlipped === null) {
            setFirstFlipped(idx);
        } else if (secondFlipped === null) {
            setSecondFlipped(idx);

            if (catImages[idx].id === catImages[firstFlipped].id) {
                setFoundIds((prevState) => [...prevState, catImages[idx].id]);
                setFirstFlipped(null);
                setSecondFlipped(null);
            } else {
                setTimeout(() => {
                    setFirstFlipped(null);
                    setSecondFlipped(null);
                }, 1500);
            }
        }
    };

    const isFlipped = (idx) => {
        return [firstFlipped, secondFlipped].includes(idx) || foundIds.includes(catImages[idx].id);
    };

    useEffect(() => {
        if (!prevPairNumber.current && pairNumber) {
            setFoundIds([]);
            setCatImages(undefined);
            getImages(pairNumber).then((data) => setCatImages(shuffle([...data, ...data])));
        }
        prevPairNumber.current = pairNumber;
    }, [pairNumber, setCatImages, setFoundIds]);

    const context = { catImages, foundIds, flip, isFlipped };

    return <GameProgressContext.Provider value={context}>{children}</GameProgressContext.Provider>
}

export default GameProgressProvider;

export const useGameProgress = () => useContext(GameProgressContext);