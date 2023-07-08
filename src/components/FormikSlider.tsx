import { Box, TextField, Slider } from "@mui/material";
import React from "react";

interface IFormikSliderProps {
  label: [string, string];
  name: [string, string];
  value: [number, number];
  formikFunc: any;
  isLoading?: boolean;
}

export const FormikSlider = ({
  label,
  name,
  value,
  formikFunc: {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  },
  isLoading = false,
}: IFormikSliderProps): JSX.Element => {
  const firstValue = parseInt(values[name[0]]);
  const secondValue = parseInt(values[name[1]]);

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "1rem", marginBottom: "0.45rem" }}>
        <TextField
          fullWidth
          type="number"
          size="small"
          label={label[0]}
          name={name[0]}
          value={Number(values[name[0]])}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(touched[name[0]] && errors[name[0]])}
          helperText={touched[name[0]] && errors[name[0]]}
          disabled={isLoading}
        />
        <TextField
          fullWidth
          type="number"
          size="small"
          label={label[1]}
          name={name[1]}
          value={Number(values[name[1]])}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(touched[name[1]] && errors[name[1]])}
          helperText={touched[name[1]] && errors[name[1]]}
          disabled={isLoading}
        />
      </Box>
      <Slider
        valueLabelDisplay="auto"
        getAriaLabel={() => "Value"}
        value={[firstValue, secondValue]}
        min={0}
        max={Number(value[1])}
        step={(value[1] - value[0]) / 100}
        disabled={isLoading}
        onChange={(_, newValue: any) => {
          setFieldValue(name[0], parseInt(newValue[0]));
          setFieldValue(name[1], parseInt(newValue[1]));
        }}
      />
    </Box>
  );
};
