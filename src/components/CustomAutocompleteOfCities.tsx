import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface ICustomAutocompleteOfCitiesProps {
  label: string;
  value: any;
  options: Array<any>;
  onChangeFunc: (field: any) => void;
  isLoading?: boolean;
}

export const CustomAutocompleteOfCities = ({
  label,
  value,
  options,
  onChangeFunc,
  isLoading = false,
}: ICustomAutocompleteOfCitiesProps): JSX.Element => {
  return (
    <Autocomplete
      fullWidth
      multiple
      value={value}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) =>
        option.label === value.label && option.color === value.color
      }
      onChange={(_, selectedValues) => {
        onChangeFunc(selectedValues);
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
      renderOption={(props, option) => (
        // @ts-ignore
        <Box
          component="div"
          {...props}
          sx={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <Typography>{option.label}</Typography>
        </Box>
      )}
      renderTags={(value, getTagProps) =>
        value.map((option: any, index: number) => (
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
