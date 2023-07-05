import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface IFormikAutocompleteProps {
  label: string;
  changeFieldName: string;
  options: Array<any>;
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikAutocomplete = ({
  label,
  changeFieldName,
  options,
  formikFunc: { values, errors, touched, setFieldValue },
  isLoading = false,
}: IFormikAutocompleteProps): JSX.Element => {
  return (
    <Autocomplete
      fullWidth
      multiple
      value={values[changeFieldName]}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label && option.color === value.color
      }
      onChange={(_, selectedValues) => {
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
      renderOption={(props, option) => (
        // @ts-ignore
        <Box
          component="div"
          {...props}
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Box
            sx={{
              width: "2rem",
              height: "1.25rem",
              backgroundColor: option.color,
            }}
          ></Box>
          <Typography>{option.label}</Typography>
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            // @ts-ignore
            key={option.label}
            label={option.label}
            style={{
              color: "white",
              backgroundColor: option.color,
              marginRight: "5px",
            }}
            {...getTagProps({ index })}
          />
        ))
      }
    />
  );
};
