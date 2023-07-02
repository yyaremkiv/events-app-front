import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ModalWindow } from "../ModalWindows";
import { FormikTextField, FormikNumberField } from "../";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { v4 as uuidv4 } from "uuid";

export const SpeakerModal = ({
  openModal,
  handleModalClose,
  currentSpeaker,
  setCurrentSpeaker,
  formikFunc: {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue,
  },
  isLoading = false,
}: any): JSX.Element => {
  const theme = useTheme();

  const handleAddPerson = () => {
    const newPerson = {
      id: uuidv4(),
      firstname: values.firstname,
      lastname: values.lastname,
      age: values.age,
      about: values.about,
      email: values.email,
      topic: values.topic,
      telephone: values.telephone,
    };

    if (currentSpeaker) {
      const updatedListOfSpeakers = values.speakers.map((speaker: any) => {
        if (speaker.id === currentSpeaker.id) {
          speaker = { ...speaker, ...newPerson };
        }

        return speaker;
      });

      setFieldValue("speakers", updatedListOfSpeakers);
      setCurrentSpeaker(null);
    } else {
      if (values.speakers) {
        setFieldValue("speakers", [...values.speakers, newPerson]);
      } else {
        setFieldValue("speakers", [newPerson]);
      }
    }

    setFieldValue("firstname", "");
    setFieldValue("lastname", "");
    setFieldValue("age", 1);
    setFieldValue("about", "");
    setFieldValue("email", "");
    setFieldValue("topic", "");
    setFieldValue("telephone", "");

    handleModalClose();
    console.log("handleAddPerson", values);
  };

  return (
    <ModalWindow open={openModal} onCloseFunc={handleModalClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          color: theme.palette.text.primary,
        }}
      >
        <Typography textAlign="center">Information About Speaker</Typography>
        <FormikTextField
          label="First Name"
          name="firstname"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Last Name"
          name="lastname"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikNumberField
          label="Age"
          name="age"
          minValue={1}
          maxValue={100}
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="About"
          name="about"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Email"
          name="email"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Topic"
          name="topic"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Telephone"
          name="telephone"
          formikFunc={{ values, errors, touched, handleBlur, handleChange }}
          isLoading={isLoading}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <IconButton onClick={handleAddPerson}>
            <DoneIcon color="success" />
          </IconButton>
          <IconButton onClick={handleModalClose}>
            <CloseIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </ModalWindow>
  );
};
