import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { FormValidation } from "../../config";
import {
  FormikTextField,
  DropzoneUploadImage,
  FormikDate,
  FormikNumberField,
  FormikAutocomplete,
  CustomLoadingButton,
  ImageItemCity,
} from "../";
import { Box, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import DataConfigInformation from "../../data/DataConfigInformation";
import { EventOperations } from "../../redux/event/event.operations";

export const ModalEvent = ({ cityId, eventId }: any) => {
  const isLoading = false;
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const theme = useTheme();

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );
  const singleEvent = city.events.find((event: any) => event.id === eventId);

  console.log("this is single event", singleEvent);

  const dataEvent = eventId
    ? {
        title: singleEvent.title,
        description: singleEvent.description,
        date: dayjs(singleEvent.date),
        seats: singleEvent.seats,
        imagePath: singleEvent.imagePath,
      }
    : null;

  const handleSubmitEvent = (values: any, { resetForm }: any) => {
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
      // @ts-ignore
      dispatch(EventOperations.updateEvent(formData));
    } else {
      // @ts-ignore
      dispatch(EventOperations.addEvent(formData));
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
        }: any) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <FormikTextField
              label="Title Event"
              name="title"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikTextField
              label="Description"
              name="description"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikDate
              label="Date"
              name="date"
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <Box sx={{ display: "flex", gap: "1rem" }}>
              <FormikNumberField
                label="Seats count"
                name="seats"
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                }}
                minValue={0}
                isLoading={isLoading}
              />

              <FormikNumberField
                label="Price"
                name="price"
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                }}
                minValue={0}
                isLoading={isLoading}
              />
            </Box>

            <FormikAutocomplete
              label="Set category"
              value={values.categories}
              changeFieldName="categories"
              changeFieldFunction={setFieldValue}
              options={DataConfigInformation.labelEventCategories}
              isLoading={isLoading}
            />

            {values?.imagePath && !image ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <ImageItemCity
                  imagePath={values.imagePath}
                  size="100px"
                  borderRadius="1rem"
                />
                <Typography sx={{ color: theme.palette.text.primary }}>
                  This Is Current Photo
                </Typography>
              </Box>
            ) : null}

            <DropzoneUploadImage image={image} setImage={setImage} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 0",
              }}
            >
              <CustomLoadingButton text="Add Event" isLoading={isLoading} />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
