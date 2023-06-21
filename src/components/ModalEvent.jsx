import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { Autocomplete, Box, FormHelperText, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormValidation } from "../config/form.validation";
import dayjs from "dayjs";
import { DropzoneUpload } from "./DropzoneUploadImage.tsx";
import CityOperations from "../redux/cities/city.operations";

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
    console.log("this is handle console", values);
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

            <Box sx={{ display: "flex", gap: "1rem" }}>
              <TextField
                label="Seats count"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.seats}
                name="seats"
                error={Boolean(touched.seats && errors.seats)}
                helperText={touched.seats && errors.seats}
                sx={{ height: "60px", width: "50%" }}
              />
              <TextField
                label="Price"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                sx={{ height: "60px", width: "50%" }}
              />
            </Box>

            <Autocomplete
              multiple
              id="size-small-outlined-multi"
              options={eventCategories}
              getOptionLabel={(option) => option.name}
              disabled={eventCategories.length > 0 ? false : true}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Set category"
                  placeholder="Add more"
                />
              )}
              onChange={(_, selectedValues) => {
                setFieldValue(
                  "categories",
                  selectedValues.reduce((acc, cat) => {
                    acc.push(cat.name);
                    return acc;
                  }, [])
                );
              }}
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
