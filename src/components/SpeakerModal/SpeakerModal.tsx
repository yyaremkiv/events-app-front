import { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ModalWindow } from "../ModalWindows";
import { FormikTextField, FormikNumberField } from "../";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { v4 as uuidv4 } from "uuid";
import { ISpeaker } from "../../interfaces";

import { useFormikContext } from "formik";
import * as Yup from "yup";

interface ISpeakerModalProps {
  openModal: boolean;
  handleModalClose: () => void;
  currentSpeaker: ISpeaker | null;
  setCurrentSpeaker: any;
  formikFunc: any;
  isLoading?: boolean;
}

const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[^\s]+$/, "Enter a value without spaces")
    .min(2, "First Name must be at least 2 characters long.")
    .max(50, "First Name cannot be longer than 50 characters.")
    .required("First Name is required."),
  lastname: Yup.string()
    .matches(/^[^\s]+$/, "Enter a value without spaces")
    .min(2, "Last Name must be at least 2 characters long.")
    .max(50, "Last Name cannot be longer than 50 characters.")
    .required("Last Name is required."),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(100, "Age cannot exceed 100"),
  about: Yup.string()
    .min(6, "About must be at least 6 characters long.")
    .max(200, "About cannot be longer than 200 characters.")
    .required("About is required."),
  email: Yup.string()
    .matches(/^[^\s]+$/, "Enter a value without spaces")
    .email("Please enter a valid email address.")
    .min(4, "Email must be at least 3 characters long.")
    .max(50, "Email cannot be longer than 50 characters.")
    .required("Email is required."),
  topic: Yup.string()
    .min(6, "Topic must be at least 6 characters long.")
    .max(200, "Topic cannot be longer than 200 characters.")
    .required("Topic is required."),
  telephone: Yup.string()
    .min(4, "Email must be at least 3 characters long.")
    .max(50, "Email cannot be longer than 50 characters.")
    .required("Telephone is required"),
});

const obj = {
  firstname: "",
  lastname: "",
  age: 1,
  about: "",
  email: "",
  topic: "",
  telephone: "",
};

export const SpeakerModal = ({
  openModal,
  handleModalClose,
  currentSpeaker,
  setCurrentSpeaker,
  formikFunc: { values, setFieldValue },
  isLoading = false,
}: ISpeakerModalProps): JSX.Element => {
  const theme = useTheme();

  const currentValue = currentSpeaker ? { ...currentSpeaker } : { ...obj };

  const [formValues, setFormValues] = useState<any>(currentValue);
  const [formErrors, setFormErrors] = useState<any>({});
  const [formTouched, setFormTouched] = useState<any>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = (e: any) => {
    const { name } = e.target;
    setFormTouched((prevTouched: any) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleAddPerson = () => {
    validationSchema
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
          if (values.speakers.length > 0) {
            setFieldValue("speakers", [...values.speakers, newPerson]);
          } else {
            setFieldValue("speakers", [newPerson]);
          }
        }

        setFormValues(obj);
        // setFormErrors({});
        // formTouched({});
        handleModalClose();
      })
      .catch((validationErrors) => {
        const newErrors: any = {};
        const newTouched: any = {};

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

// const handleAddPerson = () => {
//   const newPerson = {
//     id: uuidv4(),
//     firstname: values.firstname,
//     lastname: values.lastname,
//     age: values.age,
//     about: values.about,
//     email: values.email,
//     topic: values.topic,
//     telephone: values.telephone,
//   };

//   if (currentSpeaker) {
//     const updatedListOfSpeakers = values.speakers.map((speaker: ISpeaker) => {
//       if (speaker.id === currentSpeaker.id) {
//         speaker = { ...speaker, ...newPerson };
//       }

//       return speaker;
//     });

//     setFieldValue("speakers", updatedListOfSpeakers);
//     setCurrentSpeaker(null);
//   } else {
//     if (values.speakers) {
//       setFieldValue("speakers", [...values.speakers, newPerson]);
//     } else {
//       setFieldValue("speakers", [newPerson]);
//     }
//   }

//   setFieldValue("firstname", "");
//   setFieldValue("lastname", "");
//   setFieldValue("age", 1);
//   setFieldValue("about", "");
//   setFieldValue("email", "");
//   setFieldValue("topic", "");
//   setFieldValue("telephone", "");

//   handleModalClose();
//   console.log("handleAddPerson", values);
// };
