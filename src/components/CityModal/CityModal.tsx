import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { isEqual } from "lodash";
import {
  FormikTextField,
  FormikCheckbox,
  ImageItemCity,
  DropzoneUploadImage,
  CustomLoadingButton,
} from "..";
import {
  FormikAutocompleteOfCities,
  FormikAutocompleteOfCountries,
} from "../FormikElements";
import { FormValidation } from "../../config";
import { EventOperations } from "../../redux/event/event.operations";
import { AppDispatch, RootState } from "../../redux/store";
import { DataConfigInformation } from "../../data";
import { ICity, ICountry, ICityItem } from "../../interfaces";
import { Box, useTheme, Typography } from "@mui/material";
import {
  Home as HomeIcon,
  HideSource as HideSourceIcon,
} from "@mui/icons-material";

interface ICityModalProps {
  page: number;
  limit: number;
  cityId: string | null;
  isLoading?: boolean;
  error: string | null;
  handleCloseModal: () => void;
}

interface IFormValues {
  country: ICountry;
  city: ICity;
  description: string;
  showOnHomePage: boolean;
  isHidden: boolean;
}

export const CityModal = ({
  page,
  limit,
  cityId,
  isLoading = false,
  error,
  handleCloseModal,
}: ICityModalProps): JSX.Element => {
  const [image, setImage] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const theme = useTheme();

  const city = cityId
    ? useSelector((state: RootState) => state.events.cities).find(
        (city: ICityItem) => city._id === cityId
      )
    : null;

  const currentCity = city
    ? {
        country: city.country,
        city: city.city,
        description: city.description,
        showOnHomePage: city.showOnHomePage,
        isHidden: city.isHidden,
      }
    : null;

  const handleSubmitCity = async (
    values: IFormValues,
    { resetForm }: FormikHelpers<IFormValues>
  ) => {
    const areEqual = isEqual(values, currentCity);

    if (areEqual) {
      Notify.warning("Make changes to update the data");
      return;
    }

    const formData: any = new FormData();
    if (cityId) formData.append("_id", cityId);
    if (image) formData.append("picture", image);

    formData.append("country", JSON.stringify(values.country));
    formData.append("city", JSON.stringify(values.city));
    formData.append("showOnHomePage", JSON.stringify(values.showOnHomePage));
    formData.append("isHidden", JSON.stringify(values.isHidden));

    formData.append("description", values.description);

    try {
      let res: any;
      setLocalError(null);

      if (cityId)
        res = await dispatch(EventOperations.updateCity({ formData }));
      if (!cityId) {
        res = await dispatch(
          EventOperations.addCity({ formData, params: { page, limit } })
        );
      }

      if (!res.error && !isLoading) {
        handleCloseModal();
        setImage(null);
        resetForm();
      }
    } catch (err: any) {
      setLocalError(err.message);
    }
  };

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <Formik
        onSubmit={handleSubmitCity}
        // @ts-ignore
        initialValues={
          currentCity ? currentCity : FormValidation.initialValuesCity
        }
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
            <FormikAutocompleteOfCountries
              label="Set Country"
              changeFieldName="country"
              options={DataConfigInformation.listCountries}
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <FormikAutocompleteOfCities
              label="Set City"
              changeFieldName="city"
              options={DataConfigInformation.listCities}
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <FormikTextField
              label="Description"
              name="description"
              info="Please provide a description that is between 6 and 300 characters in length."
              minRows={5}
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <Box>
              <FormikCheckbox
                label="Show This City On Home Page"
                name="showOnHomePage"
                addNameChange="isHidden"
                formikFunc={{ values, setFieldValue }}
                isLoading={isLoading}
              >
                <HomeIcon
                  sx={{
                    fontSize: "1.8rem",
                    color: theme.palette.background.main,
                  }}
                />
              </FormikCheckbox>

              <FormikCheckbox
                label="Hide This City"
                name="isHidden"
                addNameChange="showOnHomePage"
                hideStyle={true}
                formikFunc={{ values, setFieldValue }}
                isLoading={isLoading}
              >
                <HideSourceIcon sx={{ fontSize: "1.8rem", color: "red" }} />
              </FormikCheckbox>
            </Box>

            {city?.imagePath && !image ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
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
      <Typography color="error">{error || localError}</Typography>
    </Box>
  );
};
