<template>
  <Canvas @upload="upload" :result_show="result_title"
          :list="ocr_comm" :show="loading" :err="err"></Canvas>
</template>

<script>
  import Canvas from 'components/HomeChildren/Canvas/Canvas'

  export default {
    name: "ocr_comm",
    components: {
      Canvas
    },
    data() {
      return {
        CW: '400px',
        CH: '400px',
        result_title: '通用OCR识别结果',
        ocr_comm: [],
        loading: false,
        err: false
      }
    },
    methods: {
      async upload(file, canvas) {
        // console.log(file)
        if (!file) return;
        // 加载图标显示
        this.loading = true
        // 图片缩放比例
        let widthScal = 0
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
            widthScal = this.IW / this.IMAGE.width;

            // console.log(zoom.width)
            // 绘制图片
            this.CTX = canvas.getContext("2d");
            // 清空画布
            this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
            // 绘制图片
            this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);

          };
        }
        //上传文件
        await this.uploadImg(file)
        this.strokeRect(widthScal)
      },

      strokeRect(widthScal) {
        if (this.ocr_comm.length !== 0) {
          for (let i = 0; i < this.ocr_comm.length; i++) {
            // console.log(this.ocr_comm)
            let show = this.ocr_comm[i]
            // 原图坐标
            // console.log(show)
            let X1 = show.pos.left_top.x
            let Y1 = show.pos.left_top.y
            let X2 = show.pos.right_bottom.x
            let Y2 = show.pos.right_bottom.y
            let startPoint = [X1, Y1],
              endPoint = [X2, Y2];
            let Num_x = startPoint[0] * widthScal + this.IL
            let Num_y = startPoint[1] * widthScal + this.IT
            let Num_width = (endPoint[0] - startPoint[0]) * widthScal
            let Num_height = (endPoint[1] - startPoint[1]) * widthScal
            this.CTX.strokeStyle = 'blue';
            this.CTX.strokeRect(Num_x, Num_y, Num_width, Num_height);
            if (Num_width < Num_height) {
              let top_x = Num_x
              let top_y = (startPoint[1] - (endPoint[0] - startPoint[0])) * widthScal + this.IT
              let w_h = Num_width
              console.log(w_h)
              this.CTX.strokeStyle = '#006bff'
              this.CTX.fillStyle = '#006bff'
              this.CTX.fillText(i + 1, Num_x + (w_h / 2), Num_y, w_h)
              this.CTX.strokeRect(top_x, top_y, w_h, w_h)
              this.CTX.textAlign = 'center'
            } else {
              let left_X = (startPoint[0] - (endPoint[1] - startPoint[1])) * widthScal + this.IL
              let left_Y = Num_y
              let W_H = Num_height

              this.CTX.strokeStyle = '#006bff'
              this.CTX.fillStyle = '#006bff'
              this.CTX.fillText(i + 1, left_X + W_H / 2, left_Y + W_H, W_H)
              this.CTX.strokeRect(left_X, left_Y, W_H, W_H)
              this.CTX.textAlign = 'center'
            }

          }
        } else {
          console.log("数据未取到")
        }
      },

      async uploadImg(file) {
        var forms = new FormData();
        forms.append('file', file)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        // let obj = new Promise(function(resolve, reject){
        await this.$axios.post('/apidebug_imagequery?action=ocr_comm', forms, config)
          .then(res => {
            console.log(res);
            this.loading = false
            if (res.data.ocrcomm_res.items.length !== 0) {
              this.ocr_comm = res.data.ocrcomm_res.items
              console.log(this.ocr_comm)
              this.err = false
            } else {
              this.ocr_comm = []
              this.err = true
            }
            // resolve(this.ocr_comm)
          }).catch(err => {
            //补充异常处理代码
            console.log(err)
          })
        // return obj
        // })

      },
    }
  }
</script>

<style scoped>

</style>
