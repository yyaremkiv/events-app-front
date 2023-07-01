import { Checkbox, FormControlLabel, useTheme } from "@mui/material";

interface IFormikCheckboxProps {
  label: string;
  name: string;
  addNameChange?: string;
  formikFunc: {
    values: { [key: string]: string | number | boolean };
    setFieldValue: (field: string, value: any) => void;
  };
  hideStyle?: boolean;
  isLoading?: boolean;
}

export const FormikCheckbox = ({
  label,
  name,
  addNameChange,
  formikFunc: { values, setFieldValue },
  hideStyle,
  isLoading = false,
}: IFormikCheckboxProps): JSX.Element => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={
        <Checkbox
          name={name}
          checked={Boolean(values[name])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFieldValue(name, e.target.checked);
            if (name === "isHidden") {
              setFieldValue("showOnHomePage", false);
              setFieldValue("showInCityHome", false);
            } else {
              setFieldValue("isHidden", false);
            }
          }}
          style={{ color: hideStyle ? "red" : theme.palette.primary.main }}
        />
      }
      label={label}
      disabled={isLoading}
      sx={{ color: hideStyle ? "red" : theme.palette.text.primary }}
    />
  );
};
