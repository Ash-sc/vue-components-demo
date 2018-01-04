<template>
  <div class="home-page-bg">
    <div class="home-page-section">
      <h3 class="section-title">Vue Simple Components Demo</h3>
      <div class="demo-link-section">
        <div
          class="component-item"
          v-for="(item, index) in componentsList"
          :key="index"
          @click="componentPage(item.name)"
        >
          <img class="component-img" :src="item.imgPath" alt="" />
          <span class="component-name txt-ellipsis">{{ item.name }}</span>
          <span class="component-keywords txt-ellipsis"><i>{{ item.support }}</i></span>
        </div>
        <div class="component-item"></div>
        <div class="component-item"></div>
        <div class="component-item"></div>
        <div class="component-item"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () =>({
    componentsList: [
      {
        name: 'vue-simple-file-upload',
        imgPath: 'http://web-site-files.ashshen.cc/vue-components-demo/vue-simple-file-upload.gif',
        support: 'Multiple file, upload progress, upload speed, abort'
      },
      {
        name: 'vue-simple-notification',
        imgPath: 'http://web-site-files.ashshen.cc/vue-components-demo/vue-simple-notification.gif',
        support: 'Notification position, duration, animation'
      }
    ]
  }),

  methods: {
    componentPage(name) {
      this.$router.push({ name })
    }
  }
}
</script>
<style lang="scss" scoped>
.home-page-bg {
  min-height: 100vh;
  overflow: auto;
  background-image: url('http://olo3fohgk.bkt.clouddn.com/background.png');
  background-color: #2d2837;
  background-repeat: no-repeat;
  background-size: cover;
}
.home-page-section {
  width: 1000px;
  margin: 100px auto;

  .section-title {
    margin: 0 0 60px 0;
    height: 60px;
    line-height: 60px;
    border-bottom: 5px solid #ace9ff;
    font-size: 25px;
    text-align: center;
    color: #fff;
  }

  .demo-link-section {
    font-size: 0;

    .component-item {
      display: inline-block;
      vertical-align: top;
      width: 292px;
      height: 220px;
      font-size: 0.8rem;
      margin-bottom: 50px;
      background-color: #524054;
      padding: 4px;
    }

    .component-item:nth-child(3n + 1), .component-item:nth-child(3n + 2) {
      margin-right: 50px;
    }

    .component-item:hover {
      box-shadow: 0px 0px 10px #0c0c0c;
      cursor: pointer;
    }

    .component-img {
      width: 100%;
      height: 168px;
    }

    .component-name, .component-keywords {
      height: 20px;
      width: 100%;
      display: inline-block;
      line-height: 20px;
      margin-top: 4px;
      font-size: 12px;
      text-indent: 2px;
      color: #e4e4e4;
    }

    .component-name {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>


