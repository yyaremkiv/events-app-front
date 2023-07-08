import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { ICountry } from "../../interfaces";

interface IFormikAutocompleteOfCountriesProps {
  label: string;
  changeFieldName: string;
  options: ICountry[];
  formikFunc: any;
  setCitiesFunc: any;
  isLoading?: boolean;
}

export const FormikAutocompleteOfCountries = ({
  label,
  changeFieldName,
  options,
  formikFunc: { values, errors, touched, setFieldValue },
  setCitiesFunc,
  isLoading = false,
}: IFormikAutocompleteOfCountriesProps): JSX.Element => {
  return (
    <Autocomplete
      fullWidth
      value={values[changeFieldName]}
      options={options}
      disabled={isLoading}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      onChange={(_: any, selectedValues) => {
        setFieldValue("city", null);

        setCitiesFunc(selectedValues?.cities || []);
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
        value.map((option: ICountry, index: number) => (
          <Chip
            // @ts-ignore
            key={index}
            label={option.label}
            style={{
              color: "white",
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
