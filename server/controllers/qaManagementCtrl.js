const express = require('express')
const router = express.Router()

// 获取常见问题列表
router.get('/qaList', (req, res) => {
  console.log(req.query)
  res.status(200).json({
    success: true,
    data: {
      data: [
        {
          name: '问题11111111',
          category: '开发者常见问题 > 个推推送 > 客户端 > iOS > 集成',
          lastUpdateTime: 1504921112000,
          operator: '林时工'
        }, {
          name: '问题22222222',
          category: '开发者常见问题 > 个推推送 > 客户端 > iOS > 集成',
          lastUpdateTime: 1509962512000,
          operator: '林时工'
        }, {
          name: '问题3333333',
          category: '开发者常见问题 > 个推推送 > 客户端 > iOS > 集成',
          lastUpdateTime: 1506962512000,
          operator: '林时工'
        }
      ],
      pageable: {
        page: 1,
        size: 20
      },
      total: 100
    }
  })
})

// 获取常见问题分类信息
router.get('/qaCategoryList', (req, res) => {
  res.status(200).json({
    success: true,
    data: [
      {
        id: 100000,
        label: '个推推送',
        children: [
          {
            id: 100100,
            label: '客户端'
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
