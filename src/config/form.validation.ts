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
    showOnHomePage: false,
    showInCityHome: false,
    isHidden: false,
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
      .min(6, "Title must be at least 6 characters long.")
      .max(50, "Title cannot be longer than 50 characters.")
      .required("Title is required."),
    description: Yup.string()
      .min(6, "Description must be at least 6 characters long.")
      .max(300, "Description cannot be longer than 300 characters.")
      .required("Description is required."),
    date: Yup.date()
      .required("Date is required")
      .test("is-after-today", "Date cannot be after today", function (value) {
        return dayjs(value).isAfter(dayjs(), "day");
      }),
    seats: Yup.number()
      .min(1, "Seats must be greater than 0.")
      .max(1000000, "Seats cannot be greater than 1000000."),
    price: Yup.number()
      .min(1, "Price must be greater than 0.")
      .max(1000000, "Price cannot be greater than 1000000."),
    categories: Yup.object().required("Category is required."),
    speakers: Yup.object().required("Speakers is required."),
    showOnHomePage: Yup.boolean(),
    showInCityHome: Yup.boolean(),
    isHidden: Yup.boolean(),
  }),
};
