import * as Yup from "yup";
import dayjs from "dayjs";

export const FormValidation = {
  initialValuesCity: {
    country: null,
    city: null,
    description: "",
    showOnHomePage: false,
    isHidden: false,
  },
  initialValuesEvent: {
    title: "",
    description: "",
    date: dayjs(),
    seats: 0,
    price: 0,
    categories: [],
    speakers: [],
  },
  citySchema: Yup.object().shape({
    country: Yup.object().required("Country is required."),
    city: Yup.object().required("City is required."),
    description: Yup.string()
      .min(6, "Description must be at least 6 characters long.")
      .max(300, "Description cannot be longer than 300 characters.")
      .required("Description is required."),
    showOnHomePage: Yup.boolean(),
    isHidden: Yup.boolean(),
  }),
  eventSchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "City must be at least 3 characters long.")
      .max(50, "City cannot be longer than 50 characters.")
      .required("City is required."),
    description: Yup.string()
      .min(3, "City must be at least 3 characters long.")
      .max(50, "City cannot be longer than 50 characters.")
      .required("City is required."),
    date: Yup.date()
      .required("Date is required")
      .test("is-after-today", "Date cannot be after today", function (value) {
        return dayjs(value).isAfter(dayjs(), "day");
      }),
    showOnHomePage: Yup.boolean(),
    isHidden: Yup.boolean(),
    showInCityHome: Yup.boolean(),
    seats: Yup.string()
      .max(50, "Location must be no more than 50 characters")
      .required("Last name is required."),
  }),
};
