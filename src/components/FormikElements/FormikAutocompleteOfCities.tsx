import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { ICity } from "../../interfaces";

interface IFormikAutocompleteOfCitiesProps {
  label: string;
  changeFieldName: string;
  options: ICity[] | [];
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikAutocompleteOfCities = ({
  label,
  changeFieldName,
  options,
  formikFunc: { values, errors, touched, setFieldValue },
  isLoading = false,
}: IFormikAutocompleteOfCitiesProps): JSX.Element => {
  return (
    <Autocomplete
      fullWidth
      value={values[changeFieldName]}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(_: any, selectedValues) => {
        setFieldValue(changeFieldName, selectedValues);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={Boolean(touched[changeFieldName] && errors[changeFieldName])}
          helperText={touched[changeFieldName] && errors[changeFieldName]}
        />
      )}
      renderOption={(props: any, option) => (
        <Box
          {...props}
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Typography>{option.label}</Typography>
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            //@ts-ignore
            key={index}
            label={option.label}
            style={{
              color: "white",
              backgroundColor: option.color,
              marginRight: "5px",
            }}
            {...getTagProps({ index })}
            onDelete={() => {
              setFieldValue(changeFieldName, null);
            }}
          />
        ))
      }
    />
  );
};
