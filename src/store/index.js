import { createStore } from 'vuex';
import { auth } from './auth.module';
import { userModule } from './user.module';

const store = createStore({
  modules: {
    auth,
    userModule
  }
});

export default store;
