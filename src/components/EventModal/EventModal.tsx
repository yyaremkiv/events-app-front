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
  FormikCheckbox,
} from "..";
import { Box, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { DataConfigInformation } from "../../data";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch } from "../../redux/store";

import {
  Home as HomeIcon,
  HideSource as HideSourceIcon,
  AddHome as AddHomeIcon,
} from "@mui/icons-material";

export const EventModal = ({
  cityId,
  eventId,
  handleCloseModal,
  error,
  isLoading = false,
}: any) => {
  const [image, setImage] = useState(null);
  const dispatch: AppDispatch = useDispatch();

  const theme = useTheme();

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );
  const singleEvent = city.events.find((event: any) => event.id === eventId);

  const dataEvent = eventId
    ? {
        title: singleEvent.title,
        description: singleEvent.description,
        date: dayjs(singleEvent.date),
        seats: singleEvent.seats,
        imagePath: singleEvent.imagePath,
        categories: singleEvent.categories,
        showOnHomePage: singleEvent.showOnHomePage,
        isHidden: singleEvent.isHidden,
        showInCityHome: singleEvent.showInCityHome,
      }
    : null;

  const handleSubmitEvent = async (values: any, { resetForm }: any) => {
    const formData = new FormData();
    formData.append("cityId", cityId);
    formData.append("eventId", eventId);

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (
        key === "categories" ||
        key === "showOnHomePage" ||
        key === "isHidden" ||
        key === "showInCityHome"
      ) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });

    if (image) formData.append("picture", image);

    let response: any;
    if (eventId) {
      response = await dispatch(EventOperations.updateEvent(formData));
    } else {
      response = await dispatch(EventOperations.addEvent(formData));
    }

    if (!response.error && !isLoading) {
      handleCloseModal();
      setImage(null);
      resetForm();
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

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <HomeIcon
                  sx={{
                    fontSize: "1.8rem",
                    color: theme.palette.background.main,
                  }}
                />
                <FormikCheckbox
                  label="Show This Event On Home Page"
                  name="showOnHomePage"
                  addNameChange="isHidden"
                  formikFunc={{ values, setFieldValue }}
                  isLoading={isLoading}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <AddHomeIcon
                  sx={{
                    fontSize: "1.8rem",
                    color: theme.palette.background.main,
                  }}
                />
                <FormikCheckbox
                  label="Show This Event On City In Home Page"
                  name="showInCityHome"
                  formikFunc={{ values, setFieldValue }}
                  isLoading={isLoading}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <HideSourceIcon sx={{ fontSize: "1.8rem", color: "red" }} />
                <FormikCheckbox
                  label="Hide This Event"
                  name="isHidden"
                  addNameChange="showOnHomePage"
                  hideStyle={true}
                  formikFunc={{ values, setFieldValue }}
                  isLoading={isLoading}
                />
              </Box>
            </Box>

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
              <CustomLoadingButton
                text={eventId ? "Update Event" : "Add Event"}
                isLoading={isLoading}
              />
            </Box>
          </form>
        )}
      </Formik>
      <Typography sx={{ color: "red" }}>{error}</Typography>
    </Box>
  );
};
