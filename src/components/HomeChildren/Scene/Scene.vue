<template>
  <div class="scene">
    <div class="header"><h2>— 应用场景 —</h2></div>
    <!----------------内容区域----------------->
    <div class="content">
      <div class="item" v-for="(item,index) in scene" :key="index">
        <p :class="item.icon" class="iconfont"></p>
        <div class="item-right">
          <p>{{item.result.title}}</p>
          <p>{{item.result.text}}</p>
        </div>
      </div>
    </div>
    <!----------------内容区域----------------->
  </div>
</template>

<script>
  export default {
    name: "Scene",
    data() {
      return {
        scene: [{
          'icon': 'iconfont icon-wendang',
          'result': {
            'title': '文档识别',
            'text': '轻松识别图片中的文字，文字录入不再繁琐'
          }
        }
          , {
            'icon': 'iconfont icon-shenfenzhengzhengmian',
            'result': {
              'title': '身份识别',
              'text': '无需手动输入证件信息，可快速进行银行身份认证、网络身份认证等'
            }
          },
          {
            'icon': 'iconfont icon-iconset0291',
            'result': {
              'title': '银行卡识别',
              'text': '通过OCR实现信息快速录入和审核校对，提升效率'
            }
          },
          {
            'icon': 'iconfont icon-buhuanhangshizheng',
            'result': {
              'title': '行驶证识别',
              'text': '轻松识别图片中的文字，文字录入不再繁琐'
            }
          },
          {
            'icon': 'iconfont icon-yingyezhizhao',
            'result': {
              'title': '营业执照识别',
              'text': '精确识别执照上的信息，减少录入时间'
            }
          },
          {
            'icon': 'iconfont icon-w_jiancai',
            'result': {
              'title': '智能剪裁',
              'text': '智能地检测到每张图片的主次部分并自动裁剪、缩放到目标尺寸'
            }
          }]
      }
    },
    created() {
      // axios.get("/scene").then(res => {
      //   console.log(res)
      //   this.scene = res.data
      // })
    }
  }
</script>

<style scoped>
  .scene {
    width: 100%;
    height: 500px;
    background-image: url("~assets/img/background.jpg");
  }

  .scene .header {
    text-align: center;
    margin: 50px 0 30px 0;
    padding: 50px 0 20px 0;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 90%;
    margin: 0 auto;
  }

  .item {
    display: flex;
    width: 30%;
    margin-bottom: 30px;
  }

  .item .iconfont {
    font-size: 42px;
  }

  .item .item-right {
    margin-left: 20px;
  }

  .item .item-right p:first-child {
    font-size: 22px;
  }

</style>
