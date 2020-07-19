<template>
  <div>
    <div class="nav">
      <!------------导航栏------------>
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <a class="navbar-brand" href="#"><img src="~assets/img/logo.png" alt=""></a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
                  aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">首页<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                  素材库
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#" v-for="item in material">{{item}}</a>
                </div>
              </li>
              <li class="nav-item" v-for="(item,index) in navItem" :key="index">
                <a class="nav-link" href="#">{{item}}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!------------导航栏------------>

      <!------------登录注册------------>
      <div class="right">
        <button type="button" class="btn btn-primary">登录</button>
        <button type="button" class="btn btn-outline-success register">注册</button>
      </div>
      <!------------登录注册------------>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data() {
      return {
        material: ['通用识别', '身份证识别', '银行卡识别',
          '行驶证识别', '驾驶证识别', '营业执照识别', '图片高清化'],
        navItem: ['开放能力', '文档中心', '加入我们']
      }
    }
  }
</script>

<style scoped>
  .nav {
    width: 100%;
    position: relative;
    margin-bottom: 40px;
    border-bottom: 1px solid #f1f1f1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    transition: background-color 0.5s;
  }

  .nav:hover {
    background-color: #f3f3f3;
    /*color: #005cbf;*/
  }

  .nav .navbar img {
    width: 34px;
    height: 34px;
  }

  .dropdown-menu a:hover {
    background-color: #257eeb;
    color: #fff;
  }

  .right {
    position: absolute;
    right: 60px;
    top: 10px;
  }

  .register {
    margin-left: 10px;
  }

</style>
