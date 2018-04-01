import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/constant';

const { userInfo } = URL;

export async function getUserInfo() {
  return request(userInfo, {
    method: 'POST'
  });
}
