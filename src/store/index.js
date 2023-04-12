import { createStore } from 'vuex';
import { auth } from './auth.module';
import { sidebar } from './sidebar-module';

const store = createStore({
  modules: {
    auth,
    sidebar
  }
});

export default store;
