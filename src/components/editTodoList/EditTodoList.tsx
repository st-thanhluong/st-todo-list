import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {MESSAGE_TODO} from "../../constants/messageType";
import {editItem} from "../todoList/todoSlice";

interface formTodos {
    name: string;
    age: number;
}

const errorMessage = (error: any) => {
    return <div className="error-required">{error}</div>;
};

export const EditTodoList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams<any>();
    const dataStore = useSelector((state: any) => state.todos.todoList)
    const {register, handleSubmit, errors, setValue} = useForm<formTodos>();

    const goBack = () => {
        history.push("/");
    };

    useEffect(() => {
        if (id && dataStore) {
            dataStore.forEach((item: any) => {
                if (id === item.id) {
                    setValue("name", item.name);
                    setValue("age", item.age);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dataStore]);

    // handle edit todo
    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        const newItem = {
            id: id,
            name: data.name,
            age: data.age
        }
        dispatch(editItem(newItem));
        goBack();
    };

    return (
        <div className="edit-todo">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-input">
                    <label className="form-label-thanh">Name member</label>
                    <input
                        type="text"
                        className="form-control-thanh"
                        placeholder="Please enter name members"
                        name="name"
                        ref={register({
                            required: true,
                            minLength: 3,
                        })}
                    />
                    {errors.name && errors.name?.type === "required" && errorMessage(MESSAGE_TODO.required)}
                    {errors.name && errors.name?.type === "minLength" && errorMessage(MESSAGE_TODO.minLength)}
                </div>

                <div className="form-input">
                    <label className="form-label-thanh">Age members</label>
                    <input
                        type="text"
                        className="form-control-thanh"
                        placeholder="Please enter age members"
                        name="age"
                        ref={register({
                            required: true,
                            maxLength: 3,
                            pattern: {
                                value: /^[1-9][0-9]?$|^100$/i,
                                message: "",
                            },
                        })}
                    />
                    {errors.age && errors.age?.type === "required" && errorMessage(MESSAGE_TODO.required)}
                    {errors.age && errors.age?.type === "maxLength" && errorMessage(MESSAGE_TODO.maxLength)}
                    {errors.age && errors.age?.type === "pattern" && errorMessage(MESSAGE_TODO.pattern)}
                </div>
                <button type="submit" className="btn-small btn-todolist">
                    Edit Todo
                </button>
            </form>
        </div>
    );
};
