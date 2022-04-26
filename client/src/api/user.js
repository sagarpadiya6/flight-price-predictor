export const loginUser =
  (api) =>
  async ({ emailOrUsername, password }) => {
    try {
      const { data } = await api.post(
        "/user/login",
        JSON.stringify({ emailOrUsername, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };

export const signUpUser =
  (api) =>
  async ({ name, username, email, password, repeatPassword }) => {
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
        }
      );
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };

export const logOutUser = (api) => async () => {
  try {
    const { data } = await api.get("/user/logout");
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};

export const resendEmail = (api) => async () => {
  try {
    const { data } = await api.get("/user/resend-email");
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
