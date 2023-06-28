import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormConfig } from "../../config/form.login";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { AuthOperations } from "../../redux/auth/auth.operations";
import { RootState, AppDispatch } from "../../redux/store";

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box>
      <Formik
        onSubmit={(values) =>
          dispatch(
            AuthOperations.signin({
              email: values.email.toLocaleLowerCase(),
              password: values.password,
            })
          )
        }
        initialValues={FormConfig.initialValuesLogin}
        validationSchema={FormConfig.loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              disabled={isLoading}
              style={{ height: "60px" }}
            />

            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={Boolean(touched.password && errors.password)}
              >
                Password
              </InputLabel>
              <OutlinedInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                disabled={isLoading}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={Boolean(touched.password && errors.password)}
                sx={{
                  visibility:
                    touched.password && errors.password ? "visible" : "hidden",
                  height: "12px",
                }}
              >
                {errors.password}
              </FormHelperText>
            </FormControl>

            <LoadingButton
              variant="outlined"
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="center"
              type="submit"
              sx={{
                margin: "0 auto 1rem auto",
                padding: "0.25rem 4rem",
                fontSize: "0.9rem",
              }}
            >
              <span>LOGIN</span>
            </LoadingButton>
          </form>
        )}
      </Formik>

      <Box>
        {isErrorAuth && (
          <Typography sx={{ textAlign: "right", color: "red" }}>
            {isErrorAuth}
          </Typography>
        )}
        <Typography mt="1rem">User to test:</Typography>
        <Typography>email: user-test@mail.com</Typography>
        <Typography>password: eiYo9eeMu</Typography>
      </Box>
    </Box>
  );
};
