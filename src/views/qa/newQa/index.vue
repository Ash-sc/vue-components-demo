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
            <li @click="newCategoryOrKind('first')">新增一级分类</li>
          </selector>
          <selector
            :data-list="secondCList()"
            v-on:val-change="val => categoryChange(val, 'secondC')"
            :val="secondC"
            :opts="{ needEmpty: true, emptyLabel: '请选择二级分类' }"
          >
            <li>新增二级分类</li>
          </selector>
          <selector
            :data-list="thirdCList()"
            v-on:val-change="val => categoryChange(val, 'thirdC')"
            :val="thirdC"
            :opts="{ needEmpty: true, emptyLabel: '请选择三级分类' }"
          >
            <li>新增三级分类</li>
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
            <li>新增归属</li>
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
    <popup :popup-name="'new-category-or-kind'">
      <div>123123123123</div>
    </popup>
  </div>
</template>
<script>
import Vue from 'vue'
import find from 'lodash/find'
import Selector from '@/components/Selector/'
import VueHtml5Editor from 'vue-html5-editor'
import Popup from '@/components/Popup/'

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

  components: { Selector, Popup },


  data: () => ({
    qaOptionsData: [
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
                label: 'iOS',
                categories: ['集成', '推送']
              }, {
                id: 100102,
                label: '安卓',
                categories: ['集成2', '推送2']
              }
            ]
          }, {
            id: 100200,
            label: '服务端',
            children: [
              {
                id: 100201,
                label: 'java'
              }, {
                id: 100202,
                label: 'node',
                categories: ['node版本']
              }
            ]
          }
        ]
      }
    ],
    firstC: '',
    secondC: '',
    thirdC: '',
    questionKind: '',
    questionName: '',
    questionAnswer: ''
  }),

  computed: {
    questionCategory() {
      return this.thirdC || this.secondC || this.firstC
    },
    kindData() {
      let categories = []
      const secondCList = this.secondCList()
      const thirdCList = this.thirdCList()
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
    secondCList: function() {
      if (!this.firstC) {
        return []
      }
      return find(this.qaOptionsData, { id: this.firstC }).children
    },

    thirdCList: function() {
      if (!this.secondC) {
        return []
      }
      return find(this.secondCList(), { id: this.secondC }).children
    },

    categoryChange: function(val, type) {
      this[type] = val
    },

    kindChange: function(val) {
      this.questionKind = val
    },

    changeNoteQuestionAnswer: function(answer) {
      this.questionAnswer = answer
    },

    newCategoryOrKind: function() {
      this.$store.commit('newPopup', { name: 'new-category-or-kind' })
      console.log(12312)
    },

    submitQuestion: function() {
      console.log({
        category: this.questionCategory,
        kind: this.questionKind,
        name: this.questionName,
        answer: this.questionAnswer
      })
    }
  }
}
</script>
