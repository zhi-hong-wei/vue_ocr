<template>
    <div class="back-top">
      <img src="~assets/img/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "BackTop"
    }
</script>

<style scoped>
.back-top{
  position: fixed;
  right: 18px;
  bottom: 52px;
  width: 43px;
}
  .back-top img{
    width: 43px;
    height: 43px;
    cursor: pointer;
  }
</style>
