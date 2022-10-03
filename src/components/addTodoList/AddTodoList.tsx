import React from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {MESSAGE_TODO} from "../../constants/messageType";
import {addItem} from "../todoList/todoSlice";
import { v4 as uuidv4 } from 'uuid';

interface FormTodos {
    nameTodo: string;
    ageTodo: string;
}

const errorMessage = (error: any) => {
    return <div className="error-required">{error}</div>;
};

export const AddTodoList = () => {
    const dispatch = useDispatch();
    const {register, handleSubmit, errors} = useForm<FormTodos>();
    const onSubmit = (data: any, e: any) => {
        e.preventDefault();
        if (data) {
            const newItems = {
                id: uuidv4(),
                name: data.nameTodo,
                age: Number(data.ageTodo),
            };
            dispatch(addItem(newItems));
        }
        e.target.reset();
    };

    return (
        <div className="add-todo">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input">
                    <label className="form-label-thanh">Name member</label>
                    <input
                        type="text"
                        className="form-control-thanh"
                        placeholder="Please enter name members"
                        name="nameTodo"
                        ref={register({
                            required: true,
                            minLength: 3,
                        })}
                    />
                    {errors.nameTodo &&
                        errors.nameTodo?.type === "required" &&
                        errorMessage(MESSAGE_TODO.required)}
                    {errors.nameTodo &&
                        errors.nameTodo?.type === "minLength" &&
                        errorMessage(MESSAGE_TODO.minLength)}
                </div>
                <div className="form-input">
                    <label className="form-label-thanh">Age members</label>
                    <input
                        type="text"
                        className="form-control-thanh"
                        placeholder="Please enter age members"
                        name="ageTodo"
                        ref={register({
                            required: true,
                            maxLength: 3,
                            pattern: {
                                value: /^[1-9][0-9]?$|^100$/i,
                                message: "",
                            },
                        })}
                    />
                    {errors.ageTodo && errors.ageTodo?.type === "required" && errorMessage(MESSAGE_TODO.required)}
                    {errors.ageTodo && errors.ageTodo?.type === "maxLength" && errorMessage(MESSAGE_TODO.maxLength)}
                    {errors.ageTodo && errors.ageTodo?.type === "pattern" && errorMessage(MESSAGE_TODO.pattern)}
                </div>
                <button type="submit" className="btn-small btn-todolist">
                    Add Todo
                </button>
            </form>
        </div>
    );
};
