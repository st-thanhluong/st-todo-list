import {combineReducers} from 'redux'
import todoReducer from '../components/todoList/todoSlice'

const rootReducer = combineReducers({
    todos: todoReducer
});
export default rootReducer;
