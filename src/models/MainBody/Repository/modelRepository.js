import { notification } from 'antd';
import * as services from '../../../services/serviceRepository';

export default {

  namespace: 'repository',

  state: {
    allCategory: [],
    addButtonLoading: false,
    dataSource: [],
    total: 0,
    currentPage: 1
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'e_getAllCategory' });
      dispatch({ type: 'e_queryRepository' });
    }
  },

  effects: {
    * e_getAllCategory({ payload }, { select, call, put }) {
      try {
        const { data } = yield call(services.getAllCategory, payload);
        yield put({ type: 'r_updateState', payload: { allCategory: data.data.kindList } });
      } catch (err) {
        console.log(err);
      }
    },
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
    * e_queryRepository({ payload }, { select, call, put }) {
      try {
        const pageInfo = {
          pageIndex: yield select((state) => state.category.currentPage)
        };
        const { data } = yield call(services.queryRepository, pageInfo);
        if (data.dataCode === 200) {
          yield put({
            type: 'r_updateState',
            payload: {
              total: data.data.page.counts,
              dataSource: data.data.voList
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
  }
  ,

  reducers: {
    r_updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
  ,

}
;
