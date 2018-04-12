import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as services from '../../services/serviceLogin';

export default {

  namespace: 'login',

  state: {
    defaultUsername: localStorage.getItem('defaultUsername') || '',
    loginLoading: false,
    isRemember: true
  },

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {
    * e_login({ payload }, { select, call, put }) {
      try {
        yield put({ type: 'r_updateState', payload: { loginLoading: true } });
        // Login request
        const { data } = yield call(services.login, payload);
        // Login successfully
        if (data.code === 200) {
          const isRemember = yield select(state => state.login.isRemember);
          const currentUsername = localStorage.getItem('defaultUsername');
          if (isRemember) {
            localStorage.setItem('defaultUsername', payload.username);
          } else if (currentUsername === payload.username) {
            localStorage.removeItem('defaultUsername');
          }
          sessionStorage.setItem('loginStatus', 'true');
          yield put(routerRedux.push('/home'));
        } else {
          // Login failed
          message.error(data.message, 0.8)
        }
        yield put({ type: 'r_updateState', payload: { loginLoading: false } });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    r_updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
