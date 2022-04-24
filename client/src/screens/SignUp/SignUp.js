import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useTheme } from "@mui/material/styles";

import { signUpUser } from "../../api";

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, error, isError, data, mutateAsync } = useMutation(
    "signup",
    signUpUser
  );
  const onSubmit = async ({
    name,
    username,
    email,
    password,
    repeatPassword,
  }) => {
    console.log({
      name,
      username,
      email,
      password,
      repeatPassword,
    });
    setUserEmail(email);
    await mutateAsync({ name, username, email, password, repeatPassword });
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
      navigate("/login", { state: { from, userCreated: true, userEmail } });
    }
  }, [data]);

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} sx={{ mt: 5, width: 100, height: 100 }}>
            <LockOpenOutlinedIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h3" sx={{ mt: 5 }}>
            Sign Up
          </Typography>
        </Grid>
        <Grid sx={{ height: "100%", justifyContent: "center" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isError && <Alert severity="error">{error}</Alert>}
            <Box mt={5}>
              <TextField
                id="name"
                label="Name"
                placeholder="Name"
                variant="outlined"
                fullWidth
                required
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 36,
                    message: "Name must be at most 36 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]+$/,
                    message: "Name must contain only letters and spaces",
                  },
                })}
                error={!!errors?.name}
                helperText={errors?.name?.message}
                autoFocus
                autoComplete="off"
                disabled={isLoading}
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="username"
                label="Username"
                placeholder="Username"
                variant="outlined"
                fullWidth
                required
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                  maxLength: {
                    value: 36,
                    message: "Username must be at most 36 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                    message: "Username must be alphanumeric",
                  },
                })}
                error={!!errors?.username}
                helperText={errors?.username?.message}
                autoFocus
                autoComplete="username"
                disabled={isLoading}
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="email"
                label="Email"
                placeholder="Email"
                variant="outlined"
                type="email"
                fullWidth
                required
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Email must be at least 8 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Email must be at most 100 characters",
                  },
                })}
                error={!!errors?.email}
                helperText={errors?.email?.message}
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
                autoComplete="new-password"
                disabled={isLoading}
              />
            </Box>
            <Box mt={2}>
              <TextField
                id="repeatPassword"
                label="Repeat Password"
                placeholder="Repeat Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                {...register("repeatPassword", {
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
                error={!!errors?.repeatPassword}
                helperText={errors?.repeatPassword?.message}
                autoComplete="new-password"
                disabled={isLoading}
              />
            </Box>
            <Box mt={4}>
              <Button
                isLoading={isLoading}
                type="submit"
                variant="contained"
                size="large"
                color="primary"
                fullWidth
              >
                <Typography variant="h6">Sign Up</Typography>
              </Button>
            </Box>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
}
