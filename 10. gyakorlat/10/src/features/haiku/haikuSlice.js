import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    editor: "",
    selectedIndex: null,
    haikus: [
      `Téged vártalak
Mint hajnali fényt éjjel
Félve-remélve`,
    ],
};

export const haikuSlice = createSlice({
    name: "haiku",
    initialState,
    reducers: {
        changeText: (state, { payload: text }) => {
            state.editor = text;
        },
        add: (state, { payload: newHaiku }) => {
            state.haikus.push(newHaiku);
        },
        select: (state, { payload: index }) => {
            state.selectedIndex = index;
            state.editor = state.haikus[index];
        },
        save: (state, { payload: text }) => {
            if (state.selectedIndex !== null) {
                state.haikus[state.selectedIndex] = text;
            }
        },
        remove: (state) => {
            if (state.selectedIndex !== null) {
                state.haikus.splice(state.selectedIndex, 1);
            }
        }
    }
});

export const { changeText, select, add, save, remove } = haikuSlice.actions;
export const haikuReducer = haikuSlice.reducer;

function numberOfVowels(row) {
    const vowels = "aáeéiíoóöőuúüű";
    return row.split("").filter((c) => vowels.includes(c)).length;
}

export const selectEditedText = (state) => {
    const text = state.editor;
    const rows = text.split("\n");
    const vowelsPerRow = rows.map(numberOfVowels);
    const isHaiku =
        vowelsPerRow.length === 3 &&
        vowelsPerRow[0] === 5 &&
        vowelsPerRow[1] === 7 &&
        vowelsPerRow[2] === 5;
    return { text, isHaiku, vowelsPerRow };
};

export const selectHaikus = (state) => state.haikus;
export const selectSelectedindex = (state) => state.selectedIndex;
