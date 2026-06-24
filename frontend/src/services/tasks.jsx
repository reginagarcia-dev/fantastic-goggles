import api from "./api";

export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const addTask = async (title) => {
  const res = await api.post("/tasks", { title });
  return res.data;
};

export const toggleTask = async (id) => {
  const res = await api.patch(`/tasks/${id}`);
  return res.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};
