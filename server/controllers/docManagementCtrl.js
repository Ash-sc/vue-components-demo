var express = require('express')
var router = express.Router()
var docManagementModel = require('../models/docManagement')
// var _ = require('lodash')

// 获取常见问题列表
router.get('/searchDocList', function(req, res) {
  docManagementModel
    .searchDocList({
      product: req.query.product === 'all' ? '' : req.query.product,
      keywords: req.query.keywords
    })
    .then(function(data) {
      res.status(200).json({
        keywords: req.query.keywords,
        resultList: data.data
      })
    })
    .catch(function(err) {
      res.status(200).json({
        success: false,
        errMsg: err
      })
    })
})

module.exports = router
