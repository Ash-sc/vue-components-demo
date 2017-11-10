<template>
  <div class="popup-body">
    <div class="modal-header">
      <h3 class="title">新增{{ opts.type === 'kind' ? '归属' : '分类' }}</h3>
      <i class="fa fa-times" @click="hide"></i>
    </div>
    <div class="modal-body">
      <div class="form-item">
        <label class="form-label required">{{ opts.type === 'kind' ? '归属' : '分类' }}名称:</label>
        <input type="text" class="gt-form-control" v-model="categoryLabel" maxlength="10" />
      </div>
      <div class="form-item" v-if="opts.type !== 'kind'">
        <label class="form-label required">英文名称:</label>
        <input
          type="text"
          class="gt-form-control"
          v-model="categoryPathName"
          maxlength="20"
          placeholder="用于构建项目时文件夹命名，请勿输入空格"
        />
      </div>
    </div>
    <div class="modal-footer">
      <button class="gt-btn-line" @click="hide">取消</button>
      <button class="gt-btn-solid" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
import * as types from '@/store/types/qaManagementTypes'

export default {
  props: {
    opts: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    categoryLabel: '',
    categoryPathName: ''
  }),

  methods: {
    hide: function() {
      this.$parent.hide()
    },

    confirm: function() {
      // todo: 必填验证
      const { type, id } = this.opts
      this.$store.dispatch(types[type === 'kind' ? 'NEW_QA_KIND' : 'NEW_QA_CATEGORY'], {
        type,
        id,
        label: this.categoryLabel,
        pathName: this.categoryPathName
      })
      .then((data) => {
        this.categoryLabel = ''
        this.categoryPathName = ''
        this.$store.dispatch('newNotification', {
          type: 'success',
          content: '操作成功'
        })
        this.$store.dispatch(types.GET_QA_CATEGORY_LIST)
        this.hide()
      }, (err) => {
        this.$store.dispatch('newNotification', {
          type: 'error',
          content: err.errMsg || '操作失败'
        })
      })
    }
  }
}
</script>
