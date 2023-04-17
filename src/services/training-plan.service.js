import axios from 'axios';
import authHeader from './auth-header';

const API_URL=process.env.VUE_APP_TRAINING_API_URL;

class TrainingPlanService {
  getTrainingPlanList() {
    return axios.get(API_URL + 'trainings/', { headers: authHeader() });
  }

  getTrainingPlanInfoById(planId) {
    return axios.get(API_URL + 'trainings/' + planId, { headers: authHeader() });
 }
}

export default new TrainingPlanService();
