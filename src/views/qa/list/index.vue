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
      :data="tableData.data"
      ></gt-table>
      <gt-pagination
        :page="tableData.pageable.page"
        :total="tableData.total"
        :size="tableData.pageable.size"
        v-on:page-change="changePage"
      ></gt-pagination>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import * as types from '@/store/types/qaManagementTypes'

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
        }
      ]
    }
  }),

  computed: {
    ...mapGetters({
      tableData: 'qaList'
    })
  },


  created: function() {
    if (!this.$store.state.qaManagement.qaCategoryData.length) {
      this.$store.dispatch(types.GET_QA_CATEGORY_LIST)
    }
    this.$store.dispatch(types.GET_QA_LIST, {
      page: 1,
      size: 20
    })
  },

  methods: {
    newQaLink: function() {
      this.$router.push('/qa-management/new-qa')
    },

    changePage: function(page) {
      this.$store.dispatch(types.GET_QA_LIST, {
        page,
        size: 20
      })
    }
  }
}
</script>
