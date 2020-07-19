<template>
  <div class="canvas-contain">
    <div class="canvas-background">
      <!--------------上传图片的画布----------------->
      <div class="clipImageBox">
        <div class="canvasBox left-box">
          <div class="canvas-out">
            <p>原始图片</p>
            <canvas :width="CW" :height="CH" ref="canvas"></canvas>
          </div>
        </div>

        <!--------------上传按钮----------------------->
        <div class="buttonBox">
          <input type="file" accept="image/*" class="file" ref="file" @change="changeFunc"/>
          <button @click="clickFunc">选择图片</button>
          <span>或</span>
          <div class="input-button">
            <input type="text" placeholder="输入在线图片URL">
            <button style="width:80px;margin-left: -5px">检测</button>
          </div>
          <p>支持PNG、JPG、JPEG等格式，图片大小若超过 5M 会被压缩。</p>
        </div>
        <!--------------上传按钮----------------------->
      </div>
      <!--------------上传图片的画布----------------->

      <!--------------显示结果的画布----------------->
      <div class="clipImageBox">
        <div class="canvasBox">
          <div class="result-title">{{result_title}}</div>
          <!--<canvas width="450px" height="455px" ref="canvas-show">-->
          <div class="result">
            <img src="~assets/img/loading2.gif" alt="" v-show="show" class="img">
            <div class="list">
              <img :src="super_resolution" alt="">
            </div>
          </div>
          <!--</canvas>-->
        </div>
      </div>
      <!--------------显示结果的画布----------------->
    </div>
  </div>
</template>

<script>
  export default {
    name: "super_resolution",
    data() {
      return {
        CW: '400px',
        CH: '400px',
        IW: 0,
        IH: 0,
        IL: 0,
        IT: 0,
        result_title: '图片高清化结果',
        super_resolution: '',
        show: false,
      }
    },
    methods: {
      clickFunc() {
        // 触发FILE选择文件的操作
        this.$refs.file.click();
      },
      changeFunc() {
        // 选择了新的图片
        // console.dir(this.$refs.file)
        let file = this.$refs.file.files[0];
        // console.dir(file)
        this.show = true
        if (!file) return;
        // 先基于FileReader进行文件的读取
        let fileExample = new FileReader();
        // console.dir(fileExample)
        fileExample.readAsDataURL(file);
        fileExample.onload = ev => {
          // 创建新图片
          // console.dir(ev)
          this.IMAGE = new Image();
          this.IMAGE.src = ev.target.result;
          this.IMAGE.onload = () => {
            this.IW = this.IMAGE.width;
            this.IH = this.IMAGE.height;
            const NCW = parseInt(this.CW);
            const NCH = parseInt(this.CW);
            // 重新按照比例计算宽高
            let n = 1;
            if (this.IW > this.IH) {
              n = this.IW / NCW;
              this.IW = NCW;
              this.IH = this.IH / n;
            } else {
              n = this.IH / NCH;
              this.IH = NCH;
              this.IW = this.IW / n;
            }
            this.IL = (NCW - this.IW) / 2;
            this.IT = (NCH - this.IH) / 2;
            // 绘制图片
            this.drawImage();

            //上传文件1
            this.uploadImg(file)
          };
        }
      },
      drawImage() {
        // 创建2D渲染画布
        this.CTX = this.$refs.canvas.getContext("2d");
        // 清空画布
        this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
        // 绘制图片
        this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);
      },
      uploadImg(file) {
        var forms = new FormData();
        forms.append('file', file)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        this.$axios.post('/apidebug_imagequery?action=super_resolution', forms, config)
          .then(res => {
            this.show = false
            console.log(res);
            this.super_resolution = res.data.img_url
          })
          .catch(err => {
            //补充异常处理代码
            console.log(err)
          })
      },
    }
  }
</script>

<style scoped>
  .canvas-background {
    border: 1px solid #f1f1f1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    width: 86%;
    height: 600px;
    margin: 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .clipImageBox {
    width: 45%;
  }

  .left-box {
    display: flex;
    justify-content: center;
  }

  .clipImageBox .canvasBox {
    position: relative;
    overflow: hidden;
  }

  .clipImageBox .canvasBox canvas {
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    border: 2px solid #ddd;
  }

  .canvas-out {
    position: relative;
    width: 400px;
  }

  .clipImageBox .canvasBox p {
    position: absolute;
    left: 0;
    top: 0;
    width: 70px;
    height: 35px;
    padding: 5px;
    font-size: 12px;
    background-color: #F7F8FA;
    color: gray;
    border: 1px solid #d5d5d5;
    text-align: center;
  }

  .result-title {
    background-color: #F7F8FA;
    width: 450px;
    height: 40px;
    margin: 0 auto;
    font-size: 16px;
    box-sizing: border-box;
    border: 2px solid #ddd;
    border-bottom: 0 solid #ddd;
    padding-left: 10px;
    line-height: 40px;
  }

  .result {
    margin: 0 auto;
    width: 450px;
    height: 455px;
    border: 2px solid #ddd;
    box-sizing: border-box;
    padding: 20px;
    overflow: auto;
  }

  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-60%);
  }

  .list {
    margin: 10px 0;
    display: flex;
  }

  .index {
    width: 24px;
    height: 24px;
    text-align: center;
  }

  .text {
    margin-left: 20px;
  }

  .clipImageBox .buttonBox .file {
    display: none;
  }

  .clipImageBox .buttonBox {
    text-align: center;
    margin: 10px 0 10px 12px;
  }

  .clipImageBox .buttonBox button {
    margin-right: 10px;
    padding: 10px;
    border: none;
    font-size: 14px;
    width: 100px;
    line-height: 20px;
    cursor: pointer;
    color: #fff;
    background-color: #257eeb;
    border-radius: 4px;
  }

  .clipImageBox .buttonBox button:hover {
    background-color: #0033d9;
  }

  .clipImageBox .buttonBox span {
    margin-right: 10px;
  }

  .clipImageBox .buttonBox input {
    height: 40px;
    box-sizing: border-box;
    font-size: 14px;
    padding: 0 10px;
  }

  .input-button {
    border-radius: 5px;
    display: inline-block;
  }

  .clipImageBox .buttonBox p {
    opacity: .5;
    font-size: 12px;
    line-height: 20px;
    margin: 10px auto;
  }
</style>
