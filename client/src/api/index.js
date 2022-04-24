import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4005/api/v1",
});

export const loginUser = async ({ emailOrUsername, password }) => {
  try {
    const { data } = await api.post(
      "/user/login",
      JSON.stringify({ emailOrUsername, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log("API ERROR: ", error.response.data.message);
    throw Error(error.response.data.message);
  }
};

export const signUpUser = async ({
  name,
  username,
  email,
  password,
  repeatPassword,
}) => {
  try {
    const { data } = await api.post(
      "/user/register",
      JSON.stringify({
        name,
        username,
        email,
        password,
        repeatPassword,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.message);
  }
};
