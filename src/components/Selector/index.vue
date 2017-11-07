<template>
  <div class="selector-body">
    <input
      type="text"
      class="selector-input"
      @focus="showOrHideList(true)"
      @blur="showOrHideList(false)"
      v-model="inputVal"
      readonly
    />
    <ul class="data-list" v-show="listShow">
      <li
        v-if="opts && opts.needEmpty"
        @click="changeVal('', opts.emptyLabel || '请选择')"
      >{{ opts.emptyLabel || '请选择' }}</li>
      <li
        v-for="(item, index) in dataList"
        :key="index"
        @click="changeVal(item.id, item.label)"
      >{{ item.label }}</li>
      <slot></slot>
    </ul>
  </div>
</template>
<script>
import find from 'lodash/find'

export default {

  props: {
    dataList: {
      type: Array,
      required: true
    },
    opts: {
      type: Object,
      required: false
    },
    val: {
      required: true
    }
  },

  data: () => ({
    listShow: false
  }),

  computed: {
    inputVal() {
      if (!this.val) {
        return (this.opts && this.opts.emptyLabel) || '请选择'
      }
      return find(this.dataList, { id: this.val }).label
    }
  },

  methods: {
    showOrHideList: function(type = false) {
      setTimeout(function() {
        this.listShow = type
      }.bind(this), !type && 200)
    },

    changeVal: function(val, inputVal) {
      this.$emit('val-change', val)
      this.showOrHideList()
    }
  }
}
</script>

<style lang="scss">
  .selector-body {
    display: inline-block;
    position: relative;
    width: 200px;
    
    .selector-input {
      height: 30px;
      width: 100%;
      padding: 5px 10px;
      font-size: 12px;
      line-height: 1.5;
      color: #3c3c3c;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 3px;
    }

    .selector-input:focus {
      outline: none;
      box-shadow: 0 0 8px rgba(221,221,221,.6);
    }

    .data-list {
      list-style: none;
      position: absolute;
      padding: 2px 0;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 3px;
      margin-top: 1px;
      background-color: #fff;
      z-index: 1;
    }

    .data-list > li {
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
      padding: 0 10px;
    }

    .data-list > li:hover {
      background-color: #398bfe;
      color: #fff;
      cursor: pointer;
    }

  }
</style>
