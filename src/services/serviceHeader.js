import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/Constant';

const { userInfo } = URL;

export async function getUserInfo() {
  return request(userInfo, {
    method: 'POST'
  });
}
