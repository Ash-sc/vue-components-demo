var express = require('express')
var router = express.Router()
var qaManagementModel = require('../models/qaManagement')
var _ = require('lodash')

// 获取常见问题列表
router.get('/qaList', function(req, res) {
  qaManagementModel
    .qaList(req.query)
    .then(function(data) {
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
    .catch(function(err) {
      res.status(200).json({
        success: false,
        errMsg: err
      })
    })
})

// 获取常见问题分类信息
router.get('/qaCategoryList', function(req, res) {
  qaManagementModel
    .getCategory()
    .then(function(data) {
      res.status(200).json({
        success: true,
        data: data.data
      })
    })
    .catch(function(err) {
      res.status(200).json({
        success: false,
        errMsg: err
      })
    })
})

// 新建常见问题分类
router.post('/newQaCategory', function(req, res) {
  qaManagementModel
  .getCategory()
  .then(function(data) {
    var categoryList = data.data
    if (req.body.type === 'secondC') {
      var firstLevel = _.find(categoryList, { id: req.body.id })
      if (firstLevel.children && firstLevel.children.length) {
        if (_.find(firstLevel.children, function(item) {
          return (item.label === req.body.label) || (item.pathName === req.body.pathName)
        })) {
          return res.status(200).json({
            success: false,
            errMsg: '分类名称不能重复'
          })
        }
        firstLevel.children.push({
          id: firstLevel.children[firstLevel.children.length - 1].id + 100,
          label: req.body.label,
          pathName: req.body.pathName
        })
      } else {
        firstLevel.children = [{
          id: req.body.id + 100,
          label: req.body.label,
          pathName: req.body.pathName
        }]
      }
    } else if (req.body.type === 'thirdC') {
      firstLevel = _.find(categoryList, { id: parseInt(req.body.id.toString().substr(0, 2) + '0000', 10) })
      var secondLevel = _.find(firstLevel.children, { id: parseInt(req.body.id.toString().substr(0, 4) + '00', 10) })
      if (secondLevel.children && secondLevel.children.length) {
        if (_.find(secondLevel.children, function(item) {
          return (item.label === req.body.label) || (item.pathName === req.body.pathName)
        })) {
          return res.status(200).json({
            success: false,
            errMsg: '分类名称不能重复'
          })
        }
        secondLevel.children.push({
          id: secondLevel.children[secondLevel.children.length - 1].id + 1,
          label: req.body.label,
          pathName: req.body.pathName
        })
      } else {
        secondLevel.children = [{
          id: req.body.id + 1,
          label: req.body.label,
          pathName: req.body.pathName
        }]
      }
    }
    return qaManagementModel
     .updateCategory(JSON.stringify(categoryList))
  })
  .then(function(response) {
    if (response.success) {
      res.status(200).json({
        success: true,
        data: {}
      })
    }
  })
  .catch(function(err) {
    console.error(err)
    res.status(200).json({
      success: false,
      errMsg: '未知错误'
    })
  })
})

// 新建常见问题归属
router.post('/newQaKind', function(req, res) {
  qaManagementModel
  .getCategory()
  .then(function(data) {
    var categoryList = data.data
    var level = parseInt(req.body.id.toString().substr(0, 4) + '00', 10) === req.body.id ? 'second' : 'third'
    var firstLevel = _.find(categoryList, { id: parseInt(req.body.id.toString().substr(0, 2) + '0000', 10) })
    var secondLevel = _.find(firstLevel.children, { id: parseInt(req.body.id.toString().substr(0, 4) + '00', 10) })
    if (level === 'second') {
      if (secondLevel.categories && secondLevel.categories.length) {
        if (secondLevel.categories.indexOf(req.body.label) >= 0) {
          return res.status(200).json({
            success: false,
            errMsg: '分类名称不能重复'
          })
        }
        secondLevel.categories.push(req.body.label)
      } else {
        secondLevel.categories = [req.body.label]
      }
    } else {
      var thirdLevel = _.find(secondLevel.children, { id: req.body.id })
      if (thirdLevel.categories && thirdLevel.categories.length) {
        if (thirdLevel.categories.indexOf(req.body.label) >= 0) {
          return res.status(200).json({
            success: false,
            errMsg: '分类名称不能重复'
          })
        }
        thirdLevel.categories.push(req.body.label)
      } else {
        thirdLevel.categories = [req.body.label]
      }
    }
    return qaManagementModel
     .updateCategory(JSON.stringify(categoryList))
  })
  .then(function(response) {
    if (response.success) {
      res.status(200).json({
        success: true,
        data: {}
      })
    }
  })
  .catch(function(err) {
    console.error(err)
    res.status(200).json({
      success: false,
      errMsg: '未知错误'
    })
  })
})

// 新建常见问题
router.post('/newQa', function(req, res) {
  qaManagementModel
    .qaList({ categoryId: req.body.id, page: 1, size: 1 })
    .then(function(data) {
      var questionNum = data.total
      return qaManagementModel
        .newQuestion({
          question: req.body.question,
          answer: req.body.answer,
          id: req.body.id,
          kind: req.body.kind,
          operator: 'admin',
          url: req.body.path + '/question' + questionNum + '.md'
        })
    })
    .then(function() {
      res.status(200).json({
        success: true,
        data: {}
      })
    })
    .catch(function(err) {
      console.error(err)
      res.status(200).json({
        success: false,
        errMsg: '未知错误'
      })
    })
})


module.exports = router
