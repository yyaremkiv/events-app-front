import { TextField } from "@mui/material";

interface IFormikNumberFieldProps {
  label: string;
  name: string;
  minValue: number;
  maxValue?: number;
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikNumberField = ({
  label,
  name,
  minValue,
  maxValue,
  formikFunc: { values, errors, touched, handleBlur, handleChange },
  isLoading = false,
}: IFormikNumberFieldProps): JSX.Element => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type="number"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[name]}
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      disabled={isLoading}
      inputProps={{
        min: minValue,
        max: maxValue,
      }}
    />
  );
};
