import { createAsyncThunk } from "@reduxjs/toolkit";
import EventService from "@/services/event.service.js";

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

  static updateCity = createAsyncThunk(
    "city/updateCity",
    async (formData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.updateCity(formData);
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

  static getEvent = createAsyncThunk(
    "city/getEvent",
    async (cityId, { rejectWithValue }) => {
      try {
        const { data } = await EventService.getEvent(cityId);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addEvent = createAsyncThunk(
    "city/addEvent",
    async (formData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.addEvent(formData);
        return data;
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
  );
}

export default CityOperations;
