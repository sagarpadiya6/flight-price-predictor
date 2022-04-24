import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import useAuth from "../../hooks/useAuth";
import { loginUser } from "../../api";

export default function SignIn({ redirectFromSignUp = false }) {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [showConfirmEmail, setShowConfirmEmail] = useState(
    location.state?.userCreated && location.state?.userEmail
  );

  console.log("location - : ", location, showConfirmEmail);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, error, isError, data, mutateAsync } = useMutation(
    "login",
    loginUser
  );
  const onSubmit = async ({ emailOrUsername, password }) => {
    console.log({ emailOrUsername, password });
    setShowConfirmEmail(false);
    await mutateAsync({ emailOrUsername, password });
  };

  console.log("isLoading - : ", isLoading);
  console.log("error - : ", error);
  console.log("isError - : ", isError);
  console.log("Data - : ", data);

  const theme = useTheme();
  const paperStyle = {
    padding: 20,
    margin: "auto",
  };
  const avatarStyle = {
    backgroundColor: theme.palette.primary.main,
  };

  useEffect(() => {
    if (data?.id) {
      setAuth({
        id: data?.id,
        role: data?.role,
        token: data?.token,
      });
      navigate(from, { replace: true });
    }
  }, [data]);

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
            {showConfirmEmail && (
              <Box mt={2}>
                <Alert severity="success">
                  Please confirm your email sent to{" "}
                  <b>{location.state?.userEmail}</b>
                </Alert>
              </Box>
            )}
            {isError && (
              <Box mt={2}>
                <Alert severity="error">{error.message}</Alert>
              </Box>
            )}
            <Box mt={5}>
              <TextField
                id="username"
                label="Username / Email"
                placeholder="Username / Email"
                variant="outlined"
                fullWidth
                required
                {...register("emailOrUsername", {
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
                error={!!errors?.emailOrUsername}
                helperText={errors?.emailOrUsername?.message}
                autoFocus
                autoComplete="email"
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </Box>
            <Box mt={4}>
              <LoadingButton
                loading={Boolean(isLoading)}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
              >
                <Typography variant="h6">Sign In</Typography>
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
}
