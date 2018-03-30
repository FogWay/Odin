// import { routerRedux } from 'dva/router';
// import * as services from '../services/serviceLogin';

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
    }
  },

  effects: {},

  reducers: {
    r_setCollapseStatus(state, { payload }) {
      return { state, ...payload };
    }
  }

};
