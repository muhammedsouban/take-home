import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const getHeaderConfig = () => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token || ""}`,
      },
    };
  }

  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export default api;
