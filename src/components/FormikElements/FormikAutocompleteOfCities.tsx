import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface IFormikAutocompleteOfCitiesProps {
  label: string;
  changeFieldName: string;
  options: Array<any>;
  changeFieldFunction: (changeFieldName: string, selectedValues: any) => void;
  value: any;
  isLoading?: boolean;
}

export const FormikAutocompleteOfCities = ({
  label,
  changeFieldName,
  options,
  changeFieldFunction,
  value,
  isLoading = false,
}: IFormikAutocompleteOfCitiesProps): JSX.Element => {
  return (
    <Autocomplete
      fullWidth
      value={value}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(_, selectedValues) => {
        // @ts-ignore
        changeFieldFunction(changeFieldName, selectedValues);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
        //@ts-ignore
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
              changeFieldFunction(changeFieldName, null);
            }}
          />
        ))
      }
    />
  );
};
