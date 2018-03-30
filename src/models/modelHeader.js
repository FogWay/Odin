// import { routerRedux } from 'dva/router';
// import * as services from '../services/serviceLogin';

export default {

  namespace: 'header',

  state: {
    collapsed: false,
    isFullScreen: false
  },

  subscriptions: {
    setup({ dispatch, history }) {
    }
  },

  effects: {},

  reducers: {
    r_setCollapseStatus(state, { payload }) {
      return { state, ...payload };
    },
    r_setScreenStatus(state, { payload }) {
      return { state, ...payload };
    }
  }

};
