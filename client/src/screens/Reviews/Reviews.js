import { useMutation, useQuery } from "react-query";
import { useForm, Controller } from "react-hook-form";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ToggleButton from "@mui/material/ToggleButton";
import Alert from "@mui/material/Alert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";
import useAuth from "../../hooks/useAuth";
import { postReview, getAllReviews } from "../../api";

const Pricing = () => {
  const { auth } = useAuth();

  const { isLoading, error, isError, data, mutateAsync } = useMutation(
    "postReview",
    postReview
  );

  const reviewsQuery = useQuery("getAllReviews", () =>
    getAllReviews({ token: auth.token })
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ star, review, recommendation }) => {
    console.log({
      star,
      review,
      recommendation,
    });
    await mutateAsync({
      star,
      review,
      recommendation,
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

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={10} style={paperStyle}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid align="center">
            <Avatar style={avatarStyle} sx={{ mt: 5, width: 100, height: 100 }}>
              <ReviewsIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" sx={{ mt: 5 }}>
              View and give reviews
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

          {data && (
            <Box mt={2}>
              <Alert severity="success">Thank you for your review!</Alert>
            </Box>
          )}

          <Grid
            container
            spacing={2}
            mt={3}
            sx={{ height: "100%", justifyContent: "center" }}
          >
            <Grid item xs={6} mt={4}>
              <Box mb={2}>
                <Typography as="h3">Your rating</Typography>
              </Box>
              <Controller
                name="star"
                control={control}
                defaultValue={5}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Rating
                      name="star"
                      value={Number(value)}
                      precision={0.5}
                      onChange={onChange}
                      readOnly={isLoading}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item xs={6} mt={4}>
              <Box mb={2}>
                <Typography as="h3">Recommendation</Typography>
              </Box>

              <Controller
                name="recommendation"
                control={control}
                defaultValue={true}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ToggleButton
                      name="recommendation"
                      value="check"
                      selected={Boolean(value)}
                      onChange={(e) => {
                        e.target.value = !value;
                        onChange(!value);
                      }}
                      disabled={isLoading}
                    >
                      {value ? <ThumbUpIcon /> : <ThumbDownIcon />}
                    </ToggleButton>
                  );
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="review"
                label="Your Review"
                multiline
                rows={4}
                placeholder="I love this flight from Chennai to Delhi"
                variant="filled"
                {...register("review", {
                  required: "Review is required",
                  minLength: {
                    value: 6,
                    message: "Review must be at least 6 characters",
                  },
                  maxLength: {
                    value: 250,
                    message: "Review must be at most 250 characters",
                  },
                })}
                error={!!errors?.review}
                helperText={errors?.review?.message}
                autoFocus
                autoComplete="email"
                disabled={isLoading}
              />
            </Grid>

            <Grid item xs={12}>
              <Box mt={4}>
                <Button
                  loading={Boolean(isLoading)}
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                  fullWidth
                >
                  <Typography variant="h6">Submit Review</Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      {reviewsQuery.data?.reviews.length && (
        <>
          <Box mt={4}>
            <Typography variant="h4">What others say</Typography>
          </Box>
          <Stack>
            <Grid container spacing={2} mt={3}>
              {reviewsQuery.data?.reviews?.map((review) => {
                return (
                  <Grid item xs={12}>
                    <Paper elevation={10} style={paperStyle}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="h6">Rating:</Typography>
                          <Rating
                            name="rating"
                            value={review?.star}
                            readOnly
                            defaultValue={5}
                            precision={0.5}
                          />
                        </Grid>

                        <Grid item xs={6}>
                          <Typography variant="h6">Recommendation:</Typography>
                          {review?.recommendation ? (
                            <ThumbUpIcon />
                          ) : (
                            <ThumbDownIcon />
                          )}
                        </Grid>

                        <Grid item xs={12}>
                          <Typography variant="h6">Review:</Typography>
                          <Typography>{review?.review}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default Pricing;
