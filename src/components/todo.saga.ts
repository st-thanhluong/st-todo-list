import {call, put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {getAllPokemon, getAllPokemonErrors, getAllPokemonSuccess} from "./todoList/todoSlice";

export async function requestGetUserInfo() {
    return await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
}

export function* getListPokemon() {
    try {
        const res = yield call(requestGetUserInfo);
        console.log(res)
        const todoList = res.data.results
        yield put(getAllPokemonSuccess({todoList}));
    } catch (e) {
        yield put(getAllPokemonErrors({}));
    }
}

export default function* todoSaga() {
    yield takeLatest(getAllPokemon.type, getListPokemon);
}
