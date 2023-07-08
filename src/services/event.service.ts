import API from "../config/axios.api.js";
import { IQueryParams } from "../interfaces/index.js";
import { AxiosResponse } from "axios";

import { ICityItem } from "../interfaces/index.js";

interface IGetEvents {
  cityName?: string;
  params: IQueryParams;
}

interface IGetSingleEvent {
  cityName: string;
  eventName: string;
}

interface IGetCitiesResponse {
  cities: ICityItem[];
  searchParams: any;
  totalCities: number;
}

export class EventService {
  static async getCities(
    params: IQueryParams
  ): Promise<AxiosResponse<IGetCitiesResponse>> {
    return API.get("/city", { params });
  }

  static async addCity({ formData, params }: any) {
    return API.post("/city", formData, {
      params,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCity({ formData }: any) {
    return API.patch("/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity({ cityId, params }: any) {
    return API.delete(`/city/${cityId}`, { params });
  }

  static async getEvents({ cityName, params }: IGetEvents): Promise<any> {
    return API.get(cityName ? `/event/${cityName}` : "/event", { params });
  }

  static async getSingleEvent({
    cityName,
    eventName,
  }: IGetSingleEvent): Promise<any> {
    return API.get(`/event/${cityName}/${eventName}`);
  }

  static async addEvent(formData: any) {
    return API.post("/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateEvent(formData: any) {
    return API.patch("/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteEvent({ cityId, eventId }: any) {
    return API.delete(`/event/${cityId}/${eventId}`);
  }
}
