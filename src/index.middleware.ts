import {all} from 'redux-saga/effects';
import todoSaga from "./components/todo.saga";


export default function* appMiddleware() {
    yield all([
        todoSaga(),
    ]);
}
