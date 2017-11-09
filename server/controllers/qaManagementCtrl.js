var express = require('express')
var router = express.Router()
var qaManagementModel = require('../models/qaManagement')

// 获取常见问题列表
router.get('/qaList', function(req, res) {
  qaManagementModel
    .qaList(req.query)
    .then((data) => {
      res.status(200).json({
        success: true,
        data: {
          total: data.total,
          data: data.data,
          pageable: {
            page: parseInt(req.query.page, 10),
            size: parseInt(req.query.size, 10)
          }
        }
      })
    })
})

// 获取常见问题分类信息
router.get('/qaCategoryList', function(req, res) {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 100000,
        label: '个推推送',
        children: [
          {
            id: 100100,
            label: '客户端',
            children: [
              {
                id: 100101,
                label: 'iOS'
              }, {
                id: 100102,
                label: '安卓'
              }
            ]
          }, {
            id: 100200,
            label: '服务端'
          }
        ]
      },
      {
        id: 200000,
        label: '个像推送',
        children: [
          {
            id: 200100,
            label: '客户端'
          }, {
            id: 200200,
            label: '服务端'
          }
        ]
      },
      {
        id: 300000,
        label: '个数推送',
        children: [
          {
            id: 300100,
            label: '客户端'
          }, {
            id: 300200,
            label: '服务端'
          }
        ]
      },
      {
        id: 400000,
        label: '个验推送',
        children: [
          {
            id: 400100,
            label: '客户端'
          }, {
            id: 400200,
            label: '服务端'
          }
        ]
      }
    ]
  })
})

module.exports = router
