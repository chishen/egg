'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // config.key = 'EGG_SESS'; // 承载 Session 的 Cookie 键值对名字
  config.maxAge = 86400000; // Session 的最大有效时间
  config.security = {
    csrf: false
  }
  // config.security = {
  //   csrf: {
  //     useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
  //     // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
  //     // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
  //     // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
  //   },
  // },
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1530756840596_8101';

  config.alinode = {
    // 从 `Node.js 性能平台` 获取对应的接入参数
    appid: '81384',
    secret: '31e4d63ff053dfa91ddb721d47b372b3b2fa2c76',
  };

  // add your config here
  config.middleware = [];
  config.mysql = {
    // 单数据库信息配置
    clients: {
      db_kuka: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'chishen',
        // 数据库名
        database: 'kuka',
      },
      db_weixin: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'chishen',
        // 数据库名
        database: 'weixin',
      },
      db_manage: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'chishen',
        // 数据库名
        database: 'manage',
      }
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  return config;
};

