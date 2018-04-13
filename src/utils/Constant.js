const protocol = 'http://';
const ip = 'localhost:';
const port = '8888/';
const prefix = protocol + ip + port;

module.exports = {
  // Login page
  logoImage: '/src/assets/logo.jpg',
  systemName: 'XJS 管理系统',
  // Index page header
  systemInfo: 'XJS Admin V1.0.0',
  //API
  URL: {
    userLogin: `${prefix}user/login.ajax`,
    userInfo: `${prefix}user/getUserInfo.ajax`
  }
};
