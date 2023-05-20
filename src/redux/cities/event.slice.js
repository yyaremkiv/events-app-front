import { createSlice } from "@reduxjs/toolkit";
import CityOperations from "./city.operations";

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(CityOperations.getCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.getCity.fulfilled, (state, action) => {
      state.cities = action.payload.cities;
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
    builder.addCase(CityOperations.updateCity.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.updateCity.fulfilled, (state, action) => {
      const updatedCity = action.payload;
      const cityIndex = state.cities.findIndex(
        (city) => city._id === updatedCity._id
      );
      if (cityIndex !== -1) {
        state.cities[cityIndex] = updatedCity;
      }
      state.isLoading = false;
    });
    builder.addCase(CityOperations.updateCity.rejected, (state, action) => {
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
    builder.addCase(CityOperations.getEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.getEvent.fulfilled, (state, action) => {
      const { events, eventsParams } = action.payload;
      const cityId = eventsParams.cityId;
      const cityIndex = state.cities.findIndex((city) => city._id === cityId);
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = [...events];
      }
      state.isLoading = false;
    });
    builder.addCase(CityOperations.getEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.addEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.addEvent.fulfilled, (state, action) => {
      const { cityId, events } = action.payload;
      const cityIndex = state.cities.findIndex((city) => city._id === cityId);
      if (cityIndex !== -1) {
        state.cities[cityIndex].events.push(...events);
      }
      state.isLoading = false;
    });
    builder.addCase(CityOperations.addEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.updateEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.updateEvent.fulfilled, (state, action) => {
      const { cityId, events } = action.payload;
      const cityIndex = state.cities.findIndex((city) => city._id === cityId);
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = events;
      }
      state.isLoading = false;
    });
    builder.addCase(CityOperations.updateEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(CityOperations.deleteEvent.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(CityOperations.deleteEvent.fulfilled, (state, action) => {
      const { cityId, events } = action.payload;
      const cityIndex = state.cities.findIndex((city) => city._id === cityId);
      if (cityIndex !== -1) {
        state.cities[cityIndex].events = events;
      }
      state.isLoading = false;
    });
    builder.addCase(CityOperations.deleteEvent.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default eventSlice.reducer;
