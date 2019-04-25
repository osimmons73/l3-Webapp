import axios from "axios";

const url = "api/schools";

class SchoolService {
  // Get Schools
  static async getSchools() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data.map(school => ({
        ...school,
        CreatedAt: new Date(school.CreatedAt)
      }));
    } catch (error) {
      console.error(error);
    }
  }

  // Create School
  static insertSchool(name, emailDomain) {
    return axios.post(url, {
      name,
      emailDomain
    });
  }
  // Delete School
  static deleteSchool(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default SchoolService;
