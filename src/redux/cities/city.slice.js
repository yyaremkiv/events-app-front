import { createSlice } from "@reduxjs/toolkit";
import CityOperations from "./city.operations";

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(CityOperations.getCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.getCity.fulfilled, (state, action) => {
      state.cities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.getCity.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.addCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.addCity.fulfilled, (state, action) => {
      state.cities = [...state.cities, action.payload];
      state.isLoading = false;
    });
    builder.addCase(CityOperations.addCity.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.deleteCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.deleteCity.fulfilled, (state, action) => {
      state.cities = state.cities.filter((city) => city._id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(CityOperations.deleteCity.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default citiesSlice.reducer;
