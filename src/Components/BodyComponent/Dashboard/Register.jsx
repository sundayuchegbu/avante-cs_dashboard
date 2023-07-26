import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../services/index/user";
import { userActions } from "../../../store/reducers/usersReducer";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success("User registered successfully");
      dispatch(userActions.setUserInfo(data));
      history.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      Redirect("/");
    }
  }, [userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch("password");

  return (
    <Container maxWidth="xs">
      <h1>Register New User</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2} width={400}>
          <TextField
            type="text"
            id="name"
            label="Name"
            {...register("name", {
              minLength: {
                value: 1,
                message: "Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            error={!!errors?.name}
            helperText={errors?.name ? errors.name.message : null}
          />

          <TextField
            label="Email"
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
          <TextField
            label="Password"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password length must be at least 6 characters",
              },
            })}
            error={!!errors?.password}
            helperText={errors?.password ? errors.password.message : null}
          />
          <TextField
            type="password"
            id="confirmPassword"
            label="Password"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
              validate: (value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
              },
            })}
            error={!!errors?.confirmPassword}
            helperText={
              errors?.confirmPassword ? errors.confirmPassword.message : null
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isValid || isLoading}
          >
            Login
          </Button>
        </Stack>
      </form>
    </Container>
  );
};
