import { useEffect, useState } from "react";


const getSavedValue = (name, defaultState) => {
    const savedValue = localStorage.getItem(name);
    return savedValue ? JSON.parse(savedValue) : defaultState;
}

const useStoredState = (name, defaultState) => {
    const [state, setState] = useState(getSavedValue(name, defaultState));

    useEffect(() => {
        if (state !== undefined) {
            localStorage.setItem(name, JSON.stringify(state));
        }
    }, [name, state]);

    return [state, setState];
};

export default useStoredState;

