import { api } from "../api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const { data } = await api.get("/user/refresh", {
        withCredentials: true,
      });
      setAuth((prev) => {
        return {
          ...prev,
          token: data.token,
        };
      });
      return data.token;
    } catch (error) {
      console.log("REFRESH ERROR", error);
      // throw Error(error.response.data.message);
    }
  };

  return refresh;
};

export default useRefreshToken;
