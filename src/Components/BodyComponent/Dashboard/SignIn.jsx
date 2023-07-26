import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../services/index/user";
import { userActions } from "../../../store/reducers/usersReducer";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import Container from "@material-ui/core/Container";
import { toast } from "react-hot-toast";

export const SignIn = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const history = useHistory();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      console.log(data);
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      toast.success("Message Submitted Successfully...");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      history.push("/");
    }
  }, [history, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <Container maxWidth="xs">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={2} width={400}>
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
