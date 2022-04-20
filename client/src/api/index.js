import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4005/api/v1",
});

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post("/user/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signUpUser = async ({
  name,
  email,
  username,
  password,
  repeatPassword,
}) => {
  try {
    const { data } = await api.post("/user/signup", {
      name,
      email,
      username,
      password,
      repeatPassword,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
