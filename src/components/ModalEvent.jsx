import { Formik } from "formik";
import * as Yup from "yup";
import { Box, FormHelperText, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";
import EventService from "@/services/EventService";

const initialValuesEvent = {
  title: "",
  description: "",
  date: dayjs(),
  seats: "",
};

const eventSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "City must be at least 3 characters long.")
    .max(50, "City cannot be longer than 50 characters.")
    .required("City is required."),
  description: Yup.string()
    .min(3, "City must be at least 3 characters long.")
    .max(50, "City cannot be longer than 50 characters.")
    .required("City is required."),
  date: Yup.date()
    .required("Date is required")
    .test("is-after-today", "Date cannot be after today", function (value) {
      return dayjs(value).isAfter(dayjs(), "day");
    }),
  seats: Yup.string()
    .max(50, "Location must be no more than 50 characters")
    .required("Last name is required."),
});

export const ModalEvent = ({ id }) => {
  const isLoading = false;
  const [value, setValue] = useState(dayjs());
  const [time, setTime] = useState(dayjs());

  const handleSubmitPost = (values) => {
    EventService.addEvent({
      cityId: id,
      title: values.title,
      description: values.description,
      date: values.date.$d,
      seats: values.seats,
    });
  };

  return (
    <Box>
      <Formik
        onSubmit={handleSubmitPost}
        initialValues={initialValuesEvent}
        validationSchema={eventSchema}
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
              gap: "1.25rem",
              padding: "1rem",
            }}
          >
            <TextField
              label="Title Event"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={Boolean(touched.title && errors.title)}
              helperText={touched.title && errors.title}
              sx={{ height: "60px" }}
            />

            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={Boolean(touched.description && errors.description)}
              helperText={touched.description && errors.description}
              sx={{ height: "60px" }}
            />

            <Box sx={{ width: "100%" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Date"
                  value={values.date}
                  onChange={(date) => setFieldValue("date", date)}
                  sx={{ width: "100%" }}
                />
                <FormHelperText
                  error={Boolean(touched.date && errors.date)}
                  sx={{
                    visibility:
                      touched.date && errors.date ? "visible" : "hidden",
                    height: "12px",
                  }}
                >
                  {touched.date && errors.date}
                </FormHelperText>
              </LocalizationProvider>
            </Box>

            <TextField
              label="Seats"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.seats}
              name="seats"
              error={Boolean(touched.seats && errors.seats)}
              helperText={touched.seats && errors.seats}
              sx={{ height: "60px" }}
            />

            <LoadingButton
              variant="outlined"
              loading={isLoading}
              disabled={isLoading}
              loadingPosition="center"
              type="submit"
              sx={{
                margin: "0 auto 1rem auto",
                padding: "0.25rem 4rem",
                fontSize: "0.9rem",
              }}
            >
              Add Event
            </LoadingButton>
          </form>
        )}
      </Formik>
    </Box>
  );
};

{
  /* <p>title</p>
          <p>description</p>
          <p>date</p>
          <p>seats</p> */
}
