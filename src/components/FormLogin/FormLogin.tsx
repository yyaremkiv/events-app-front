import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { FormValidation } from "../../config";
import { AuthOperations } from "../../redux/auth/auth.operations";
import { RootState, AppDispatch } from "../../redux/store";
import {
  FormikTextField,
  FormikTextFieldPassword,
  CustomLoadingButton,
} from "../";
import { Box, Typography } from "@mui/material";

export const FormLogin = (): JSX.Element => {
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const isErrorAuth = useSelector((state: RootState) => state.auth.error);
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Formik
        onSubmit={(values) =>
          dispatch(
            AuthOperations.signin({
              email: values.email.toLocaleLowerCase(),
              password: values.password,
            })
          )
        }
        initialValues={FormValidation.initialValuesLogin}
        validationSchema={FormValidation.loginSchema}
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
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "100%",
            }}
          >
            <FormikTextField
              label="Email"
              name="email"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikTextFieldPassword
              label="Password"
              name="password"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "1rem",
              }}
            >
              <CustomLoadingButton text="Login" />
            </Box>
          </form>
        )}
      </Formik>

      <Box sx={{ width: "100%" }}>
        {isErrorAuth && (
          <Typography color="error" sx={{ textAlign: "right" }}>
            {isErrorAuth}
          </Typography>
        )}
        <Typography>User to test:</Typography>
        <Typography>
          email: <span style={{ fontWeight: "bold" }}>user-test@mail.com</span>
        </Typography>
        <Typography>
          password: <span style={{ fontWeight: "bold" }}>eiYo9eeMu</span>
        </Typography>
      </Box>
    </>
  );
};
