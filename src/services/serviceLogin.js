import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/config';

const { userLogin } = URL;

export async function login(params) {
  return request(userLogin, {
    method: 'POST',
    body: qs.stringify(params)
  });
}
