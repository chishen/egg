'use strict';

exports.index = async ctx => {
  ctx.body = 'index';
};

exports.fansList = async ctx => {
  console.log(ctx.query)
  const data = {
    code: 200,
    msg: '',
    result: {
      curPage: 1,
      pageSize: 10,
      resultList: [{
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师1',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师1',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师1',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      }, {
        avatar: 'https://assets.51wakeup.com/images/20180403102218OFuXRYgk72WsAEni9E.jpg',
        gmtCreate: '2018-06-12',
        nikeName: '李老师2',
      },
      ],
      totalItem: 14,
      totalPage: 2,
    },
  };
  const result = {
    code: 200,
    msg: '',
    result: {
      curPage: 1,
      pageSize: 10,
      resultList: data.result.resultList.slice((parseInt(ctx.query.curPage) - 1) * 10, parseInt(ctx.query.curPage) * 10),
      totalItem: 14,
      totalPage: 2,
    },
  };
  ctx.body = JSON.stringify(result);
};