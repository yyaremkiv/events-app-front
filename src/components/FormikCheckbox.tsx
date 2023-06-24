import { Checkbox, FormControlLabel, useTheme } from "@mui/material";

interface IFormikCheckboxProps {
  label: string;
  name: string;
  formikFunc: {
    values: { [key: string]: string | number | boolean };
    setFieldValue: (field: string, value: any) => void;
  };
  isLoading?: boolean;
}

export const FormikCheckbox = ({
  label,
  name,
  formikFunc: { values, setFieldValue },
  isLoading = false,
}: IFormikCheckboxProps): JSX.Element => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={Boolean(values[name])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(name, e.target.checked)
          }
          style={{ color: theme.palette.primary.main }}
        />
      }
      label={label}
      disabled={isLoading}
      sx={{ color: theme.palette.text.primary }}
    />
  );
};
