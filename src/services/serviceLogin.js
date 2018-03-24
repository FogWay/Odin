import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/config';

const { userLogin } = URL;

export async function login(params) {
  return request(userLogin, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    method: 'POST',
    body: qs.stringify(params)
  });
}
