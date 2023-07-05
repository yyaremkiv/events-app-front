import { Box, FormHelperText } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/de";

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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <DateTimePicker
          label={
            <span
              style={{
                color: touched[name] && errors[name] ? "#f44336" : "inherit",
              }}
            >
              {label}
            </span>
          }
          value={values[name] || null}
          onChange={(date) => setFieldValue(name, date.$d)}
          sx={{
            width: "100%",
            borderColor: touched[name] && errors[name] ? "#f44336" : undefined,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor:
                touched[name] && errors[name] ? "#f44336" : undefined,
            },
            color: "red",
          }}
          disabled={isLoading}
        />
        <FormHelperText
          error={Boolean(touched[name] && errors[name])}
          sx={{
            visibility: touched[name] && errors[name] ? "visible" : "hidden",
            paddingLeft: "1rem",
          }}
        >
          {touched[name] && errors[name]}
        </FormHelperText>
      </LocalizationProvider>
    </Box>
  );
};
