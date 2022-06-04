const initialState = {
    solution: [],
    table: [],
};

export const CELL_STATE = {
    EMPTY: 0,
    SELECTED: 1,
    DESELECTED: 2,
};

const reducer = (state = initialState, action) => {
    if (action.type === "START") {
        const newSolution = action.payload.map((line) =>
            line.split("").map((c) => c === "#")
        );

        return {
            solution: newSolution,
            table: newSolution.map((row) => row.map(() => CELL_STATE.EMPTY))
        };
    }

    if (action.type === "TOGGLE_CELL") {
        return {
            ...state,
            table: state.table.map((row, rowIndex) => {
                if (rowIndex !== action.payload.y) return row;
                return row.map((cell, colIndex) => {
                    if (colIndex !== action.payload.x) return cell;
                    return (cell + 1) % 3;
                })
            })
        };
    }

    return state;
};

export default reducer;

export const selectTable = (state) => {
    const { solution, table } = state;
    const leftNumbers = solution.map((row) => 
        row
            .map((b) => (b ? "#" : " "))
            .join("")
            .trim()
            .split(" ")
            .map((s) => s.length)
    )
    const upperNumbers = solution[0]
        ? solution[0].map((_, i) => 
            solution
                .map((row) => (row[i] ? "#" : " "))
                .join("")
                .trim()
                .split(" ")
                .map((s) => s.length)
        )
        : [];
    return {
        leftNumbers,
        upperNumbers,
        table,
    };
};
