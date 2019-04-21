import axios from "axios";

const STATION_USER_BASE_URL = "api/users/stations";
const LOCKER_BASE_URL = "api/users/lockers";
class UserService {
  // Get All User-Station Mappings
  static getAllUsersStations() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${STATION_USER_BASE_URL}/all`);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
  // Get My User-Station Mapping
  static getMyStation(userId, stationId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(STATION_USER_BASE_URL, {
          userId,
          stationId
        });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
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
  static getAllUsersLockers() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${LOCKER_BASE_URL}/all`);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
  // Get My User-Locker Mapping
  static getMyLocker(userId, lockerId) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(LOCKER_BASE_URL, {
          userId,
          lockerId
        });
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
  // Create My User-Locker Mapping
  static insertMyUserLocker(userId, lockerId) {
    return axios.post(LOCKER_BASE_URL, {
      userId,
      lockerId
    });
  }
  // Delete User-Station Mapping
  static deleteMyUserLocker(id) {
    return axios.delete(`${LOCKER_BASE_URL}${id}`);
  }
}

export default UserService;
