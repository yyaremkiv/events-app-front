import * as Yup from "yup";
import dayjs from "dayjs";

export const FormValidation = {
  initialValuesCity: {
    title: "",
    city: null,
    country: null,
    population: "",
    showOnHomePage: false,
  },
  initialValuesEvent: {
    title: "",
    description: "",
    date: dayjs(),
    seats: 0,
    price: 0,
    categories: [],
  },
  citySchema: Yup.object().shape({
    title: Yup.string()
      .min(3, "City must be at least 3 characters long.")
      .max(50, "City cannot be longer than 50 characters.")
      .required("City is required."),
    population: Yup.string()
      .max(50, "Location must be no more than 50 characters")
      .required("Last name is required."),
    occupation: Yup.string().max(
      50,
      "Occupation must be no more than 50 characters"
    ),
    showOnHomePage: Yup.boolean(),
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
    seats: Yup.string()
      .max(50, "Location must be no more than 50 characters")
      .required("Last name is required."),
  }),
};
