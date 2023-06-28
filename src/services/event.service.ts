import API from "../config/axios.api.js";
import { IQueryParams } from "../interfaces/index.js";

interface IGetEvents {
  cityName: string;
  params?: IQueryParams;
}

export class EventService {
  static async getCities({ params }: IQueryParams): Promise<any> {
    return API.get("/events/cities/list", { params });
  }

  static async addCity(formData: any) {
    return API.post("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCity(formData: any) {
    return API.patch("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity(cityId: string) {
    return API.delete(`/events/city/${cityId}`);
  }

  static async getEvents({ cityName, params }: IGetEvents): Promise<any> {
    return API.get(`/events/event/${cityName}`, { params });
  }

  static async addEvent(formData: any) {
    return API.post("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateEvent(formData: any) {
    return API.patch("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteEvent({ cityId, eventId }: any) {
    return API.delete(`/events/event/${cityId}/${eventId}`);
  }

  static async getCity({ page = 1, limit = 5 }) {
    return API.get("/events/city", { params: { page, limit } });
  }
}
