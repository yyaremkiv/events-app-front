import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DropzoneUpload } from "../DropzoneUpload";

const initialValuesCity = {
  city: "",
  country: "",
  population: "",
};

const citySchema = Yup.object().shape({
  city: Yup.string()
    .matches(/^[^\s]+$/, "Enter a value without spaces")
    .min(3, "City must be at least 3 characters long.")
    .max(50, "City cannot be longer than 50 characters.")
    .required("City is required."),
  country: Yup.string()
    .matches(/^[^\s]+$/, "Enter a value without spaces")
    .min(3, "Last name must be at least 3 characters long.")
    .max(50, "Last name cannot be longer than 50 characters.")
    .required("Last name is required."),
  population: Yup.string()
    .max(50, "Location must be no more than 50 characters")
    .required("Last name is required."),
  occupation: Yup.string().max(
    50,
    "Occupation must be no more than 50 characters"
  ),
});

export const FormCity = ({ handleAddCity }) => {
  const [image, setImage] = useState(null);

  const handleSubmitCity = (values, { resetForm }) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (image) formData.append("picture", image);
    handleAddCity(formData);
    setImage(null);
    resetForm();
  };

  return (
    <div style={{ width: "100%" }}>
      <Formik
        onSubmit={handleSubmitCity}
        initialValues={initialValuesCity}
        validationSchema={citySchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
            </div>

            <DropzoneUpload image={image} setImage={setImage} />

            <div className="mt-6 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add city
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
