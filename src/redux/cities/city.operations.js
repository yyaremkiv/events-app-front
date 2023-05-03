import { createAsyncThunk } from "@reduxjs/toolkit";
import EventService from "@/services/EventService";

class CityOperations {
  static getCity = createAsyncThunk(
    "city/getCity",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await EventService.getCity();
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addCity = createAsyncThunk(
    "city/addCity",
    async (formData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.addCity(formData);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static deleteCity = createAsyncThunk(
    "city/deleteCity",
    async (cityId, { rejectWithValue }) => {
      try {
        const { data } = await EventService.deleteCity(cityId);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
}

export default CityOperations;
