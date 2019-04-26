import axios from "axios";

const url = "/api/stations";
class StationService {
  // Get Stations
  static getStation() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
  static async getStationById(id) {
    try {
      const res = await axios.get(`${url}/${id}`);
      const data = res.data;
      return data.map(station => ({
        ...station,
        CreatedAt: new Date(station.CreatedAt)
      }));
    } catch (err) {
      console.error(err);
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
