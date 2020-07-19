<template>
  <div class="home">
    <Navigation/>
    <SwiperItem/>
    <tabControl/>
    <Feature/>
    <Scene/>
    <Footer/>
    <BackTop @click.native="backtop" v-show="isshow"/>
  </div>
</template>

<script>
  import Navigation from 'components/HomeChildren/Navigation/Navigation'
  import SwiperItem from 'components/HomeChildren/SwiperItem/SwiperItem'
  import tabControl from 'components/HomeChildren/tabControl/tabControl'
  import Feature from 'components/HomeChildren/Feature/Feature'
  import Scene from 'components/HomeChildren/Scene/Scene'
  import Footer from 'components/HomeChildren/Footer/Footer'
  import BackTop from 'components/common/BackTop/BackTop'

  export default {
    name: 'HomePage',
    components: {
      Navigation,
      SwiperItem,
      tabControl,
      Feature,
      Scene,
      Footer,
      BackTop
    },
    data(){
      return {
        isshow:false
      }
    },
    mounted() {
      window.addEventListener("scroll",this.showbtn,true);
    },
    methods: {
      // 显示回到顶部按钮
      showbtn(){
        let that = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(scrollTop)
        if(scrollTop>500){
          this.isshow=true
        }else {
          this.isshow=false
        }
        that.scrollTop = scrollTop
      },
      // 返回顶部方法，定时器增加视觉效果
      backtop(){
        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          this.isshow = true;
          if(osTop === 0){
            clearInterval(timer);
          }
        },30)
      }
    }
  }
</script>


<style scoped>

</style>
