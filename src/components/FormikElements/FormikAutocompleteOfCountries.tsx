import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface IFormikAutocompleteOfCountriesProps {
  label: string;
  changeFieldName: string;
  options: Array<any>;
  changeFieldFunction: (changeFieldName: string, selectedValues: any) => void;
  value: any;
  isLoading?: boolean;
}

export const FormikAutocompleteOfCountries = ({
  label,
  changeFieldName,
  options,
  changeFieldFunction,
  value,
  isLoading = false,
}: IFormikAutocompleteOfCountriesProps): JSX.Element => {
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
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
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
