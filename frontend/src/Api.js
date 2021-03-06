import axios from 'axios'

class Api {
  constructor() {
    this.websiteURL = process.env.VUE_APP_API_URL
    this.ApiURL = this.websiteURL + '/api'
    let token = localStorage.getItem('token')
    if (token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

  }

  login(data) {
    return axios.post(this.ApiURL + "/user/login", data);
  }

  register(data) {
    return axios.post(this.ApiURL + "/user/signup", data);
  }

  getUserInfos() {
    return axios.get(this.ApiURL + "/user/checkProfile")
  }

  setAuthorisationToken(token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  removeAuthorisationToken() {
    delete axios.defaults.headers.common['Authorization']
  }


  getServices() {
    return axios.get(this.ApiURL + "/services")
  }

  getApplets() {
    return axios.get(this.ApiURL + "/applet")
  }

  getActivitys() {
    return axios.get(this.ApiURL + "/activity")
  }

  postActivateApplet(triggerId, active) {
    return axios.post(this.ApiURL + "/applet/activate", {triggerId, active});
  }
  postNewApplet(trigger, reaction) {
    return axios.post(this.ApiURL + "/applet", {trigger, reaction}, {headers: {'content-type': 'application/json'}})
  }
}

export default new Api();
