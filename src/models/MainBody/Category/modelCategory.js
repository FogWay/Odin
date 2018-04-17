import { notification } from 'antd';
import * as services from '../../../services/serviceCategory';

export default {

  namespace: 'category',

  state: {
    addButtonLoading: false,
    dataSource: [],
    total: 0,
    currentPage: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'e_queryCategory' });
    }
  },

  effects: {
    * e_addCategory({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(services.addNewCategory, payload);
        if (data.dataCode === 200) {
          notification.success({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
          });
          yield put({ type: 'e_queryCategory' });
        } else {
          notification.error({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 },
          });
        }
        yield put({ type: 'r_updateState', payload: { addButtonLoading: false } });
      } catch (err) {
        yield put({ type: 'r_updateState', payload: { addButtonLoading: false } });
        console.log(err);
      }
    },
    * e_deleteCategory({ payload }, { select, call, put }) {
      try {
        const { data } = yield  call(services.deleteCategory, payload);
        if (data.dataCode === 200) {
          notification.success({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
          });
          yield put({ type: 'category/e_queryCategory' });
        } else {
          notification.error({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    * e_updateCategory({ payload }, { select, call, put }) {
      try {
        const { data } = yield  call(services.updateCategory, payload);
        if (data.dataCode === 200) {
          notification.success({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
          });
          yield put({ type: 'category/e_queryCategory' });
        } else {
          notification.error({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    * e_queryCategory({ payload }, { select, call, put }) {
      try {
        const pageInfo = {
          pageIndex: yield select((state) => state.category.currentPage)
        };
        const { data } = yield call(services.queryCategory, pageInfo);
        if (data.dataCode === 200) {
          yield put({
            type: 'r_updateState',
            payload: {
              total: data.data.page.counts,
              dataSource: data.data.kindList
            }
          });
        } else {
          notification.error({
            message: 'Notification Message',
            description: data.meta.message,
            placement: 'topLeft',
            style: { width: 300 }
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
  },

};
