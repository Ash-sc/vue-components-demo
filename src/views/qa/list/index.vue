<template>
  <div class="qa-management-page">
    <div class="module-header">
      <h2 class="module-title">
        常见问题列表
        <button class="gt-btn-solid" @click="newQaLink">新建常见问题</button>
        </h2>
    </div>
    <div class="module-body">
      <div class="search-and-operate">
      </div>
      <gt-table
      :columns="tableOptions.columns"
      :data="tableData"
      ></gt-table>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import Vue from 'vue'
moment.locale('zh-cn')

export default {

  data: () =>({
    tableOptions: {
      columns: [
        {
          label: '问题名称',
          field: 'name'
        }, {
          label: '所属类别',
          field: 'category'
        }, {
          label: '最后更新时间',
          field: 'lastUpdateTime',
          formatter: val => moment(val).format('YYYY-MM-DD'),
          sort: true
        }, {
          label: '操作人员',
          field: 'operator'
        }, {
          label: '操作',
          component: Vue.component('test-component', {
            template: '<div>A custom component!</div>'
          })
        }
      ]
    },
    tableData: [
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
    ]
  }),


  created: function() {
  },

  methods: {
    newQaLink: function() {
      this.$router.push('/qa-management/new-qa')
    }
  }
}
</script>
