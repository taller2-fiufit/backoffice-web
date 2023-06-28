import axios from 'axios'
import authHeader from './auth-header'

const USERS_API_URL = process.env.VUE_APP_USER_METRICS_API_URL
const TRAININGS_API_URL = process.env.VUE_APP_TRAINING_METRICS_API_URL

class MetricsService {
  getUsersMetricsByDate (startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate
    return axios.get(USERS_API_URL + 'users' + queryParams, { headers: authHeader() })
  }

  getTrainingPlansMetricsByDate (startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate
    return axios.get(TRAININGS_API_URL + queryParams, { headers: authHeader() })
  }
}

export default new MetricsService()
