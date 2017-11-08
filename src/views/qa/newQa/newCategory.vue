<template>
  <div class="popup-body">
    <div class="modal-header">
      <h3 class="title">新增{{ opts.type === 'kind' ? '归属' : '三级分类' }}</h3>
      <i class="fa fa-times" @click="hide"></i>
    </div>
    <div class="modal-body">
      <div class="form-item">
        <label class="form-label required">{{ opts.type === 'kind' ? '归属' : '分类' }}名称:</label>
        <input type="text" class="gt-form-control" v-model="categoryName" maxlength="10" />
      </div>
      <div class="form-item" v-if="opts.type === 'category'">
        <label class="form-label required">英文名称:</label>
        <input
          type="text"
          class="gt-form-control"
          v-model="categoryLabel"
          maxlength="20"
          placeholder="用于构建项目时文件夹命名，请勿输入空格"
        />
      </div>
    </div>
    <div class="modal-footer">
      <button class="gt-btn-line" @click="hide">取消</button>
      <button class="gt-btn-solid" @click="conform">确定</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    opts: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    categoryName: '',
    categoryLabel: ''
  }),

  methods: {
    hide: function() {
      this.$parent.hide()
    },

    conform: function() {
      console.log(this.opts.type, this.opts.id, this.categoryLabel, this.categoryName)
      this.hide()
    }
  }
}
</script>
