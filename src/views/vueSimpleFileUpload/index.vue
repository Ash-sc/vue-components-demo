<template>
  <div class="file-upload-section">
    <h3>Vue Simple Upload</h3>
    <vue-simple-upload :options="options" v-on:progress-update="progressUpdate">
    </vue-simple-upload>
    <br>
    <img :src="imageUrl" alt="img" v-show="imageUrl" class="image-show-section" />
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
        accept: 'image/png, image/jpeg',
        multiple: true
      },
      imageUrl: ''
    }
  },

  methods: {
    progressUpdate(fileInfoList) {
      console.log('upload speed（kb/s）：', fileInfoList[0].uploadSpeed)
      if (fileInfoList[0].type === 'success') {
        this.imageUrl = JSON.parse(fileInfoList[0].response).url
      }
    }
  }
}
</script>

<style lang="scss">
.file-upload-section {
  text-align: center;
  margin-top: 80px;

  .image-show-section {
    max-width: 650px;
    max-height: 400px;
    border-radius: 5px;
  }
}
</style>
