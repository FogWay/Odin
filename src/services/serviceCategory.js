import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/Constant';

const { add_category, delete_category, update_category, query_category } = URL;

export async function addNewCategory(params) {
  return request(add_category, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function deleteCategory(params) {
  return request(delete_category, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function updateCategory(params) {

  return request(update_category, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function queryCategory(params) {
  return request(query_category, {
    method: 'POST',
    body: qs.stringify(params)
  });
}
