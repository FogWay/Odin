import { notification } from 'antd';
import * as services from '../../services/serviceHeader';

export default {

  namespace: 'header',

  state: {
    collapsed: false,
    userName: 'Jayden Deng',
    authName: '管理员',
    account: '676081195'
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // dispatch({ type: 'e_getUserInfo' });
    }
  },

  effects: {
    * e_getUserInfo({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(services.getUserInfo);
        if (data.code === 200) {
          yield put({
            type: 'r_updateState',
            payload: {
              account: data.data.account,
              userName: data.data.userName,
              authName: data.data.authName
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  },

  reducers: {
    r_updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }

};
