<template>
  <div>
    <div class="header"><h2>— 文字识别特征 —</h2></div>
    <!---------------内容区域----------------->
    <div class="content">
      <div class="item" v-for="(item,index) in feature" :key="index">
        <p :class="item.icon" class="iconfont"></p>
        <p class="title">{{item.result.title}}</p>
        <p class="text">{{item.result.text}}</p>
      </div>
    </div>
    <!---------------内容区域----------------->
  </div>
</template>

<script>

  export default {
    name: "Feature",
    data() {
      return {
        feature: [{
          'icon': 'iconfont icon-dingzhizuhemoxing',
          'result': {
            'title': '适应性强',
            'text': '微信自研的 OCR 技术，适应各种实际应用中的异常情况，如光照不均、倾斜、模糊等，具备非常高的复杂环境可用性。'
          }
        }
          , {
            'icon': 'iconfont icon-cizhuanputie',
            'result': {
              'title': '识别精准',
              'text': '微信文字识别 OCR 可自动从图片中定位并识别字段，印刷体的平均准确率可达90%以上，手写体的识别平均准确率高达85%以上。'
            }
          },
          {
            'icon': 'iconfont icon-kuaisuzhinengbuzhi',
            'result': {
              'title': '通用性强',
              'text': '微信文字识别 OCR 不仅支持证照类图片，还支持多种复杂场景的文字识别，如街景门店、印刷图文等。'
            }
          },
          {
            'icon': 'iconfont icon-fanganguanli',
            'result': {
              'title': '简单易用',
              'text': '微信文字识别 OCR 不仅可以一键上传本地图片进行识别，也可识别网络URL地址图片。'
            }
          },
          {
            'icon': 'iconfont icon-yingshijixuanranicon',
            'result': {
              'title': '应用广泛',
              'text': '微信文字识别 OCR 既能识别通用手写体文字，也能识别各种证件文字，满足多样化的场景应用需要。'
            }
          },
          {
            'icon': 'iconfont icon-fenggesuixinxuanze',
            'result': {
              'title': '服务可靠',
              'text': '微信文字识别 OCR 已成功应用于多项核心业务，接受过海量用户和复杂场景的考验，技术成熟稳定，可用性高。'
            }
          }]
      }
    },
    created() {

    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    margin: 50px 0 30px 0;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .item {
    width: 360px;
    margin-bottom: 20px;
    background-color: #f1f1f1;
    border-radius: 6px;
  }

  .item .iconfont {
    font-size: 60px;
    color: #1E90FF;
    text-align: center;
  }

  .item .title {
    text-align: center;
    font-size: 18px;
  }

  .item .text {
    font-size: 14px;
    color: #666;
    padding: 0 10px;
  }

</style>
