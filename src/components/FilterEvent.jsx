import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Slider,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

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
  handleFetchByFilter,
  handleClearFilter,
  isLoading,
}) => {
  const initialValues = {
    query: "",
    dateStart: dayjs(dateStart),
    dateEnd: dayjs(dateEnd),
    categories: [],
    seatsMin,
    seatsMax,
    priceMin,
    priceMax,
    hasFreePlaces: false,
  };

  const handleSubmitEvent = ({
    query,
    dateStart,
    dateEnd,
    categories,
    seatsMin,
    seatsMax,
    priceMin,
    priceMax,
    hasFreePlaces,
  }) => {
    handleFetchByFilter({
      searchQuery: query,
      dateStart: dateStart.$d,
      dataEnd: dateEnd.$d,
      categories: categories.length ? categories : [],
      seatsMin,
      seatsMax,
      priceMin,
      priceMax,
      hasFreePlaces,
    });
  };

  const handleClearForm = (resetForm) => {
    resetForm();
    handleClearFilter();
  };

  return (
    <Box>
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
          resetForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
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
              disabled={isLoading}
              sx={{ marginBottom: "0.75rem" }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date Start"
                value={values.dateStart}
                disabled={isLoading}
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
                disabled={isLoading}
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
              options={[...categories]}
              getOptionLabel={(option) => option}
              value={values.categories}
              disabled={categories.length === 0 || isLoading ? true : false}
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
                name="seatsMin"
                size="small"
                value={values.seatsMin}
                error={Boolean(touched.seatsMin && errors.seatsMin)}
                helperText={touched.seatsMin && errors.seatsMin}
                disabled={isLoading}
                onChange={(e) => {
                  setFieldValue("seatsMin", e.target.value);
                }}
              />
              <TextField
                label="Seats end"
                name="seatsMax"
                size="small"
                value={values.seatsMax}
                error={Boolean(touched.seatsMax && errors.seatsMax)}
                helperText={touched.seatsMax && errors.seatsMax}
                disabled={isLoading}
                onChange={(e) => {
                  setFieldValue("seatsMax", e.target.value);
                }}
              />
            </Box>
            <Slider
              valueLabelDisplay="auto"
              getAriaLabel={() => "Диапазон мест"}
              value={[values.seatsMin, values.seatsMax]}
              min={seatsMin}
              max={seatsMax}
              step={(seatsMax - seatsMin) / 100}
              disabled={isLoading}
              onChange={(_, newValue) => {
                setFieldValue("seatsMin", parseInt(newValue[0]));
                setFieldValue("seatsMax", parseInt(newValue[1]));
              }}
            />

            <Typography>Price:</Typography>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <TextField
                label="Price start"
                name="priceMin"
                size="small"
                value={values.priceMin}
                error={Boolean(touched.priceMin && errors.priceMin)}
                helperText={touched.priceMin && errors.priceMin}
                disabled={(priceMin === 0 && priceMax === 0) || isLoading}
                onChange={(e) => {
                  setFieldValue("priceMin", e.target.value);
                }}
              />
              <TextField
                label="Price end"
                name="priceMax"
                size="small"
                value={values.priceMax}
                error={Boolean(touched.priceMax && errors.priceMax)}
                helperText={touched.priceMax && errors.priceMax}
                disabled={(priceMin === 0 && priceMax === 0) || isLoading}
                onChange={(e) => {
                  setFieldValue("priceMax", e.target.value);
                }}
              />
            </Box>
            <Slider
              valueLabelDisplay="auto"
              getAriaLabel={() => "Price range"}
              value={[values.priceMin, values.priceMax]}
              min={priceMin}
              max={priceMax}
              step={(priceMax - priceMin) / 100}
              disabled={(priceMin === 0 && priceMax === 0) || isLoading}
              onChange={(e) => {
                setFieldValue("priceMin", parseInt(e.target.value[0]));
                setFieldValue("priceMax", parseInt(e.target.value[1]));
              }}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Free places"
              checked={values.hasFreePlaces}
              disabled={isLoading}
              onChange={() =>
                setFieldValue("hasFreePlaces", !values.hasFreePlaces)
              }
            />

            <LoadingButton type="submit" variant="outlined" loading={isLoading}>
              Search Event
            </LoadingButton>
            <LoadingButton
              type="button"
              variant="outlined"
              loading={isLoading}
              onClick={() => {
                handleClearForm(resetForm, setFieldValue);
                setFieldValue("categories", []);
              }}
            >
              Clear Filter
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};
