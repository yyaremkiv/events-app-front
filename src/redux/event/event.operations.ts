import { createAsyncThunk } from "@reduxjs/toolkit";
import { EventService } from "../../services";

export class EventOperations {
  static getCity = createAsyncThunk(
    "city/getCity",
    async ({ limit = 10 }: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.getCity({ limit });
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addCity = createAsyncThunk(
    "city/addCity",
    async (formData: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.addCity(formData);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static updateCity = createAsyncThunk(
    "city/updateCity",
    async (formData: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.updateCity(formData);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static deleteCity = createAsyncThunk(
    "city/deleteCity",
    async (cityId: string, { rejectWithValue }) => {
      try {
        const { data } = await EventService.deleteCity(cityId);
        return data;
      } catch (err: any) {
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
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static addEvent = createAsyncThunk(
    "city/addEvent",
    async (formData: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.addEvent(formData);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static updateEvent = createAsyncThunk(
    "city/updateEvent",
    async (formData: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.updateEvent(formData);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  static deleteEvent = createAsyncThunk(
    "city/deleteEvent",
    async ({ cityId, eventId }: any, { rejectWithValue }) => {
      try {
        const { data } = await EventService.deleteEvent({ cityId, eventId });
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );
}
