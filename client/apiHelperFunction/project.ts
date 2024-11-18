import api, { getHeaderConfig } from "@/app/utils/axios-config";

export const findProject = async (id: any) => {
  try {
    const response = await api.get(`/projects/${id}`, getHeaderConfig());
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const handleAddTodo = async (formData: any, projectId: any) => {
  const data = { ...formData, projectId, completed: false };
  try {
    const response = await api.post("/todos/create", data, getHeaderConfig());
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const handleUpdateTodo = async (formData: any, todoId: any) => {
  const data = { ...formData };
  try {
    const response = await api.put(`/todos/${todoId}`, data, getHeaderConfig());
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
export const handleDeleteTodo = async (todoId: any) => {
  try {
    const response = await api.delete(`/todos/${todoId}`, getHeaderConfig());
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const handleLogin = async (formData: any) => {
  try {
    const response = await api.post("/users/login", formData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const handleSignup = async (formData: any) => {
  try {
    const response = await api.post("/users", formData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const handleDeleteProject = async (projectId: any) => {
  try {
    const response = await api.delete(
      `/projects/${projectId}`,
      getHeaderConfig()
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const handleDownload = async (data: any) => {
  try {
    const response = await api.post(
      "/projects/downloadMarkdown",
      data,
      getHeaderConfig()
    );
    const blob = new Blob([response.data], {
      type: "application/octet-stream",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data?.title}.md`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    return response;
  } catch (error: any) {
    throw error.response.data;
  }
};
