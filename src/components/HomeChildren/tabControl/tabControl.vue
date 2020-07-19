<template>
  <div>
    <div class="header"><h1>— 功能体验 —</h1></div>
    <div class="box">
      <!----------------------选项卡部分------------------>
      <ul class="tabs tabControl">
        <li v-for="(tab,index) in tabsName" @click="tabsSwitch(index)" v-bind:class="{active:tab.isActive}">
          {{tab.name}}
        </li>
      </ul>
      <!----------------------选项卡部分------------------>

      <!----------------------切换内容部分---------------->
      <div class="cards">
        <div class="tab-card" style="display: block;">
          <!--<Canvas :result_show="item"></Canvas>-->
          <ocr_comm/>
        </div>
        <div class="tab-card">

        </div>
        <div class="tab-card">

        </div>
        <div class="tab-card">
          <driving/>
        </div>
        <div class="tab-card">

        </div>
        <div class="tab-card">
          <deep_crop/>
        </div>
        <div class="tab-card">
          <super_resolution/>
        </div>
        <div class="tab-card">

        </div>
      </div>
      <!--v-for="item in result"-->
      <!----------------------切换内容部分---------------->
    </div>
  </div>
</template>

<script>
  // 'https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=driving_license&test_sign=yi_ke_shi_ge_sha_diao'
  // 'https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=idcard&type=photo&test_sign=yi_ke_shi_ge_sha_diao'
  // 'https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=biz_license&test_sign=yi_ke_shi_ge_sha_diao'
  // 'https://mp.weixin.qq.com/wxamusic/ocr/idcard?action=bankcard&test_sign=yi_ke_shi_ge_sha_diao'
  import Canvas from 'components/HomeChildren/Canvas/Canvas'
  import ocr_comm from 'components/HomeChildren/Canvas/ocr_common/ocr_comm'
  import driving from 'components/HomeChildren/Canvas/driving/driving'
  import deep_crop from 'components/HomeChildren/Canvas/deep_crop/deep_crop'
  import super_resolution from 'components/HomeChildren/Canvas/super_resolution/super_resolution'

  export default {
    name: "tabControl",
    components: {
      Canvas,
      ocr_comm,
      driving,
      deep_crop,
      super_resolution,

    },
    data() {
      return {
        tabsName: [{
          name: "通用OCR",
          isActive: true
        }, {
          name: "身份证OCR",
          isActive: false
        }, {
          name: "银行卡OCR",
          isActive: false
        }, {
          name: "行驶证OCR",
          isActive: false
        }, {
          name: "驾驶证OCR",
          isActive: false
        }, {
          name: "智能剪裁",
          isActive: false
        }, {
          name: "图片高清化",
          isActive: false
        }, {
          name: "营业执照OCR",
          isActive: false
        }],  /*选项卡标题*/
        active: false,
        result: ['通用OCR结果', '身份证OCR结果', '银行卡OCR结果', '行驶证OCR结果', '驾驶证OCR结果',
          '智能剪裁结果', '图片高清化结果', '营业执照OCR结果']    /*结果展示画布中文字*/
      }
    },

    methods: {
      //选项卡控制不同内容显示
      tabsSwitch: function (tabIndex) {
        var tabCardCollection = document.querySelectorAll(".tab-card"),
          len = tabCardCollection.length;
        for (let i = 0; i < len; i++) {
          tabCardCollection[i].style.display = "none";
          this.tabsName[i].isActive = false;
        }
        this.tabsName[tabIndex].isActive = true;
        tabCardCollection[tabIndex].style.display = "block";
      }
    }
  }
</script>

<style scoped>
  .header {
    text-align: center;
    margin: 50px 0 30px 0;
  }

  .box {
    margin: 0 auto;
    height: 680px;
  }

  .box .tabControl {
    border-radius: 6px;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    border: 0 solid #f1f1f1;
  }

  .tabControl li:first-child {
    border-left: 1px solid #c5c5c5;
  }

  .tabControl li {
    font-size: 20px;
    display: inline;
    padding: 5px 20px;
    border-right: 1px solid #c5c5c5;
    border-bottom: 1px solid #c5c5c5;
    border-top: 1px solid #c5c5c5;
    cursor: pointer;
    border-radius: 2px;
  }

  .tabControl li:focus {
    background-color: #0052d9;
    color: #fff;
  }

  .tabControl li:hover {
    text-decoration: none;
  }

  .tabControl li.active {
    background-color: #0052d9;
    color: #fff;
  }

  .cards .tab-card {
    display: none;
  }

</style>
