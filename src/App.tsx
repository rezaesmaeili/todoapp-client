import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} from "./store/todoSlice";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(createTodo(text));
      setText("");
    }
  };

  return (
     <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            className="border flex-1 p-2 rounded-l-lg"
            type="text"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleAdd}
            className="bg-orange-500 text-white px-4 py-2 rounded-r-lg"
          >
            ADD +
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between mb-2"
            >
              <span
                onClick={() => dispatch(toggleTodo(todo.id))}
                className={`cursor-pointer ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-red-500"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
