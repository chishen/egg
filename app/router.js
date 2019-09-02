'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/',controller.home.index);

  // 管理系统接口
  router.post('/manage/postLogin', controller.manage.postLogin); //登录
  router.get('/manage/getData', controller.manage.getData); //获取数据

  //顾家数据接口
  router.get('/kuka/init', controller.kuka.init); //初始化接口
  router.post('/kuka/createUser', controller.kuka.createUser); //创建用户
  router.get('/kuka/getUser', controller.kuka.getUser); //获取用户
  router.get('/kuka/product', controller.kuka.product); //查询产品列表
  router.post('/kuka/addGuest', controller.kuka.addGuest); //新增客户
  router.get('/kuka/guestList', controller.kuka.guestList); //查询客户列表
  router.get('/kuka/userList', controller.kuka.userList); //查询用户列表

  //微信小程序接口
  router.get('/weixin/init', controller.weixin.init); //初始化接口
  router.get('/weixin/getList', controller.weixin.getList); //查询组件列表
  router.get('/weixin/getDetail', controller.weixin.getDetail); //查询组件详情
  router.get('/weixin/getApi', controller.weixin.getApi); //查询组件Api
  router.post('/weixin/postLogin', controller.weixin.postLogin); //管理员登录
  router.post('/weixin/postEditCode', controller.weixin.postEditCode); //编辑代码
  router.post('/weixin/postAddComponent', controller.weixin.postAddComponent); //新增组件
  router.post('/weixin/saveApi', controller.weixin.saveApi); //保存Api
  router.post('/weixin/deleteApi', controller.weixin.deleteApi); //删除Api
  router.post('/weixin/deleteComponent', controller.weixin.deleteComponent); //删除Component
  router.post('/weixin/uploadImage', controller.weixin.uploadImage); //上传效果图
  router.post('/weixin/deleteImage', controller.weixin.deleteImage); //删除效果图
  
  router.get('/api/admin/album', controller.home.album);
  router.get('/api/mini/fansList', controller.mini.fansList);
  // router.verb('path-match', app.controller.action);
  // router.verb('router-name', 'path-match', app.controller.action);
  // router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
  // router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);
  // router.get('/', controller.home.index);
  // router.get('/', 'home.index');
  // router.get('posts', '/api/posts', controller.posts.index);
  // app.router.get(/^\/package\/([\w-.]+\/[\w-.]+)$/, app.controller.posts.new);
};
