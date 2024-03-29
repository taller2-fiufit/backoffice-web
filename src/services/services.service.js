import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.VUE_APP_API_URL

class ServicesService {
  registerNewService (service) {
    return axios.post(API_URL + 'services', service, { headers: authHeader() })
  }

  getServiceList (blocked, up) {
    const queryParams = '?offset=0' + (blocked === '-' ? '' : '&blocked=' + blocked) + (up === '-' ? '' : '&up=' + up)
    return axios.get(API_URL + 'services' + queryParams, { headers: authHeader() })
  }

  getServiceById (serviceId) {
    return axios.get(API_URL + 'services/' + serviceId, { headers: authHeader() })
  }

  getServiceCount () {
    return axios.get(API_URL + 'services/count', { headers: authHeader() })
  }

  blockService (serviceId) {
    return axios.patch(API_URL + 'services/' + serviceId,
      { blocked: true },
      { headers: authHeader() })
  }

  unblockService (serviceId) {
    return axios.patch(API_URL + 'services/' + serviceId,
      { blocked: false },
      { headers: authHeader() })
  }

  deleteService (serviceId) {
    return axios.delete(API_URL + 'services/' + serviceId, { headers: authHeader() })
  }
}

export default new ServicesService()
