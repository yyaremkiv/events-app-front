import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { DropzoneUpload } from "./DropzoneUpload";
import { Box, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CityOperations from "@/redux/cities/city.operations";
import { FormValidation } from "@/config/form.validation";
import { ImageCity } from "./ImageCity";

export const ModalCity = ({ cityId }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const city = useSelector((state) => state.city.cities).find(
    (city) => city._id === cityId
  );

  const handleSubmitCity = (values, { resetForm }) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (image) formData.append("picture", image);

    if (cityId) {
      dispatch(CityOperations.updateCity(formData));
    } else {
      dispatch(CityOperations.addCity(formData));
    }

    setImage(null);
    resetForm();
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
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City name:
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city}
                  className="block w-full rounded-md border-0 py-1.5
                   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}>{errors.city}</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title event:
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  className="block w-full rounded-md border-0 py-1.5
                   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p style={{ color: "red" }}>{errors.title}</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country:
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p>{errors.country}</p>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Population:
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="population"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.population}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <p>{errors.population}</p>
              </div>

              <FormControlLabel
                control={
                  <Checkbox
                    name="showOnHomePage"
                    checked={values.showOnHomePage}
                    onChange={(e) =>
                      setFieldValue("showOnHomePage", e.target.checked)
                    }
                  />
                }
                label="Show on Home Page"
              />

              {city?.imagePath ? (
                <ImageCity imagePath={city.imagePath} size="100px" />
              ) : null}

              <DropzoneUpload image={image} setImage={setImage} />

              <Box sx={{ padding: "1rem" }}>
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    display: "block",
                    margin: "0 auto",
                  }}
                >
                  {cityId ? "Update City" : "Add city"}
                </Button>
              </Box>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
