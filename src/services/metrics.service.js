import axios from 'axios';
import authHeader from './auth-header';

const API_URL=process.env.VUE_APP_METRICS_API_URL;

class MetricsService {
  getUsersMetrics() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getUsersMetricsByDate(startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate;
    return axios.get(API_URL + 'users' + queryParams, { headers: authHeader() });
  }

  getTrainingPlansMetrics() {
    return axios.get(API_URL + 'trainings', { headers: authHeader() });
  }

  getTrainingPlansMetricsByDate(startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate;
    return axios.get(API_URL + 'trainings' + queryParams, { headers: authHeader() });
  }

  getTransactionsMetrics() {
    return axios.get(API_URL + 'transactions', { headers: authHeader() });
  }

  getTransactionsMetricsByDate(startDate, endDate) {
    const queryParams = '?from=' + startDate + '&to=' + endDate;
    return axios.get(API_URL + 'transactions' + queryParams, { headers: authHeader() });
  }
}

export default new MetricsService();
