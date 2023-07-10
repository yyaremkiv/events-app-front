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
import { isEqual } from "lodash";

const arrToStr = (items: ICategoryItem[]) => {
  return items.map(({ label }) => label).join(",");
};

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
    ...FormValidation.initialValuesFilter,
  };

  const handleSubmitEvent = (values: IFormikValues): void => {
    const areEqual = isEqual(values, initialValuesFilter);
    if (areEqual) return;

    const {
      query,
      dateStart,
      dateEnd,
      priceMin,
      priceMax,
      seatsMin,
      seatsMax,
      categories,
      hasFreePlaces,
    } = values;

    const queryParams: any = { hasFreePlaces };
    if (query) queryParams.query = query;
    if (dateStart) queryParams.dateStart = dateStart;
    if (dateEnd) queryParams.dateEnd = dateEnd;
    if (priceMin) queryParams.priceMin = priceMin;
    if (priceMax) queryParams.priceMax = priceMax;
    if (seatsMin) queryParams.seatsMin = seatsMin;
    if (seatsMax) queryParams.seatsMax = seatsMax;
    if (categories.length > 0) queryParams.categories = arrToStr(categories);

    handleFetchByFilter(queryParams);
  };

  const handleClearForm = ({ setFieldValue, resetForm }: any) => {
    setFieldValue("categories", []);
    handleClearFilter();
    resetForm();
  };

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
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
