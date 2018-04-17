import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/Constant';

const { user_login } = URL;

export async function login(params) {
  return request(user_login, {
    method: 'POST',
    body: qs.stringify(params)
  });
}
