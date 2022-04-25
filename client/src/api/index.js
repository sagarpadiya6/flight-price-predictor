import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4005/api/v1",
  withCredentials: true,
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

export const logOutUser = async (token) => {
  try {
    const { data } = await api.get("/user/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.message);
  }
};

export const getPricing = async ({
  depDateTime,
  arrDateTime,
  stops,
  airline,
  source,
  destination,
  token,
}) => {
  try {
    const { data } = await api.post(
      "/price",
      JSON.stringify({
        depDateTime,
        arrDateTime,
        stops,
        airline,
        source,
        destination,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const postReview = async ({ star, review, recommendation, token }) => {
  try {
    const { data } = await api.post(
      "/review",
      JSON.stringify({ star, review, recommendation }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

export const getAllReviews = async ({ token }) => {
  try {
    const { data } = await api.get("/review", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw Error(error.response.data.message);
  }
};
