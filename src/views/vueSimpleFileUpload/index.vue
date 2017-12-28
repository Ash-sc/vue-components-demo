<template>
  <div class="file-upload-section">
    <h3>Vue Simple Upload</h3>
    <div class="options-section">
      <span>Options:</span>
      <br>
      <span>Accept:</span>
      <label>
        <input type="radio" name="accept" v-model="options.accept" value="*" />
        All
      </label>
      <label>
        <input type="radio" name="accept" v-model="options.accept" value="image/jeg,image/png" />
        JPEG or PNG
      </label>
      <br>
      <span>Multiple:</span>
      <label>
        <input type="radio" name="multiple" v-model="options.multiple" :value="true" />
        True
      </label>
      <label>
        <input type="radio" name="multiple" v-model="options.multiple" :value="false" />
        False
      </label>
      <br>
      <span>AutoStart:</span>
      <label>
        <input type="radio" name="autoStart" v-model="options.autoStart" :value="true" />
        True
      </label>
      <label>
        <input type="radio" name="autoStart" v-model="options.autoStart" :value="false" />
        False
      </label>
    </div>
    <vue-simple-upload :options="options" v-on:progress-update="progressUpdate" ref="fileUploadComp">
    </vue-simple-upload>
    <br>
    <div class="upload-file-info-section">
      <h4 class="section-title">Files selected</h4>
      <div class="file-info-item" v-for="(fileInfo, index) in fileInfoList" :key="index">
        <div class="progress-info">
          <span class="file-name txt-ellipsis">{{ fileInfo.fileName }}</span>
          <span class="file-size">{{ parseInt(fileInfo.fileInfo.size / 1000, 10) }}kb</span>
          <span class="file-progress">{{ fileInfo.progress }}</span>
          <span class="operate">
            <i class="fa fa-arrow-up fl-l" v-if="fileInfo.type === 'waiting'" @click="startUpload(fileInfo.id)"></i>
            <i class="fa fa-check fl-r" v-if="fileInfo.type === 'success'"></i>
            <i class="fa fa-times fl-r" v-if="fileInfo.type === 'fail' || fileInfo.type === 'abort'"></i>
            <i class="fa fa-trash fl-r" v-if="fileInfo.type === 'uploading'" @click="abortUpload(fileInfo.id)"></i>
          </span>
        </div>
        <div
          class="progress-bg"
          :class="fileInfo.type"
          :style="{ width: fileInfo.type === 'uploading' ? fileInfo.progress : '100%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSimpleUpload from 'vue-simple-file-upload'
import Vue from 'vue/dist/vue.js'

Vue.use(VueSimpleUpload)

export default {
  data() {
    return {
      options: {
        className: 'btn-solid',
        btnContent: 'Choose File',
        url: '/api/files/upload',
        accept: '*',
        multiple: true,
        autoStart: true
      },
      imageUrl: '',
      fileInfoList: []
    }
  },

  methods: {
    progressUpdate(fileInfoList) {
      this.fileInfoList = fileInfoList
    },

    abortUpload(id) {
      this.$refs.fileUploadComp.abort(id)
    },

    startUpload(id) {
      this.$refs.fileUploadComp.startUpload(id)
    }
  }
}
</script>

<style lang="scss">
.file-upload-section {
  text-align: center;
  margin-top: 80px;

  > h3 {
    color: #fff;
    font-size: 22px;
  }

  .options-section {
    position: fixed;
    color: #fff;
    top: 140px;
    left: 20px;
    text-align: left;
    line-height: 30px;

    span, label {
      margin-right: 20px;
      display: inline-block;
      min-width: 75px;
    }
  }

  .file-upload-body .btn-solid {
    width: 90px;
    outline: none;
    height: 30px;
    background-color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .file-upload-body .btn-solid:hover {
    background-color: #00a4ff;
    color: #fff;
  }
}
.fl-l {
  float: left;
}

.fl-r {
  float: right;
}

.upload-file-info-section {
  width: 800px;
  display: inline-block;
  margin-top: 40px;
  border: 1px solid #ddd;
  height: 400px;
  background-color: #fff;
  overflow-y: auto;

  .section-title {
    margin: 0;
    font-weight: normal;
    text-align: left;
    line-height: 40px;
    text-indent: 20px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }

  .file-info-item {
    position: relative;
    height: 45px;
    line-height: 45px;
    background-color: #f5f7fa;
    text-align: left;

    &::not(:first-child) {
      border-top: 1px solid #dcdfe5;
    }
  }

  .progress-info {
    position: absolute;
    top: 0;
    height: 100%;
  }

  .progress-bg {
    height: 100%;

    &.uploading {
      background-color: #e5f2ff;
    }

    &.success {
      background-color: #e5ffef;
    }

    &.abort {
      background-color: #fff6e5;
    }

    &.fail {
      background-color: #ffe5ea;
    }
  }

  .file-name {
    display: inline-block;
    width: 480px;
    padding-left: 20px;
  }

  .file-size, .file-progress, .operate {
    display: inline-block;
    width: 100px;
    vertical-align: top;
    font-size: 14px;
  }

  .operate {
    width: 70px;
    height: 45px;

    .fa {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-top: 12px;
      text-align: center;
    }

    .fa-arrow-up, .fa-trash {
      cursor: pointer;
    }

    .fa-check {
      color: #26ad58;
    }

    .fa-times {
      color: #ff4848;
    }

    .fa-trash {
      color: #00a4ff;
    }
  }
}
</style>
