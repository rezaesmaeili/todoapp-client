import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/api";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        return state.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const getTodos = createAsyncThunk<Todo[]>("todos/getTodos", async () => {
  const { data } = await api.fetchTodos();
  return data;
});

export const createTodo = createAsyncThunk<Todo, string>(
  "todos/createTodo",
  async (text: string) => {
    const { data } = await api.createTodo(text);
    return data;
  }
);

export const toggleTodo = createAsyncThunk<Todo, string>(
  "todos/toggleTodo",
  async (id: string) => {
    const { data } = await api.toggleTodo(id);
    return data;
  }
);

export const deleteTodo = createAsyncThunk<string, string>(
  "todos/deleteTodo",
  async (id: string) => {
    await api.deleteTodo(id);
    return id;
  }
);

export default todoSlice.reducer;
