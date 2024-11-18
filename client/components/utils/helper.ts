export const getLoginResponseObject = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
