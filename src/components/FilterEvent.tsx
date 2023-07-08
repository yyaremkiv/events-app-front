import { Formik } from "formik";
import {
  FormikDate,
  FormikSlider,
  FormikTextField,
  FormikAutocomplete,
  CustomLoadingButton,
} from "./";
import { ICategoryItem } from "../interfaces";
import { FormValidation } from "../config";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface IFormikValues {
  query: string;
  dateStart: string;
  dateEnd: string;
  priceMin: number;
  priceMax: number;
  seatsMin: number;
  seatsMax: number;
  categories: ICategoryItem[] | [];
  hasFreePlaces: boolean;
}
interface IFilterEventProps {
  data: any;
  handleFetchByFilter: any;
  handleClearFilter: any;
  isLoading?: boolean;
}

export const FilterEvent = ({
  data,
  handleFetchByFilter,
  handleClearFilter,
  isLoading = false,
}: IFilterEventProps): JSX.Element => {
  const { seatsMin, seatsMax, priceMin, priceMax, categories } = data;
  const theme = useTheme();

  const initialValuesFilter = {
    ...data,
    query: "",
    dateStart: null,
    dateEnd: null,
    categories: [],
    hasFreePlaces: false,
  };

  const handleSubmitEvent = (values: IFormikValues): void => {
    const queryParams = { ...values };
    handleFetchByFilter(queryParams);
  };

  const handleClearForm = ({ setFieldValue, resetForm }: any) => {
    setFieldValue("categories", []);
    handleClearFilter();
    resetForm();
  };

  return (
    <Box sx={{ padding: "0 2rem 2rem 0", color: theme.palette.text.primary }}>
      <Formik
        onSubmit={handleSubmitEvent}
        initialValues={initialValuesFilter}
        validationSchema={FormValidation.searchSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
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
              label="Search"
              name="query"
              formikFunc={{ values, errors, touched, handleBlur, handleChange }}
              isLoading={isLoading}
            />

            <FormikDate
              label="Date Start"
              name="dateStart"
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <FormikDate
              label="Date End"
              name="dateEnd"
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <FormikAutocomplete
              label="Set category"
              changeFieldName="categories"
              options={categories}
              formikFunc={{ values, errors, touched, setFieldValue }}
              isLoading={isLoading}
            />

            <Box>
              <Typography sx={{ marginBottom: "0.5rem", textAlign: "center" }}>
                Seats:
              </Typography>
              <FormikSlider
                label={["Seats min", "Seats max"]}
                name={["seatsMin", "seatsMax"]}
                value={[seatsMin, seatsMax]}
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                }}
                isLoading={isLoading}
              />
            </Box>

            <Box>
              <Typography sx={{ marginBottom: "0.5rem", textAlign: "center" }}>
                Price:
              </Typography>
              <FormikSlider
                label={["Price min", "Price max"]}
                name={["priceMin", "priceMax"]}
                value={[priceMin, priceMax]}
                formikFunc={{
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                }}
                isLoading={isLoading}
              />
            </Box>

            <FormControlLabel
              control={<Checkbox />}
              label="Free places"
              checked={values.hasFreePlaces}
              disabled={isLoading}
              onChange={() =>
                setFieldValue("hasFreePlaces", !values.hasFreePlaces)
              }
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
                padding: "0 3rem",
              }}
            >
              <CustomLoadingButton text="Search Event" isLoading={isLoading} />
              <LoadingButton
                type="button"
                variant="contained"
                loading={isLoading}
                onClick={() => handleClearForm({ resetForm, setFieldValue })}
                sx={{ textTransform: "none" }}
              >
                Clear Filter
              </LoadingButton>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
