import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import {
  FormikTextField,
  FormikNumberField,
  FormikCheckbox,
  ImageItemCity,
  DropzoneUploadImage,
  CustomLoadingButton,
} from "../";
import { FormValidation } from "../../config";
import { Box, useTheme, Typography } from "@mui/material";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch } from "../../redux/store";

interface IModalCityProps {
  cityId: string | null;
  isLoading?: boolean;
  handleCloseModal: any;
}

export const ModalCity = ({
  cityId,
  isLoading = false,
  handleCloseModal,
}: IModalCityProps): JSX.Element => {
  const [image, setImage] = useState<any | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const handleSubmitCity = async (values: any, { resetForm }: any) => {
    const formData: any = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) formData.append("picture", image);

    let response: any;
    if (cityId) {
      response = await dispatch(EventOperations.updateCity(formData));
    } else {
      response = await dispatch(EventOperations.addCity(formData));
    }

    if (!response.error && !isLoading) handleCloseModal();

    setImage(null);
    resetForm();
  };

  return (
    <Box>
      <Formik
        onSubmit={handleSubmitCity}
        initialValues={city ? city : FormValidation.initialValuesCity}
        validationSchema={FormValidation.citySchema}
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
              label="City Name"
              name="city"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikTextField
              label="Title Event"
              name="title"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikTextField
              label="Country"
              name="country"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikNumberField
              label="Population"
              name="population"
              minValue={0}
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikCheckbox
              label="Show This City On Home Page"
              name="showOnHomePage"
              formikFunc={{ values, setFieldValue }}
              isLoading={isLoading}
            />

            {city?.imagePath && !image ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <ImageItemCity
                  imagePath={city.imagePath}
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
                text={cityId ? "Update City" : "Add city"}
                isLoading={isLoading}
              />
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
