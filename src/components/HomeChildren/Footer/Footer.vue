<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <!--------------------左边区域----------------->
        <div class="col-md-4 col-lg-4">
          <div class="media d-flex align-items-center m-1 mb-3 p-2">
            <div class="left">
              <div class="left-one">
                <p class="">快速入口</p>
                <p><a href="">新手指南</a></p>
                <p><a href="">常见问题</a></p>
                <p><a href="">用户协议</a></p>
              </div>
              <div class="left-two">
                <p>帮助文档</p>
                <p><a href="#">备案帮助</a></p>
                <p><a href="#">产品文档</a></p>
                <p><a href="#">开发者资源</a></p>
              </div>
            </div>
          </div>
        </div>
        <!--------------------左边区域----------------->

        <!--------------------中间区域----------------->
        <div class="col-md-4 col-lg-5">
          <div class="media d-flex align-items-center mb-3 p-2">
            <div class="center">
              <p>联系我们</p>
              <span><a href="">认证信息</a></span>
              <span><a href="">网站备案</a></span>
              <span><a href="">隐私声明</a></span>
              <span><a href="">关于我们</a></span>
              <p class="text">公司地址:北京市海淀区北四环西路66号中国技术交易大厦B座</p>
            </div>
          </div>
        </div>
        <!--------------------中间区域----------------->

        <!--------------------右边区域----------------->
        <div class="col-md-4 col-lg-3 three">
          <div class="media d-flex align-items-center mb-3 p-2">
            <div class="right">
              <div class="right-top">
                <span class="iconfont icon-dianhua" data-toggle="tooltip" data-placement="bottom" title="联系电话"></span>
                <p>7x24小时服务</p>
              </div>

              <div class="right-bottom">
                <span class="iconfont icon-weixin" data-toggle="tooltip" data-placement="bottom" title="微信"></span>
                <span class="iconfont icon-weibo" data-toggle="tooltip" data-placement="bottom" title="微博"></span>
                <span class="iconfont icon-xiaochengxu" data-toggle="tooltip" data-placement="bottom"
                      title="小程序"></span>
              </div>

            </div>
          </div>
        </div>
        <!-------------------右边区域----------------->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .footer {
    width: 100%;
    height: 270px;
    background-color: #2e3033;
    color: #fff;
  }

  .footer .media {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left {
    display: flex;
    margin-top: 20px;
    text-align: center;
  }

  .left a, .center a {
    color: gray;
    font-size: 16px;
  }

  .left a:hover, .center a:hover {
    text-decoration: none;
    color: #00a4ff;
  }

  .left .left-one {
    margin-right: 30px;
  }

  .left .left-one p:first-child, .left-two p:first-child {
    font-size: 20px;
  }

  .center {
    margin-top: 20px;
    text-align: center;
  }

  .center p:first-child {
    font-size: 20px;
  }

  .center span {
    margin-right: 20px;
  }

  .center p:last-child {
    margin-top: 20px;
    color: gray;
  }

  .center p:last-child:hover {
    color: #00a4ff;
  }

  .right .right-top {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .right .right-top:hover {
    color: #00a4ff;
  }

  .right .right-top .icon-dianhua {
    font-size: 50px;
  }

  .right .right-top p {
    font-size: 18px;
    margin-left: 14px;
    padding-top: 10px;
  }

  .right-bottom .iconfont {
    font-size: 35px;
    margin: 20px 20px 0 0;
    cursor: pointer;
  }

  .right .right-bottom span:hover {
    color: #00a4ff;
  }

</style>
