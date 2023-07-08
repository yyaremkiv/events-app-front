import { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  IconButton,
  Tooltip,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { DataConfigInformation } from "../../data";
import { ICountry } from "../../interfaces";
import { ModalWindow } from "../ModalWindows";
import { FormValidation } from "../../config";
import { FormikTextField, CustomLoadingButton } from "../";

export const AdminListCountries = (): JSX.Element => {
  const [countriesList, setCountriesList] = useState<any>(
    DataConfigInformation.listCountries
  );
  const [currentCountry, setCurrentCountry] = useState<ICountry | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const theme = useTheme();

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDeleteCountries = ({ label }: { label: string }) => {
    console.log("delete", label);
    DataConfigInformation.listCountries =
      DataConfigInformation.listCountries.filter(
        (country) => country.label !== label
      );
  };

  const handleAddCountry = () => {
    setOpenModal(true);
  };

  const handleSubmitCity = (
    { code, label, phone }: any,
    { resetForm }: any
  ) => {
    DataConfigInformation.listCountries.push({
      code,
      label,
      phone,
      cities: [],
    });

    resetForm();
    setOpenModal(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          paddingBottom: "0.5rem",
        }}
      >
        <Tooltip title="Add New Country" placement="top">
          <IconButton onClick={handleAddCountry}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />

      <Box component="ul">
        {countriesList.map(
          ({ label, code, phone }: ICountry, index: number) => (
            <Box
              key={label}
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography>{index + 1}</Typography>
                <img
                  loading="lazy"
                  width="40"
                  src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w160/${code.toLowerCase()}.png 2x`}
                  alt=""
                />
                <Typography>{label}</Typography>
                <Typography>(phone: {phone})</Typography>
              </Box>

              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip title="Update Country" placement="top">
                  <IconButton
                    onClick={(e) => {
                      handleModalOpen();
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Country" placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCountries({ label });
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )
        )}
      </Box>

      <ModalWindow open={openModal} onCloseFunc={setOpenModal}>
        <Box sx={{ color: theme.palette.text.primary }}>
          <Formik
            onSubmit={handleSubmitCity}
            initialValues={FormValidation.initialValuesCountry}
            validationSchema={FormValidation.countrySchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
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
                  label="Code Country"
                  name="code"
                  formikFunc={{
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                  }}
                />
                <FormikTextField
                  label="Name Country"
                  name="label"
                  formikFunc={{
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                  }}
                />
                <FormikTextField
                  label="Code Phone"
                  name="phone"
                  formikFunc={{
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0.25rem",
                  }}
                >
                  <CustomLoadingButton text="Add Country" />
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </ModalWindow>
    </Box>
  );
};
