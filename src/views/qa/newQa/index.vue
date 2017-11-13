<template>
  <div class="qa-management-page">
    <div class="module-header">
      <h2 class="module-title">新增常见问题</h2>
    </div>
    <div class="module-body">
      <div class="form-content">
        <label class="form-label required">问题分类:</label>
        <div class="form-element">
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
            <li v-if="firstC" @click="newCategoryOrKind('secondC')">+ 新增二级分类</li>
          </selector>
          <selector
            :data-list="thirdCList"
            v-on:val-change="val => categoryChange(val, 'thirdC')"
            :val="thirdC"
            :opts="{ needEmpty: true, emptyLabel: '请选择三级分类' }"
          >
            <li v-if="secondC" @click="newCategoryOrKind('thirdC')">+ 新增三级分类</li>
          </selector>
        </div>

        <label class="form-label">问题归属:</label>
        <div class="form-element">
          <selector
            :data-list="kindData"
            v-on:val-change="val => kindChange(val)"
            :val="questionKind"
            :opts="{ needEmpty: true, emptyLabel: '请选择归属分类' }"
          >
            <li v-if="secondC" @click="newCategoryOrKind('kind')">+ 新增归属</li>
          </selector>
        </div>

        <label class="form-label required">问题名称:</label>
        <div class="form-element">
          <input type="text" class="gt-form-control" v-model="questionName" maxlength="50" />
        </div>

        <label class="form-label required">问题答案:</label>
        <div class="form-element">
          <vue-html5-editor
            :content="questionAnswer"
            @change="changeNoteQuestionAnswer"
          ></vue-html5-editor>
        </div>

        <div class="form-footer">
          <button
            class="gt-btn-solid"
            @click="submitQuestion"
          >提交</button>
        </div>
      </div>
    </div>

    <vue-popup ref="categoryDialog">
      <new-category :opts="categoryOrKindOpts"></new-category>
    </vue-popup>

  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import find from 'lodash/find'
import Selector from '@/components/Selector/'
import VueHtml5Editor from 'vue-html5-editor'
import NewCategory from './newCategory'
import * as types from '@/store/types/qaManagementTypes'


Vue.use(VueHtml5Editor, {
  showModuleName: false,
  image: {
    sizeLimit: 512 * 1024,
    compress: true,
    width: 500,
    height: 500,
    quality: 80
  },
  visibleModules: [
    'text',
    'color',
    'font',
    'align',
    'list',
    'link',
    'unlink',
    'tabulation',
    'image',
    'hr',
    'eraser',
    'undo',
    'full-screen'
  ]
})

export default {

  components: { Selector, NewCategory },


  data: () => ({
    categoryOrKindOpts: {},
    firstC: '',
    secondC: '',
    thirdC: '',
    questionKind: '',
    questionName: '',
    questionAnswer: ''
  }),

  computed: {
    ...mapGetters({
      qaOptionsData: 'qaCategoryData'
    }),

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
      const level = this.thirdC ? 'third' : (this.secondC ? 'second' : 'first')
      let path = `/${find(this.qaOptionsData, { id: this.firstC }).pathName}`
      if (level !== 'first') {
        path += `/${find(this.secondCList, { id: this.secondC }).pathName}`
        if (level !== 'second') {
          path += `/${find(this.thirdCList, { id: this.thirdC }).pathName}`
        }
      }
      return {
        id: this.thirdC || this.secondC || this.firstC,
        path
      }
    },

    kindData() {
      let categories = []
      const secondCList = this.secondCList
      const thirdCList = this.thirdCList
      if (thirdCList.length && this.thirdC) {
        categories = find(thirdCList, { id: this.thirdC }).categories || []
      } else if (secondCList.length && this.secondC && !thirdCList.length) {
        categories = find(secondCList, { id: this.secondC }).categories || []
      }
      return categories.map(str => ({ id: str, label: str }))
    }
  },

  watch: {
    firstC: function() {
      this.secondC = ''
      this.questionKind = ''
    },

    secondC: function(val) {
      this.thirdC = ''
      this.questionKind = ''
    },

    thirdC: function() {
      this.questionKind = ''
    }
  },

  methods: {
    categoryChange: function(val, type) {
      this[type] = val
    },

    kindChange: function(val) {
      this.questionKind = val
    },

    changeNoteQuestionAnswer: function(answer) {
      this.questionAnswer = answer
    },

    newCategoryOrKind: function(type) {
      this.$refs.categoryDialog.show()
      const categoryOrKindOpts = {
        type
      }
      if (type === 'kind') {
        categoryOrKindOpts.id = this.questionCategory.id
      } else {
        categoryOrKindOpts.id = type === 'secondC' ? this.firstC : this.secondC
      }
      this.categoryOrKindOpts = categoryOrKindOpts
    },

    submitQuestion: function() {
      let errorInfo = ''
      if (!this.secondC) {
        errorInfo = '问题分类至少需要二级'
      } else if (!this.questionName || !this.questionAnswer) {
        errorInfo = '问题名称和答案必须填写'
      }
      if (errorInfo) {
        return this.$store.dispatch('newNotification', {
          type: 'error',
          content: errorInfo
        })
      }

      this.$store.dispatch(types.NEW_QA, {
        ...this.questionCategory,
        kind: this.questionKind,
        question: this.questionName,
        answer: this.questionAnswer
      })
      .then(() => {
        this.$store.dispatch('newNotification', {
          type: 'success',
          content: '新增常见问题成功'
        })
        this.$router.push('/qa-management/qa-management-list')
      }, (err) => {
        this.$store.dispatch('newNotification', {
          type: 'success',
          content: err.errMsg || '新增常见问题失败'
        })
      })
    }
  },

  created: function() {
    if (!this.qaOptionsData.length) {
      this.$store.dispatch(types.GET_QA_CATEGORY_LIST)
    }
  }
}
</script>
