import { routerRedux } from 'dva/router';
import { notification } from 'antd';
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
        if (data.dataCode === 200) {
          const isRemember = yield select(state => state.login.isRemember);
          const currentUsername = localStorage.getItem('defaultUsername');
          if (isRemember) {
            localStorage.setItem('defaultUsername', payload.loginName);
          } else if (currentUsername === payload.loginName) {
            localStorage.removeItem('defaultUsername');
          }
          sessionStorage.setItem('loginStatus', 'true');
          notification.success({
            message: 'Notification Message',
            description: '登录成功',
            placement: 'topLeft',
            duration: 1,
            style: { width: 300 }
          });
          yield put(routerRedux.push('/index/category'));
        } else {
          // Login failed
          notification.error({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            duration: 1,
            style: { width: 300 }
          });
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
