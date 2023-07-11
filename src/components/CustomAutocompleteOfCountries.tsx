import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";

interface ICustomAutocompleteOfCountriesProps {
  label: string;
  value: any;
  options: Array<any>;
  onChangeFunc: any;
  isLoading?: boolean;
}

export const CustomAutocompleteOfCountries = ({
  label,
  value,
  options,
  onChangeFunc,
  isLoading = false,
}: ICustomAutocompleteOfCountriesProps): JSX.Element => {
  return (
    <Autocomplete
      size="small"
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
        value.map((option: any, index: number) => (
          <Chip
            // @ts-ignore
            key={index}
            label={option.label}
            style={{
              color: "white",
              marginRight: "0.4rem",
              borderRadius: "1rem",
              paddingLeft: "0.4rem",
            }}
            {...getTagProps({ index })}
            avatar={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  loading="lazy"
                  width="100%"
                  src={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w80/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
              </Box>
            }
          />
        ))
      }
      sx={{ maxWidth: "450px" }}
    />
  );
};
