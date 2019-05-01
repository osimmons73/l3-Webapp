import axios from "axios";

const STATION_USER_BASE_URL = "/api/users/stations/";
const LOCKER_BASE_URL = "/api/users/lockers/";
class UserService {
  // Get All User-Station Mappings
  static async getAllUsersStations() {
    try {
      const res = await axios.get(`${STATION_USER_BASE_URL}/all`);
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
  // Get My User-Station Mapping
  static async getMyStation(id) {
    try {
      const res = await axios.get(`${STATION_USER_BASE_URL}${id.userId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  // Create My User-Station Mapping
  static insertMyUserStation(userId, stationId) {
    return axios.post(STATION_USER_BASE_URL, {
      userId,
      stationId
    });
  }
  // Delete User-Station Mapping
  static deleteMyUserStation(id) {
    return axios.delete(`${STATION_USER_BASE_URL}${id}`);
  }

  // Get All User-Locker Mappings
  static async getAllUsersLockers() {
    try {
      const res = await axios.get(`${LOCKER_BASE_URL}all`);
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }
  // Get My User-Locker Mapping
  static async getMyLocker(userId, lockerId) {
    try {
      const res = await axios.get(LOCKER_BASE_URL, {
        userId,
        lockerId
      });
      const data = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create My User-Locker Mapping
  static async insertMyUserLocker(userId, schoolId, stationId, lockerId) {
    return await axios.post(LOCKER_BASE_URL, {
      userId,
      schoolId,
      stationId,
      lockerId
    });
  }

  // Delete User-Station Mapping
  static async deleteMyUserLocker(id) {
    return await axios.delete(`${LOCKER_BASE_URL}${id}`);
  }
}

export default UserService;
