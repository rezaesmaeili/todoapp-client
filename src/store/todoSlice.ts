import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now().toString(), text: action.payload, completed: false });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
