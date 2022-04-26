export const postReview =
  (api) =>
  async ({ star, review, recommendation }) => {
    try {
      const { data } = await api.post(
        "/review",
        JSON.stringify({ star, review, recommendation })
      );
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };

export const getAllReviews = (api) => async () => {
  try {
    const { data } = await api.get("/review");
    return data;
  } catch (error) {
    throw Error(error.response.data.message);
  }
};
