import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, Button, FormHelperText, Slider, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const initialValues = {
  query: "",
  dateStart: dayjs(),
  dateEnd: dayjs(),
  category: [],
};

const searchSchema = Yup.object().shape({
  query: Yup.string(),
  dateStart: Yup.date().required("Date is required"),
  dateEnd: Yup.date().required("Date is required"),
});

const eventCategories = [
  { id: 1, name: "Music" },
  { id: 2, name: "Sports" },
  { id: 3, name: "Art" },
  { id: 4, name: "Food & Drink" },
  { id: 5, name: "Technology" },
  { id: 6, name: "Fashion" },
  { id: 7, name: "Health & Wellness" },
  { id: 8, name: "Business" },
  { id: 9, name: "Science" },
  { id: 10, name: "Education" },
  { id: 11, name: "Theater" },
  { id: 12, name: "Film & Media" },
  { id: 13, name: "Literature" },
  { id: 14, name: "Gaming" },
  { id: 15, name: "Nature & Outdoors" },
];

function valuetext(value) {
  return `${value}°C`;
}

export const FilterEvent = () => {
  const [value, setValue] = React.useState([20, 37]);
  const handleSubmitEvent = (values, { resetForm }) => {
    console.log("values", values);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ border: "1px solid gray" }}>
      <Typography>Filter by value:</Typography>
      <Formik
        onSubmit={handleSubmitEvent}
        initialValues={initialValues}
        validationSchema={searchSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "1rem",
            }}
          >
            <TextField
              label="Search"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.query}
              name="query"
              error={Boolean(touched.query && errors.query)}
              helperText={touched.query && errors.query}
              sx={{ marginBottom: "0.75rem" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Start"
                value={values.dateStart}
                onChange={(date) => setFieldValue("dateStart", date)}
              />
              <FormHelperText
                error={Boolean(touched.dateStart && errors.dateStart)}
              >
                {touched.dateStart && errors.dateStart}
              </FormHelperText>

              <DatePicker
                label="Date End"
                value={values.dateEnd}
                onChange={(date) => setFieldValue("dateEnd", date)}
              />
              <FormHelperText
                error={Boolean(touched.dateEnd && errors.dateEnd)}
              >
                {touched.dateEnd && errors.dateEnd}
              </FormHelperText>
            </LocalizationProvider>

            <Autocomplete
              multiple
              id="size-small-outlined-multi"
              options={eventCategories}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Set category"
                  placeholder="Add more"
                />
              )}
              onChange={(_, selectedValues) => {
                setFieldValue("category", selectedValues);
              }}
            />

            <Typography>Seats:</Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Start"
                id="outlined-size-small"
                defaultValue="minPrice"
                size="small"
              />
              <TextField
                label="End"
                id="outlined-size-small"
                defaultValue="max-price"
                size="small"
              />
            </Box>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />

            <Typography>Price:</Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Start"
                id="outlined-size-small"
                defaultValue="minPrice"
                size="small"
              />
              <TextField
                label="End"
                id="outlined-size-small"
                defaultValue="max-price"
                size="small"
              />
            </Box>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />

            <Button type="submit" variant="outlined">
              Send
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};
