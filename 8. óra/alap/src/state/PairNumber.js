import { createContext, useContext } from "react";
import useStoredState from "../hooks/useStoredState";


const PairNumberContext = createContext();

const PairNumberProvider = ({ children }) => {
    const [pairNumber, setPairNumber] = useStoredState("pairNumber", null);
    const reset = () => setPairNumber(null);

    const context = { pairNumber, setPairNumber, reset };

    return <PairNumberContext.Provider value={context}>{children}</PairNumberContext.Provider>;
};

export default PairNumberProvider;

export const usePairNumber = () => useContext(PairNumberContext);