export const getPricing =
  (api) =>
  async ({ depDateTime, arrDateTime, stops, airline, source, destination }) => {
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
        })
      );
      return data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  };
