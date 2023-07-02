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
import { Box, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { DataConfigInformation } from "../../data";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch } from "../../redux/store";

import {
  Home as HomeIcon,
  HideSource as HideSourceIcon,
  AddHome as AddHomeIcon,
} from "@mui/icons-material";
import { SpeakerModal } from "../SpeakerModal/SpeakerModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const EventModal = ({
  cityId,
  eventId,
  handleCloseModal,
  error,
  isLoading = false,
}: any) => {
  const [image, setImage] = useState(null);
  const dispatch: AppDispatch = useDispatch();

  const [showAddPerson, setShowAddPerson] = useState(false);

  const [currentSpeaker, setCurrentSpeaker] = useState(null);

  const theme = useTheme();

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );
  const singleEvent = city.events.find((event: any) => event.id === eventId);

  const speakers = [
    {
      id: "adfsfdf",
      firstname: "имя1",
      lastname: "фамилия1",
      age: 1,
      about: "описание1",
      email: "speaker1@example.com",
      topic: "Тема презентации 1",
      telephone: "dfdsfd",
    },
    {
      id: "adsfsdf",
      firstname: "имя2",
      lastname: "фамилия2",
      age: 2,
      about: "описание2",
      email: "speaker2@example.com",
      topic: "Тема презентации 2",
      telephone: "sdfsdf",
    },
    {
      id: "dsfsdf",
      firstname: "имя3",
      lastname: "фамилия3",
      age: 3,
      about: "описание3",
      email: "speaker3@example.com",
      topic: "Тема презентации 3",
      telephone: "sdfsdfs",
    },
  ];

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
        speakers: singleEvent.speakers,
      }
    : null;

  const handleSubmitEvent = async (values: any, { resetForm }: any) => {
    console.log("Values", values);

    const formData = new FormData();
    formData.append("cityId", cityId);
    formData.append("eventId", eventId);
    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (
        key === "firstname" ||
        key === "lastname" ||
        key === "age" ||
        key === "about" ||
        key === "email" ||
        key === "topic" ||
        key === "telephone"
      )
        return;
      if (
        key === "categories" ||
        key === "showOnHomePage" ||
        key === "isHidden" ||
        key === "showInCityHome" ||
        key === "speakers"
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

  const handleModalClose = () => {
    setShowAddPerson(false);
  };

  const handleDeleteSpeaker = ({ values, speakerId, setFieldValue }: any) => {
    const updatedSpeakers = values.speakers.filter(
      (speaker: any) => speaker.id !== speakerId
    );
    setFieldValue("speakers", updatedSpeakers);
  };

  const handleEditSpeaker = ({ values, speakerId, setFieldValue }: any) => {
    const currentSpeaker = values.speakers.find(
      (speaker: any) => speaker.id === speakerId
    );

    setFieldValue("firstname", currentSpeaker.firstname);
    setFieldValue("lastname", currentSpeaker.lastname);
    setFieldValue("age", currentSpeaker.age);
    setFieldValue("about", currentSpeaker.about);
    setFieldValue("email", currentSpeaker.email);
    setFieldValue("topic", currentSpeaker.topic);
    setFieldValue("telephone", currentSpeaker.telephone);

    setCurrentSpeaker(currentSpeaker);
    setShowAddPerson(true);
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

            {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Tooltip title="Add New Speaker" placement="top">
                <IconButton onClick={() => setShowAddPerson(true)}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="h5"
              sx={{ textAlign: "center", color: theme.palette.text.primary }}
            >
              List Speakers For Event:
            </Typography>

            <SpeakerModal
              openModal={showAddPerson}
              handleModalClose={handleModalClose}
              currentSpeaker={currentSpeaker}
              setCurrentSpeaker={setCurrentSpeaker}
              formikFunc={{
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                setFieldValue,
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                color: theme.palette.text.primary,
              }}
            >
              {values?.speakers?.map(
                ({ id, firstname, lastname }: any, index: number) => (
                  <Box
                    key={id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      padding: "0.1rem 0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <Typography sx={{ color: theme.palette.text.light }}>
                        {index + 1}
                      </Typography>
                      <Typography>Speaker: </Typography>
                      <Typography>{`${firstname} ${lastname}`}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                      <IconButton
                        onClick={() =>
                          handleEditSpeaker({
                            values,
                            speakerId: id,
                            setFieldValue,
                          })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleDeleteSpeaker({
                            values,
                            speakerId: id,
                            setFieldValue,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )
              )}
            </Box>
            {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

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
