const protocol = 'http://';
const ip = '192.168.1.100:';
const port = '8420';
const prefix = protocol + ip + port + '/skye-ward/';

module.exports = {
  // Login page
  logoImage: '/src/assets/logo.jpg',
  systemName: 'XJS Admin',
  // Index page header
  systemInfo: 'XJS Admin V1.0.0',
  //API
  URL: {
    // Login page
    user_login: `${prefix}api/user/login.ajax`,
    //Index header
    user_info: `${prefix}api/kind/createKind.ajax`,

    // Category Management
    add_category: `${prefix}api/kind/createKind.ajax`,
    delete_category: `${prefix}api/kind/deleteKindById.ajax`,
    update_category: `${prefix}api/kind/updateKindById.ajax`,
    query_category: `${prefix}api/kind/queryKindByCondition.ajax`,

    // Repository Management
    get_all_category: `${prefix}api/kind/queryAllKind.ajax`,
    add_repository: `${prefix}api/dozen/createDozen.ajax`,
    delivery_repository: `${prefix}api/dozen/stockOut.ajax`,
    delivery_again_repository: `${prefix}api/dozen/oldStockOut.ajax`,
    query_repository: `${prefix}api/dozen/queryDozenByCondition.ajax`,
  }
};
