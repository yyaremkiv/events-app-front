import * as Yup from "yup";
import dayjs from "dayjs";

export const FormValidation = {
  initialValuesLogin: {
    email: "",
    password: "",
  },
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
    seats: 1,
    price: 1,
    categories: [],
    speakers: [],
    showOnHomePage: false,
    showInCityHome: false,
    isHidden: false,
  },
  initialValuesFilter: {
    query: "",
    dateStart: null,
    dateEnd: null,
    categories: [],
    hasFreePlaces: false,
  },
  initialValuesSpeaker: {
    firstname: "",
    lastname: "",
    age: 1,
    about: "",
    email: "",
    topic: "",
    telephone: "",
  },
  initialValuesCountry: {
    code: "",
    label: "",
    phone: "",
  },
  loginSchema: Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 4 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
  }),
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
    categories: Yup.array()
      .min(1, "Select At Least One Category.")
      .required("Category is required."),
    showOnHomePage: Yup.boolean(),
    showInCityHome: Yup.boolean(),
    isHidden: Yup.boolean(),
  }),
  speakerSchema: Yup.object().shape({
    firstname: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(2, "First Name must be at least 2 characters long.")
      .max(50, "First Name cannot be longer than 50 characters.")
      .required("First Name is required."),
    lastname: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(2, "Last Name must be at least 2 characters long.")
      .max(50, "Last Name cannot be longer than 50 characters.")
      .required("Last Name is required."),
    age: Yup.number()
      .required("Age is required")
      .min(1, "Age must be at least 1")
      .max(100, "Age cannot exceed 100"),
    about: Yup.string()
      .min(6, "About must be at least 6 characters long.")
      .max(200, "About cannot be longer than 200 characters.")
      .required("About is required."),
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 3 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    topic: Yup.string()
      .min(6, "Topic must be at least 6 characters long.")
      .max(200, "Topic cannot be longer than 200 characters.")
      .required("Topic is required."),
    telephone: Yup.string()
      .min(4, "Telephone must be at least 3 characters long.")
      .max(50, "Telephone cannot be longer than 50 characters.")
      .required("Telephone is required"),
  }),
  countrySchema: Yup.object().shape({
    code: Yup.string()
      .min(2, "Code must be at least 2 characters long.")
      .max(6, "Code cannot be longer than 6 characters.")
      .required("Code is required"),
    label: Yup.string()
      .min(2, "Country Name must be at least 2 characters long.")
      .max(50, "Country Name cannot be longer than 50 characters.")
      .required("Country Name is required"),
    phone: Yup.string()
      .min(2, "Phone must be at least 2 characters long.")
      .max(50, "Phone cannot be longer than 50 characters.")
      .required("Phone is required"),
  }),
  searchSchema: Yup.object().shape({
    query: Yup.string(),
    // dateStart: Yup.date(),
    // dateEnd: Yup.date(),
    priceStart: Yup.number(),
    priceEnd: Yup.number(),
    seatsStart: Yup.number(),
    seatsEnd: Yup.number(),
  }),
};
