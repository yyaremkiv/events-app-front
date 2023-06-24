import { Box, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface IFormikDateProps {
  label: string;
  name: string;
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikDate = ({
  label,
  name,
  formikFunc: { values, errors, touched, setFieldValue },
  isLoading = false,
}: IFormikDateProps): JSX.Element => {
  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label={label}
          value={values[name] || null}
          onChange={(date) => setFieldValue(name, date)}
          sx={{ width: "100%" }}
          disabled={isLoading}
        />
        <FormHelperText
          error={Boolean(touched.date && errors.date)}
          sx={{
            visibility: touched.date && errors.date ? "visible" : "hidden",
          }}
        >
          {touched.date && errors.date}
        </FormHelperText>
      </LocalizationProvider>
    </Box>
  );
};
