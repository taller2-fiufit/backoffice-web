import axios from 'axios'
import authHeader from './auth-header'

const API_URL = process.env.VUE_APP_API_URL

class MetricsService {
  getUsersMetricsByDate (startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate
    return axios.get(API_URL + 'metrics/users' + queryParams, { headers: authHeader() })
  }

  getTrainingPlansMetricsByDate (startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate
    return axios.get(API_URL + 'metrics/trainings/events/trainingCreated/' + queryParams, { headers: authHeader() })
  }
}

export default new MetricsService()
