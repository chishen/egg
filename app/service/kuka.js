'use strict';

const Service = require('egg').Service;

class KukaService extends Service {
  constructor(ctx) {
    super(ctx);
    this.KUKA = this.app.mysql.get('db_kuka');
  };
  async createTable(tableName, sql) {
    let res = await this.KUKA.query(`SHOW TABLES LIKE '${tableName}'`);
    if (!res.length) {
      const result = await this.KUKA.query(sql);
    }
    return
  }
  //创建用户
  async createUser(params) {
    await this.createTable('user', `CREATE TABLE user 
    (user_id INT(8) NOT NULL auto_increment,
    nickName VARCHAR(255)NOT NULL,
    avatarUrl VARCHAR(255)NOT NULL,
    gender VARCHAR(255)NOT NULL,
    city VARCHAR(255)NOT NULL,
    province VARCHAR(255)NOT NULL,
    country VARCHAR(255)NOT NULL,
    language VARCHAR(255)NOT NULL,
    PRIMARY KEY  (user_id))`);
    let result = await this.KUKA.get('user', { nickName: params.nickName });
    if (!result) {
      result = await this.KUKA.insert('user', {
        nickName: params.nickName,
        avatarUrl: params.avatarUrl,
        gender: params.gender,
        city: params.city,
        province: params.province,
        country: params.country,
        language: params.language
      })
      if (result.affectedRows === 1) {
        let data = await this.KUKA.get('user', { nickName: params.nickName })
        result = {
          code: 200,
          data: data,
          msg: ''
        }
      } else {
        result = {
          code: 500,
          msg: '数据存储失败'
        }
      }
    } else {
      let data = await this.KUKA.get('user', { nickName: params.nickName })
      result = {
        code: 200,
        data: data,
        msg: '已存在该用户'
      }
    }
    return result
  }
  //获取用户
  async getUser(name) {
    let detail = await this.KUKA.select('user', {
      where: {
        nickName: name
      },
      columns: ['user_id']
    });
    if (detail.length) {
      return {
        code: '0000',
        msg: null,
        user_id: detail[0].user_id
      }
    } else {
      return {
        code: '0001',
        msg: '未查到该用户'
      }
    }
  }
  //查询产品列表
  async product(name) {
    let sql = 'select * from kuka where `product` like "%' + name + '%"';
    if (!name) {
      sql = 'select * from kuka limit 100';
    }
    // const sql = 'SELECT `no`, product, `name`, format, size, shelf_size, height, model, type, high_price, `table`, source, material, bed_box, foot_color, color, info FROM kuka';
    const result = await this.KUKA.query(sql);
    return { result };
  }
  //新增客户
  async addGuest(params) {
    await this.createTable('guest', `CREATE TABLE guest 
    (guest_id INT(8)NOT NULL auto_increment,
    name VARCHAR(255)NOT NULL,
    sex VARCHAR(255)NOT NULL,
    phone VARCHAR(255)NOT NULL,
    address VARCHAR(255)NOT NULL,
    msg VARCHAR(255),
    user_id INT(8)NOT NULL,
    user_name VARCHAR(255)NOT NULL,
    PRIMARY KEY (guest_id))`);
    let result = await this.KUKA.get('guest', { user_id: params.user_id, name: params.name });
    if (!result) {
      result = await this.KUKA.insert('guest', {
        name: params.name,
        sex: params.sex,
        phone: params.phone,
        address: params.address,
        msg: params.msg,
        user_id: params.user_id,
        user_name: params.user_name
      })
      if (result.affectedRows === 1) {
        let data = await this.KUKA.get('guest', { user_id: params.user_id, name: params.name })
        result = {
          code: 200,
          data: data,
          msg: ''
        }
      } else {
        result = {
          code: 500,
          msg: '数据存储失败'
        }
      }
    } else {
      let data = await this.KUKA.get('guest', { user_id: params.user_id, name: params.name })
      result = {
        code: 200,
        data: data,
        msg: '已存在该客户'
      }
    }
    return result
  }
  //查询客户列表
  async guestList(user_id) {

  }
  //查询客户列表
  async userList(user_id) {
    let result;
    console.log(user_id)
    if (user_id === 1 || user_id === 2) {
      result = await this.KUKA.select('user');
    }else {
      result = []
    }
    return result
  }
}

module.exports = KukaService;
