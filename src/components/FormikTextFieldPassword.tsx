import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

interface IFormikTextFieldPasswordProps {
  label: string;
  name: string;
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikTextFieldPassword = ({
  label,
  name,
  formikFunc: { values, errors, touched, handleBlur, handleChange },
  isLoading = false,
}: IFormikTextFieldPasswordProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormControl variant="outlined">
      <InputLabel
        htmlFor="outlined-adornment-password"
        error={Boolean(touched[name] && errors[name])}
      >
        Password
      </InputLabel>
      <OutlinedInput
        fullWidth
        label={label}
        name={name}
        type={showPassword ? "text" : "password"}
        value={values[name]}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(touched[name] && errors[name])}
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
        error={Boolean(touched[name] && errors[name])}
        sx={{
          visibility: touched[name] && errors[name] ? "visible" : "hidden",
        }}
      >
        {errors[name]}
      </FormHelperText>
    </FormControl>
  );
};
