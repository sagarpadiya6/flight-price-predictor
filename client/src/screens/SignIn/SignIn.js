import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import useAuth from "../../hooks/useAuth";

export default function SignIn({ redirectFromSignUp = false }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
    <Container component="main" maxWidth="sm">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} sx={{ mt: 5, width: 100, height: 100 }}>
            <LockOutlinedIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h3" sx={{ mt: 5 }}>
            Sign In
          </Typography>
        </Grid>
        <Grid sx={{ height: "100%", justifyContent: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mt={5}>
              <TextField
                id="username"
                label="Username / Email"
                placeholder="Username / Email"
                variant="outlined"
                fullWidth
                required
                {...register("username", {
                  required: "Username / Email is required",
                  minLength: {
                    value: 6,
                    message: "Username / Email must be at least 6 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Username / Email must be at most 100 characters",
                  },
                })}
                error={!!errors?.username}
                helperText={errors?.username?.message}
                autoFocus
                autoComplete="email"
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="password"
                label="Password"
                placeholder="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 72,
                    message: "Password must be at most 72 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!#@$]+$/,
                    message:
                      "Password must contain only letters, numbers and any of !,#,@,$ characters",
                  },
                })}
                error={!!errors?.password}
                helperText={errors?.password?.message}
                autoComplete="current-password"
              />
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
              >
                <Typography variant="h6">Sign In</Typography>
              </Button>
            </Box>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
}
