import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import CityOperations from "../../redux/cities/city.operations";
import { FormValidation } from "../../config/form.validation";
import {
  FormikTextField,
  FormikNumberField,
  FormikCheckbox,
  ImageItemCity,
  DropzoneUploadImage,
} from "../";
import { Box, Button, useTheme, IconButton, Tooltip } from "@mui/material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

export const ModalCity = ({ cityId }: { cityId: string }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const city = useSelector((state: any) => state.events.cities).find(
    (city: any) => city._id === cityId
  );

  console.log("city", city);

  const theme = useTheme();

  const isLoading = false;

  const handleSubmitCity = (values: any, { resetForm }: { resetForm: any }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) formData.append("picture", image);

    if (cityId) {
      // @ts-ignore
      dispatch(CityOperations.updateCity(formData));
    } else {
      // @ts-ignore
      dispatch(CityOperations.addCity(formData));
    }

    setImage(null);
    resetForm();
  };

  const handleDeleteImage = (setFieldValue: any) => {
    setImage(null);
    city.imagePath = "";
    console.log("sdjfdsfd", setFieldValue);
  };

  return (
    <div style={{ width: "100%" }}>
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
              padding: "1rem",
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

            {city?.imagePath ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ImageItemCity
                  imagePath={city.imagePath}
                  size="100px"
                  borderRadius="1rem"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1.5rem",
                    width: "100%",
                  }}
                >
                  <Tooltip title="Change Current Photo" placement="top">
                    <IconButton>
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Current Photo" placement="top">
                    <IconButton
                      onClick={() => handleDeleteImage(setFieldValue)}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ) : null}

            <DropzoneUploadImage image={image} setImage={setImage} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "0.5rem 1rem",
              }}
            >
              <Button type="submit" sx={{ padding: "0.75rem 3rem" }}>
                {cityId ? "Update City" : "Add city"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
};
