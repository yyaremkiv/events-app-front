import { Box, TextField, Typography } from "@mui/material";

interface IFormikTextFieldProps {
  label: string;
  name: string;
  minRows?: number;
  info?: string | null;
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikTextField = ({
  label,
  name,
  minRows = 1,
  info = null,
  formikFunc: { values, errors, touched, handleBlur, handleChange },
  isLoading = false,
}: IFormikTextFieldProps): JSX.Element => {
  return (
    <Box>
      <TextField
        fullWidth
        multiline
        label={label}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values[name]}
        error={Boolean(touched[name] && errors[name])}
        helperText={touched[name] && errors[name]}
        disabled={isLoading}
        minRows={minRows}
      />
      {info && !Boolean(touched[name] && errors[name]) ? (
        <Typography sx={{ padding: "0.25rem", fontSize: "0.8rem" }}>
          {info}
        </Typography>
      ) : null}
    </Box>
  );
};
