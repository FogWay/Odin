import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/Constant';

const { get_all_category, add_repository, delivery_repository, delivery_again_repository, query_repository } = URL;

export async function getAllCategory(params) {
  return request(get_all_category, {
    method: 'POST'
  });
}

export async function addNewRepository(params) {
  return request(add_repository, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function deliveryRepository(params) {
  return request(delivery_repository, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function deliveryAgainRepository(params) {

  return request(delivery_again_repository, {
    method: 'POST',
    body: qs.stringify(params)
  });
}

export async function queryRepository(params) {
  return request(query_repository, {
    method: 'POST',
    body: qs.stringify(params)
  });
}
