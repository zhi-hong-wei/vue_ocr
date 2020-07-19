<template>
  <div class="box1">
    <Swiper>
      <!------------------插槽插入部分----------------->
      <!--<div :slot="item.slot" class="item" v-for="(item,index) in swiper" :key="index">-->
        <!--<img :src="item.image" class="d-block w-100" alt="...">-->
        <!--<div class="carousel-caption d-none d-md-block text">-->
          <!--<h1>{{item.title}}</h1>-->
          <!--<p>{{item.text}}</p>-->
        <!--</div>-->
      <!--</div>-->
      <div slot="img-one" class="item">
        <img src="~assets/img/swiper1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text">
          <h1>微信识图 鉴你所见</h1>
          <p>平凡的生命密码，你读懂了多少</p>
        </div>
      </div>
      <div slot="img-two" class="item">
        <img src="~assets/img/swiper2.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text">
          <h1>微信识图 鉴你所见</h1>
          <p>健康的生活奥义，你是否想一探究竟</p>
        </div>
      </div>
      <div slot="img-three" class="item">
        <img src="~assets/img/swiper3.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text">
          <h1>微信识图 鉴你所见</h1>
          <p>理想的色彩世界，你打算怎么描绘</p>
        </div>
      </div>
      <div slot="img-four" class="item">
        <img src="~assets/img/swiper4.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block text">
          <h1>微信识图 鉴你所见</h1>
          <p>宇宙的浩瀚时空，你真正知道多少</p>
        </div>
      </div>
      <!------------------插槽插入部分----------------->
    </Swiper>

  </div>
</template>

<script>
  import Swiper from 'components/common/Swiper/Swiper'

  export default {
    name: "SwiperItem",
    components: {
      Swiper
    },
    data() {
      return {
        swiper:[]
      }
    },
    created() {
      //
    }
  }
</script>

<style scoped>
  .item {
    position: relative;
    height: 100%;
  }

  .item img {
    height: 450px;
  }

  .item .text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -50%);
  }

  .item .text h1 {
    font-size: 52px;
    margin-bottom: 20px;
  }

  .item .text p {
    letter-spacing: 5px;
    font-size: 22px;
    width: 450px;
  }

</style>
