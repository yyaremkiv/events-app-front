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

interface IModalCityProps {
  cityId: string | null;
  isLoading?: boolean;
}

export const ModalCity = ({
  cityId,
  isLoading,
}: IModalCityProps): JSX.Element => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  const handleSubmitCity = (values: any, { resetForm }: { resetForm: any }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) formData.append("picture", image);

    if (cityId) {
      // @ts-ignore
      dispatch(EventOperations.updateCity(formData));
    } else {
      // @ts-ignore
      dispatch(EventOperations.addCity(formData));
    }

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
