import API from "../config/axios.api.js";
import { AxiosResponse } from "axios";
import {
  ICityItem,
  IEventItem,
  IQueryCityParams,
  IQueryEventParams,
  ICityDataResponse,
  IEventDataResponse,
} from "../interfaces";

export class EventService {
  static async getCities(
    params: IQueryCityParams
  ): Promise<AxiosResponse<ICityDataResponse>> {
    return API.get("/city", { params });
  }

  static async addCity({
    formData,
    params,
  }: {
    formData: FormData;
    params: IQueryCityParams;
  }): Promise<AxiosResponse<ICityDataResponse>> {
    return API.post("/city", formData, {
      params,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCity(
    formData: FormData
  ): Promise<AxiosResponse<ICityItem>> {
    return API.patch("/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity({
    cityId,
    params,
  }: {
    cityId: string;
    params: IQueryCityParams;
  }): Promise<AxiosResponse<ICityDataResponse>> {
    return API.delete(`/city/${cityId}`, { params });
  }

  static async getEvents({
    cityName,
    eventName,
    params,
  }: {
    cityName?: string;
    eventName?: string;
    params: IQueryEventParams;
  }): Promise<AxiosResponse<IEventDataResponse>> {
    let url = "/event";
    if (cityName && !eventName) url = `/event/${cityName}`;
    if (cityName && eventName) url = `/event/${cityName}/${eventName}`;

    return API.get(url, { params });
  }

  static async addEvent(
    formData: FormData
  ): Promise<AxiosResponse<IEventDataResponse>> {
    return API.post("/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateEvent(
    formData: FormData
  ): Promise<AxiosResponse<IEventItem>> {
    return API.patch("/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteEvent({
    cityId,
    eventId,
  }: {
    cityId: string;
    eventId: string;
  }): Promise<AxiosResponse<IEventDataResponse>> {
    return API.delete(`/event/${cityId}/${eventId}`);
  }
}
