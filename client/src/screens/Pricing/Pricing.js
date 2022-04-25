import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import useAuth from "../../hooks/useAuth";
import ReactHookFormSelect from "../../components/ReactHookFormSelect";
import { getPricing } from "../../api";

const Pricing = () => {
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { isLoading, error, isError, data, mutateAsync } = useMutation(
    "getPricing",
    getPricing
  );

  const onSubmit = async ({
    depDateTime,
    arrDateTime,
    stops,
    airline,
    source,
    destination,
  }) => {
    await mutateAsync({
      depDateTime,
      arrDateTime,
      stops,
      airline,
      source,
      destination,
      token: auth.token,
    });
  };

  const theme = useTheme();
  const paperStyle = {
    padding: 20,
    margin: "auto",
  };
  const avatarStyle = {
    backgroundColor: theme.palette.primary.main,
  };

  useEffect(() => {
    console.log("Price - : ", data);
  }, [data]);

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid align="center">
              <Avatar
                style={avatarStyle}
                sx={{ mt: 5, width: 100, height: 100 }}
              >
                <LocalOfferIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h3" sx={{ mt: 5 }}>
                Check Flight Price
              </Typography>
            </Grid>
            <Grid mt={2}>
              <hr />
            </Grid>

            {isError && (
              <Box mt={2}>
                <Alert severity="error">{error.message}</Alert>
              </Box>
            )}
            <Grid
              container
              spacing={2}
              mt={3}
              sx={{ height: "100%", justifyContent: "center" }}
            >
              <Grid item xs={6}>
                <Box mb={2}>
                  <Typography as="h3">Departure date</Typography>
                </Box>

                <Controller
                  name="depDateTime"
                  control={control}
                  defaultValue="2022-07-12T19:30"
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid },
                  }) => (
                    <DateTimePicker
                      fullWidth
                      label="Departure Date"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          id="depDateTime"
                          required
                          error={!!errors?.depDateTime}
                          helperText={errors?.depDateTime?.message}
                          autoComplete="off"
                          fullWidth
                          {...params}
                          {...register("depDateTime", {
                            required: "Departure Date Time is required",
                          })}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Box mb={2}>
                  <Typography as="h3">Arrival date</Typography>
                </Box>

                <Controller
                  name="arrDateTime"
                  control={control}
                  defaultValue="2022-07-12T20:30"
                  render={({
                    field: { onChange, value },
                    fieldState: { error, invalid },
                  }) => (
                    <DateTimePicker
                      fullWidth
                      label="Arrival Date"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          id="arrDateTime"
                          required
                          error={!!errors?.arrDateTime}
                          helperText={errors?.arrDateTime?.message}
                          autoComplete="off"
                          fullWidth
                          {...params}
                          {...register("arrDateTime", {
                            required: "Arrival Date Time is required",
                          })}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6} mt={4}>
                <Box mb={2}>
                  <Typography as="h3">Choose your source of travel</Typography>
                </Box>
                <ReactHookFormSelect
                  id="source"
                  name="source"
                  label="Source"
                  defaultValue="Chennai"
                  variant="outlined"
                  control={control}
                  required
                  fullWidth
                >
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="Kolkata">Kolkata</MenuItem>
                  <MenuItem value="Mumbai">Mumbai</MenuItem>
                  <MenuItem value="Chennai">Chennai</MenuItem>
                </ReactHookFormSelect>
              </Grid>

              <Grid item xs={6} mt={4}>
                <Box mb={2}>
                  <Typography as="h3">Choose your destination</Typography>
                </Box>
                <ReactHookFormSelect
                  id="destination"
                  name="destination"
                  label="Destination"
                  defaultValue="Delhi"
                  variant="outlined"
                  control={control}
                  required
                  fullWidth
                >
                  <MenuItem value="Cochin">Cochin</MenuItem>
                  <MenuItem value="Delhi">Delhi</MenuItem>
                  <MenuItem value="New Delhi">New Delhi</MenuItem>
                  <MenuItem value="Hyderabad">Hyderabad</MenuItem>
                  <MenuItem value="Kolkata">Kolkata</MenuItem>
                </ReactHookFormSelect>
              </Grid>

              <Grid item xs={6} mt={4}>
                <Box mb={2}>
                  <Typography as="h3">Number of Stopages</Typography>
                </Box>
                <ReactHookFormSelect
                  id="stops"
                  name="stops"
                  label="Stopage"
                  defaultValue={0}
                  variant="outlined"
                  control={control}
                  required
                  fullWidth
                >
                  <MenuItem value={0}>Non-Stop</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </ReactHookFormSelect>
              </Grid>

              <Grid item xs={6} mt={4}>
                <Box mb={2}>
                  <Typography as="h3">Choose Airline</Typography>
                </Box>
                <ReactHookFormSelect
                  id="airline"
                  name="airline"
                  label="Airline"
                  defaultValue="IndiGo"
                  variant="outlined"
                  control={control}
                  required
                  fullWidth
                >
                  <MenuItem value="Jet Airways">Jet Airways</MenuItem>
                  <MenuItem value="IndiGo">IndiGo</MenuItem>
                  <MenuItem value="Air India">Air India</MenuItem>
                  <MenuItem value="Multiple carriers">
                    Multiple carriers
                  </MenuItem>
                  <MenuItem value="SpiceJet">SpiceJet</MenuItem>
                  <MenuItem value="Vistara">Vistara</MenuItem>
                  <MenuItem value="GoAir">GoAir</MenuItem>
                  <MenuItem value="Multiple carriers Premium economy">
                    Multiple carriers Premium economy
                  </MenuItem>
                  <MenuItem value="Jet Airways Business">
                    Jet Airways Business
                  </MenuItem>
                  <MenuItem value="Vistara Premium economy">
                    Vistara Premium economy
                  </MenuItem>
                  <MenuItem value="Trujet">Trujet</MenuItem>
                </ReactHookFormSelect>
              </Grid>
              <Grid item xs={12}>
                <Box mt={4}>
                  <LoadingButton
                    isLoading={Boolean(isLoading)}
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                  >
                    <Typography variant="h6">Price Check</Typography>
                  </LoadingButton>
                </Box>
              </Grid>
              {data?.price && (
                <Grid item xs={12}>
                  <Box mt={2} align="center">
                    <Typography variant="h4">
                      {" "}
                      Estimated Fare is: {data?.price}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </LocalizationProvider>
        </form>
      </Paper>
    </Container>
  );
};

export default Pricing;
