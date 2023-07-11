import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { EventService } from "../../services";
import { IQueryCityParams, IQueryEventParams } from "../../interfaces";

export class EventOperations {
  static getCities = createAsyncThunk(
    "city/getCities",
    async ({ params }: { params: IQueryCityParams }, { rejectWithValue }) => {
      console.log("try");
      try {
        const { data } = await EventService.getCities(params);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static addCity = createAsyncThunk(
    "city/addCity",
    async (
      { formData, params }: { formData: FormData; params: IQueryCityParams },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await EventService.addCity({ formData, params });
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static updateCity = createAsyncThunk(
    "city/updateCity",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.updateCity(formData);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static deleteCity = createAsyncThunk(
    "city/deleteCity",
    async (
      { cityId, params }: { cityId: string; params: IQueryCityParams },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await EventService.deleteCity({ cityId, params });
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static getEvent = createAsyncThunk(
    "city/getEvent",
    async (
      { cityName, params }: { cityName: string; params: IQueryEventParams },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await EventService.getEvents({ cityName, params });
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static addEvent = createAsyncThunk(
    "city/addEvent",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.addEvent(formData);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static updateEvent = createAsyncThunk(
    "city/updateEvent",
    async (formData: FormData, { rejectWithValue }) => {
      try {
        const { data } = await EventService.updateEvent(formData);
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );

  static deleteEvent = createAsyncThunk(
    "city/deleteEvent",
    async (
      { cityId, eventId }: { cityId: string; eventId: string },
      { rejectWithValue }
    ) => {
      try {
        const { data } = await EventService.deleteEvent({ cityId, eventId });
        return data;
      } catch (error) {
        const err = error as AxiosError;
        return rejectWithValue(
          err.message || "An error occurred with the network"
        );
      }
    }
  );
}
