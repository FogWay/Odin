const protocol = 'http://';
const ip = 'localhost:';
const port = '8888/';
const prefix = protocol + ip + port ;


module.exports = {
  logo: '/src/assets/logo.jpg',
  name: 'XJS 管理系统',
  URL:{
    userLogin: `${prefix}user/login.ajax`
  }
};
