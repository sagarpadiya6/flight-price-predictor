import { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Container from "@mui/material/Container";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ReviewsIcon from "@mui/icons-material/Reviews";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Stack from "@mui/material/Stack";

const Pricing = () => {
  const [age, setAge] = useState("");
  const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const [selected, setSelected] = useState(false);

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
            <Rating name="rating" value={4} defaultValue={5} precision={0.5} />
          </Grid>

          <Grid item xs={6} mt={4}>
            <Box mb={2}>
              <Typography as="h3">Recommendation</Typography>
            </Box>
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            >
              {selected ? <ThumbUpIcon /> : <ThumbDownIcon />}
            </ToggleButton>
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
            />
          </Grid>

          <Grid item xs={12}>
            <Box mt={4}>
              <Button
                // isLoading={isLoading}
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
      </Paper>
      <Box mt={4}>
        <Typography variant="h4">What others say</Typography>
      </Box>
      <Stack>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12}>
            <Paper elevation={10} style={paperStyle}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">Rating:</Typography>
                  <Rating
                    name="rating"
                    value={3.5}
                    readOnly
                    defaultValue={5}
                    precision={0.5}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="h6">Recommendation:</Typography>
                  <ThumbUpIcon />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">Review:</Typography>
                  <Typography>The flight was soo good</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default Pricing;
