import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Box, FormHelperText, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventService from "@/services/event.service";
import { FormValidation } from "@/config/form.validation";
import dayjs from "dayjs";
import { DropzoneUpload } from "./DropzoneUpload";
import CityOperations from "@/redux/cities/city.operations";

export const ModalEvent = ({ cityId, eventId }) => {
  const isLoading = false;
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const dispatch = useDispatch();
  const city = useSelector((state) => state.events.cities).find(
    (city) => city._id === cityId
  );
  const singleEvent = city.events.find((event) => event.id === eventId);

  const dataEvent = eventId
    ? {
        title: singleEvent.title,
        description: singleEvent.description,
        date: dayjs(singleEvent.date),
        seats: singleEvent.seats,
      }
    : null;

  const handleSubmitEvent = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("cityId", cityId);

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) {
      formData.append("picture", image);
    }

    if (eventId) {
      formData.append("eventId", eventId);
      dispatch(CityOperations.updateEvent(formData));
    } else {
      dispatch(CityOperations.addEvent(formData));
    }
  };

  return (
    <Box>
      <Formik
        onSubmit={handleSubmitEvent}
        initialValues={
          dataEvent ? dataEvent : FormValidation.initialValuesEvent
        }
        validationSchema={FormValidation.eventSchema}
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

            <DropzoneUpload image={image} setImage={setImage} />

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
