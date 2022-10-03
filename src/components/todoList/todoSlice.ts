import {createSlice} from "@reduxjs/toolkit";


export interface TodoState {
    id: string;
    name: string;
    age: number;
}


type initialStateType = {
    todoList: TodoState[];
};

const todoList: TodoState[] = [
    // {
    //     id: uuidv4(),
    //     name: "George Orwell",
    //     age: 24,
    // },
    // {
    //     id: uuidv4(),
    //     name: "J. K. Rowling",
    //     age: 23,
    // },
    // {
    //     id: uuidv4(),
    //     name: "J.R.R Tolkien",
    //     age: 33,
    // },
];

const initialState: initialStateType = {
    todoList,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        getAllPokemon: () => {
            console.log('456')
        },
        getAllPokemonSuccess: (state, action) => {
            state.todoList = action.payload
        },
        getAllPokemonErrors: (state, action) => {
            state.todoList = action.payload
        },
        addItem: (state, action) => {
            state.todoList.push(action.payload);
        },
        removeItem: (state, action) => {
            state.todoList = state.todoList.filter(
                (item: any) => item.id !== action.payload.id
            );
        },
        editItem: (state, action) => {
            state.todoList = state.todoList.map((items: any) =>
                items.id === action.payload.id ? action.payload : items
            );
        },
    },
});

export const {
    addItem,
    removeItem,
    editItem,
    getAllPokemon,
    getAllPokemonSuccess,
    getAllPokemonErrors
} = todoSlice.actions;
export default todoSlice.reducer;
