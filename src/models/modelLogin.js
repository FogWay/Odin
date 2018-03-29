import { routerRedux } from 'dva/router';
import { message } from 'antd';
import * as services from '../services/serviceLogin';

export default {

  namespace: 'login',

  state: {
    defaultUsername: localStorage.getItem('defaultUsername') || '',
    loginLoading: false,
    remember: true,
  },

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {
    * e_login({ payload }, { select, call, put }) {
      try {
        yield put({ type: 'login/r_setSpinStatus', payload: { loginLoading: true } });
        const { data } = yield call(services.login, payload);

        if (data.code === 200) {
          const remember = yield select(state => state.login.remember);
          const currentUsername = localStorage.getItem('defaultUsername');
          // 用户名输入框缺省值设定
          if (remember) {
            localStorage.setItem('defaultUsername', payload.username);
          } else if (currentUsername === payload.username) {
            localStorage.removeItem('defaultUsername');
          }
          // 设置路由跳转权限
          sessionStorage.setItem('loginStatus', 'true');
          yield put(routerRedux.push('/home'));
        } else {
          message.error(data.message, 0.8)
        }

        yield put({ type: 'r_setSpinStatus', payload: { loginLoading: false } });
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    r_setRemember(state, { payload }) {
      return { ...state, ...payload };
    },
    r_setSpinStatus(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
