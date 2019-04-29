import axios from "axios";

const url = "/api/stations";
class StationService {
  // Get Stations
  static async getStation() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
  static async getStationById(id) {
    try {
      const res = await axios.get(`${url}/${id}`);
      const data = res.data;
      return data.map(station => ({
        ...station,
        CreatedAt: new Date(station.CreatedAt)
      }));
    } catch (error) {
      throw error;
    }
  }
  // Create Station
  static insertStation(schoolId, name) {
    return axios.post(url, {
      schoolId,
      name
    });
  }
  // Delete Station
  static deleteStation(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default StationService;
