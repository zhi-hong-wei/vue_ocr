<template>
  <div class="bd-example">
    <div id="carouselExampleCaptions" class="carousel slide"
         data-ride="carousel" data-interval="4000" data-pause="false">
      <!------------------底部控制条------------------>
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
      </ol>
      <!------------------底部控制条------------------>

      <!------------------轮播区域-------------------->
      <div class="carousel-inner box">
        <div class="carousel-item active box-one">
          <slot name="img-one"></slot>
        </div>
        <div class="carousel-item">
          <slot name="img-two"></slot>
        </div>
        <div class="carousel-item">
          <slot name="img-three"></slot>
        </div>
        <div class="carousel-item">
          <slot name="img-four"></slot>
        </div>
      </div>
      <!------------------轮播区域-------------------->

      <!------------------左右控制键------------------>
      <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
      <!------------------左右控制键------------------>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
  }
</script>

<style>
  .box {
    height: 450px;
    width: 94%;
    margin: 0 auto;
    border-radius: 10px;
  }

  .box .box-one {
    height: 100%;
  }
</style>
