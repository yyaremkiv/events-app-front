import { useState } from "react";
import { ModalWindow } from "../ModalWindows";
import { FormikTextField, FormikNumberField } from "../";
import { FormValidation } from "../../config";
import { v4 as uuidv4 } from "uuid";
import { ISpeaker } from "../../interfaces";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Close as CloseIcon, Done as DoneIcon } from "@mui/icons-material";
import * as Yup from "yup";

interface ISpeakerModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  currentSpeaker: ISpeaker | null;
  setCurrentSpeaker: (value: ISpeaker | null) => void;
  formikFunc: any;
  isLoading?: boolean;
}

export const SpeakerModal = ({
  openModal,
  handleModalClose,
  currentSpeaker,
  setCurrentSpeaker,
  formikFunc: { values, setFieldValue },
  isLoading = false,
}: ISpeakerModalProps): JSX.Element => {
  const [formValues, setFormValues] = useState<any>(
    FormValidation.initialValuesSpeaker
  );
  const [formErrors, setFormErrors] = useState<any>({});
  const [formTouched, setFormTouched] = useState<any>({});
  const theme = useTheme();

  if (formValues === FormValidation.initialValuesSpeaker && currentSpeaker?.id)
    setFormValues(currentSpeaker);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormValues((prevValues: Record<string, string | number>) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name } = e.target;
    setFormTouched((prevTouched: Record<string, string | number>) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleAddPerson = () => {
    FormValidation.speakerSchema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        const newPerson = {
          id: uuidv4(),
          firstname: formValues.firstname,
          lastname: formValues.lastname,
          age: formValues.age,
          about: formValues.about,
          email: formValues.email,
          topic: formValues.topic,
          telephone: formValues.telephone,
        };

        if (currentSpeaker) {
          const updatedListOfSpeakers = values.speakers.map(
            (speaker: ISpeaker) => {
              if (speaker.id === currentSpeaker.id) {
                speaker = { ...speaker, ...newPerson };
              }

              return speaker;
            }
          );

          setFieldValue("speakers", updatedListOfSpeakers);
          setCurrentSpeaker(null);
        } else {
          if (values?.speakers?.length > 0) {
            setFieldValue("speakers", [...values.speakers, newPerson]);
          } else {
            setFieldValue("speakers", [newPerson]);
          }
        }

        setFormValues(FormValidation.initialValuesSpeaker);
        handleModalClose();
      })
      .catch((validationErrors: Yup.ValidationError) => {
        const newErrors: Record<string, string> = {};
        const newTouched: Record<string, boolean> = {};

        console.log("validationErrors", validationErrors);

        validationErrors.inner.forEach((error: any) => {
          newErrors[error.path] = error.message;
          newTouched[error.path] = true;
        });

        setFormErrors(newErrors);
        setFormTouched(newTouched);
      });
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
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Last Name"
          name="lastname"
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikNumberField
          label="Age"
          name="age"
          minValue={1}
          maxValue={100}
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="About"
          name="about"
          minRows={2}
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Email"
          name="email"
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Topic"
          name="topic"
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
          isLoading={isLoading}
        />
        <FormikTextField
          label="Telephone"
          name="telephone"
          formikFunc={{
            values: formValues,
            errors: formErrors,
            touched: formTouched,
            handleBlur,
            handleChange,
          }}
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
