import axios from 'axios'

class Api {
  constructor() {
    this.ApiURL = process.env.VUE_APP_API_URL
  }

  login(data) {
    return axios.post(this.ApiURL + "/api/user/login", data);
  }

  register(data) {
    return axios.post(this.ApiURL + "/api/user/signup", data);
  }

  setAuthorisationToken(token) {
    axios.defaults.headers.common['Authorization'] = token
  }

  removeAuthorisationToken() {
    delete axios.defaults.headers.common['Authorization']
  }

  getServices() {
    return axios.get(this.ApiURL + "/services");
  }
}

export default new Api();
