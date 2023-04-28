import API from "@/http";

class EventService {
  static async addCity(formData) {
    return API.post("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default EventService;
