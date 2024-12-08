import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const fetchTodos = async () => await API.get("/todos");
export const createTodo = async (text: string) =>
  await API.post("/todos", { text });
export const toggleTodo = async (id: string) => await API.patch(`/todos/${id}`);
export const deleteTodo = async (id: string) =>
  await API.delete(`/todos/${id}`);
