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
            let X1 = show.pos.left_top.x * widthScal + this.IL
            let Y1 = show.pos.left_top.y * widthScal + this.IT
            let X2 = show.pos.right_top.x * widthScal + this.IL
            let Y2 = show.pos.right_top.y * widthScal + this.IT
            let X3 = show.pos.right_bottom.x * widthScal + this.IL
            let Y3 = show.pos.right_bottom.y * widthScal + this.IT
            let X4 = show.pos.left_bottom.x * widthScal + this.IL
            let Y4 = show.pos.left_bottom.y * widthScal + this.IT

            this.CTX.strokeStyle = 'blue';
            this.CTX.beginPath();
            this.CTX.moveTo(X1, Y1)
            this.CTX.lineTo(X2, Y2)

            this.CTX.moveTo(X2, Y2)
            this.CTX.lineTo(X3, Y3)

            this.CTX.moveTo(X3, Y3)
            this.CTX.lineTo(X4, Y4)

            this.CTX.moveTo(X4, Y4)
            this.CTX.lineTo(X1, Y1)
            this.CTX.stroke()
            // 区别横框竖框，画序号及小框
            if ((X3 - X4) > (Y4 - Y1)) {
              this.CTX.beginPath();
              this.CTX.moveTo(X4, Y4)
              this.CTX.lineTo(X4 - (Y4 - Y1), Y4)

              this.CTX.moveTo(X4 - (Y4 - Y1), Y4)
              this.CTX.lineTo(X4 - (Y4 - Y1), Y4 - (Y4 - Y1))

              this.CTX.moveTo(X4 - (Y4 - Y1), Y4 - (Y4 - Y1))
              this.CTX.lineTo(X1, Y1)
              this.CTX.stroke()
              // 画序号
              let w_h = Y4 - Y1
              let fontsize = w_h + 'px'
              let fontFamily = "宋体"
              let Num_font = fontsize + ' ' + fontFamily
              this.CTX.font = Num_font
              this.CTX.fillStyle = '#006bff'
              this.CTX.fillText(i + 1, X4 - (Y4 - Y1) / 2, Y4)
              this.CTX.textAlign = 'center'

            } else {
              this.CTX.beginPath();
              this.CTX.moveTo(X1, Y1)
              this.CTX.lineTo(X1, Y1 - (X2 - X1))

              this.CTX.moveTo(X1, Y1 - (X2 - X1))
              this.CTX.lineTo(X2, Y2 - (X2 - X1))

              this.CTX.moveTo(X2, Y2 - (X2 - X1))
              this.CTX.lineTo(X2, Y2)
              this.CTX.stroke()

              let W_H = X2 - X1
              let fontsize=W_H+'px'
                let fontFamily="宋体"
                let Num_font=fontsize+' '+fontFamily
                this.CTX.font=Num_font
              this.CTX.fillStyle='#006bff'
              this.CTX.fillText(i + 1, X1 + (X2 - X1) / 2, Y1, W_H)
              this.CTX.textAlign='center'
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
