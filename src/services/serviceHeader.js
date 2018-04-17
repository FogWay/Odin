import request from '../utils/request';
import qs from 'querystring';

import { URL } from '../utils/Constant';

const { user_info } = URL;

export async function getUserInfo() {
  return request(user_info, {
    method: 'POST',
    body: qs.stringify({})
  });
}
