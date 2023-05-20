import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Slider,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EventService from "@/services/event.service";

const searchSchema = Yup.object().shape({
  query: Yup.string(),
  dateStart: Yup.date().required("Date is required"),
  dateEnd: Yup.date().required("Date is required"),
  priceStart: Yup.number(),
  priceEnd: Yup.number(),
  seatsStart: Yup.number(),
  seatsEnd: Yup.number(),
});

export const FilterEvent = ({
  data: {
    dateStart,
    dateEnd,
    categories,
    seatsMin,
    seatsMax,
    priceMin,
    priceMax,
  },
  cityName,
  page,
  limit,
}) => {
  const initialValues = {
    query: "",
    dateStart: dayjs(dateStart),
    dateEnd: dayjs(dateEnd),
    categories,
    seatsMin,
    seatsMax,
    priceMin,
    priceMax,
    hasFreePlaces: false,
  };

  const handleSubmitEvent = (
    {
      query,
      dateStart,
      dateEnd,
      categories,
      seatsMin,
      seatsMax,
      priceMin,
      priceMax,
      hasFreePlaces,
    },
    { resetForm }
  ) => {
    const queryObject = {
      page,
      limit,
      searchQuery: query,
      dateStart: dateStart.$d,
      dataEnd: dateEnd.$d,
      categories: categories.length ? categories : initialValues.categories,
      seatsMin,
      seatsMax,
      priceMin,
      priceMax,
      hasFreePlaces,
    };
    EventService.getEvent({ cityName, params: queryObject });
  };

  return (
    <Box>
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
              options={categories}
              getOptionLabel={(option) => option}
              disabled={values.categories.length > 0 ? false : true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Set category"
                  placeholder="Add more"
                />
              )}
              onChange={(_, selectedValues) => {
                setFieldValue("categories", selectedValues);
              }}
            />

            <Typography>Seats:</Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Seats min"
                size="small"
                name="seatsMin"
                value={values.seatsMin}
                error={Boolean(touched.seatsMin && errors.seatsMin)}
                helperText={touched.seatsMin && errors.seatsMin}
                onChange={(e) => {
                  setFieldValue("seatsMin", e.target.value);
                }}
              />
              <TextField
                label="Seats end"
                size="small"
                name="seatsMax"
                value={values.seatsMax}
                error={Boolean(touched.seatsMax && errors.seatsMax)}
                helperText={touched.seatsMax && errors.seatsMax}
                onChange={(e) => {
                  setFieldValue("seatsMax", e.target.value);
                }}
              />
            </Box>
            <Slider
              getAriaLabel={() => "Диапазон мест"}
              value={[values.seatsMin, values.seatsMax]}
              min={seatsMin}
              max={seatsMax}
              step={(seatsMax - seatsMin) / 100}
              onChange={(_, newValue) => {
                setFieldValue("seatsMin", parseInt(newValue[0]));
                setFieldValue("seatsMax", parseInt(newValue[1]));
              }}
              valueLabelDisplay="auto"
            />

            <Typography>Price:</Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Price start"
                size="small"
                name="priceMin"
                value={values.priceMin}
                error={Boolean(touched.priceMin && errors.priceMin)}
                helperText={touched.priceMin && errors.priceMin}
                disabled={priceMin === 0 && priceMax === 0}
                onChange={(e) => {
                  setFieldValue("priceMin", e.target.value);
                }}
              />
              <TextField
                label="Price end"
                size="small"
                name="priceMax"
                value={values.priceMax}
                error={Boolean(touched.priceMax && errors.priceMax)}
                helperText={touched.priceMax && errors.priceMax}
                disabled={priceMin === 0 && priceMax === 0}
                onChange={(e) => {
                  setFieldValue("priceMax", e.target.value);
                }}
              />
            </Box>
            <Slider
              getAriaLabel={() => "Price range"}
              value={[values.priceMin, values.priceMax]}
              min={priceMin}
              max={priceMax}
              step={(priceMax - priceMin) / 100}
              disabled={priceMin === 0 && priceMax === 0}
              onChange={(e) => {
                setFieldValue("priceMin", parseInt(e.target.value[0]));
                setFieldValue("priceMax", parseInt(e.target.value[1]));
              }}
              valueLabelDisplay="auto"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Free places"
              checked={values.hasFreePlaces}
              onChange={() =>
                setFieldValue("hasFreePlaces", !values.hasFreePlaces)
              }
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
