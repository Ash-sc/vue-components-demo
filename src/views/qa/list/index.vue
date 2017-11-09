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
        <label class="form-label required">问题分类:</label>
        <selector
          :data-list="qaOptionsData"
          v-on:val-change="val => categoryChange(val, 'firstC')"
          :val="firstC"
          :opts="{ needEmpty: true, emptyLabel: '请选择一级分类' }"
        >
        </selector>
        <selector
          :data-list="secondCList"
          v-on:val-change="val => categoryChange(val, 'secondC')"
          :val="secondC"
          :opts="{ needEmpty: true, emptyLabel: '请选择二级分类' }"
        >
        </selector>
        <selector
          :data-list="thirdCList"
          v-on:val-change="val => categoryChange(val, 'thirdC')"
          :val="thirdC"
          :opts="{ needEmpty: true, emptyLabel: '请选择三级分类' }"
        >
        </selector>
        <button class="gt-btn-solid" @click="searchFunc">搜索</button>
      </div>
      <gt-table
      :columns="tableOptions.columns"
      :data="tableData"
      ></gt-table>
      <gt-pagination
        :page="qaList.pageable.page"
        :total="qaList.total"
        :size="qaList.pageable.size"
        v-on:page-change="changePage"
      ></gt-pagination>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import Selector from '@/components/Selector/'
import * as types from '@/store/types/qaManagementTypes'
import find from 'lodash/find'

moment.locale('zh-cn')

export default {

  components: { Selector },

  data: () =>({
    tableOptions: {
      columns: [
        {
          label: '问题名称',
          field: 'question'
        }, {
          label: '问题类别',
          field: 'category'
        }, {
          label: '问题归属',
          field: 'kind'
        }, {
          label: '最后更新时间',
          field: 'updateTime',
          sort: true
        }, {
          label: '操作人员',
          field: 'operator'
        }
      ]
    },
    firstC: '',
    secondC: '',
    thirdC: ''
  }),

  computed: {
    ...mapGetters({
      qaList: 'qaList',
      qaOptionsData: 'qaCategoryData'
    }),

    tableData() {
      const categoryTrans = (id) => {
        if (!this.qaOptionsData.length) {
          return ''
        }
        let category = '常见问题'
        const firstC = parseInt(id.toString().substr(0, 2) + '0000', 10)
        const firstLevel = find(this.qaOptionsData, { id: firstC })
        category += ' > ' + firstLevel.label
        if (firstC !== id) {
          const secondC = parseInt(id.toString().substr(0, 4) + '00', 10)
          const secondLevel = find(firstLevel.children, { id: secondC })
          category += ' > ' + secondLevel.label
          if (secondC !== id) {
            const thirdLevel = find(secondLevel.children, { id })
            category += ' > ' + thirdLevel.label
          }
        }
        return category
      }
      return this.qaList.data.map(item => {
        if (!item.category) {
          item.category = categoryTrans(item.categoryId)
        }
        return item
      })
    },

    secondCList() {
      if (!this.firstC) {
        return []
      }
      return find(this.qaOptionsData, { id: this.firstC }).children || []
    },

    thirdCList() {
      if (!this.secondC) {
        return []
      }
      return find(this.secondCList, { id: this.secondC }).children || []
    },

    questionCategory() {
      return this.thirdC || this.secondC || this.firstC
    }
  },
  watch: {
    firstC: function() {
      this.secondC = ''
    },

    secondC: function(val) {
      this.thirdC = ''
    }
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
    categoryChange: function(val, type) {
      this[type] = val
    },

    newQaLink: function() {
      this.$router.push('/qa-management/new-qa')
    },

    changePage: function(page) {
      this.$store.dispatch(types.GET_QA_LIST, {
        categoryId: this.questionCategory,
        page,
        size: 20
      })
    },

    searchFunc: function() {
      this.$store.dispatch(types.GET_QA_LIST, {
        categoryId: this.questionCategory,
        page: 1,
        size: 20
      })
    }
  }
}
</script>

<style lang="scss">
.gt-page {
  text-align: right;
  margin-top: 20px;

  .gt-page__list .gt-page__cell-num.active {
    background-color: #f6f6f6;
  }
}
</style>

