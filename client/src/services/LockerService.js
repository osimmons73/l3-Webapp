import axios from "axios";

const url = "/api/lockers";

class LockerService {
  // Get Lockers
  static async getLocker() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {
      conole.error(error);
    }
  }
  // Get Locker by Id
  static async getLockersBySchoolId(id) {
    try {
      const res = await axios.get(`${url}/${id}`);
      const data = res.data;
      return data.map(locker => ({
        ...locker,
        CreatedAt: new Date(locker.CreatedAt)
      }));
    } catch (error) {
      throw error;
    }
  }

  // Create Locker
  static async insertLocker(stationId, lockerName) {
    return await axios.post(url, {
      stationId,
      lockerName
    });
  }
  // Delete Locker
  static deleteLocker(id) {
    return axios.delete(`${url}/${id}`);
  }
}

export default LockerService;
