<template>
  <Canvas @upload="upload" :result_show="result_title"
          :list="result_list" :show="loading" :err="err"></Canvas>
</template>

<script>
  import Canvas from 'components/HomeChildren/Canvas/Canvas'
    export default {
        name: "bankcard",
      components:{
        Canvas
      },
      data(){
        return{
          CW: '400px',
          CH: '400px',
          result_title:'银行卡OCR识别结果',
          bankcard:['number'],
          result_list:[],
          pre:['卡号：'],
          pos_card:'',
          loading:false,
          err:false
        }
      },
      methods:{
       async upload(file,canvas){
          // console.log(file)
          if (!file) return;
          this.loading=true
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

              // 绘制图片
              this.CTX = canvas.getContext("2d");
              // 清空画布
              this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
              // 绘制图片
              this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);

              //上传文件1

            };
          }
         await this.uploadImg(file)
         this.strokeRect(widthScal)
        },

        strokeRect(widthScal){
          let show=JSON.parse(this.pos_card)
          // console.log(show)
          let X1 = show.card_position.pos.left_top.x * widthScal + this.IL
          let Y1 = show.card_position.pos.left_top.y * widthScal + this.IT
          let X2 = show.card_position.pos.right_top.x * widthScal + this.IL
          let Y2 = show.card_position.pos.right_top.y * widthScal + this.IT
          let X3 = show.card_position.pos.right_bottom.x * widthScal + this.IL
          let Y3 = show.card_position.pos.right_bottom.y * widthScal + this.IT
          let X4 = show.card_position.pos.left_bottom.x * widthScal + this.IL
          let Y4 = show.card_position.pos.left_bottom.y * widthScal + this.IT
          this.CTX.strokeStyle = 'red';
          this.CTX.lineWidth=3;
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

          let numX1 = show.number.pos.left_top.x * widthScal + this.IL
          let numY1 = show.number.pos.left_top.y * widthScal + this.IT
          let numX2 = show.number.pos.right_top.x * widthScal + this.IL
          let numY2 = show.number.pos.right_top.y * widthScal + this.IT
          let numX3 = show.number.pos.right_bottom.x * widthScal + this.IL
          let numY3 = show.number.pos.right_bottom.y * widthScal + this.IT
          let numX4 = show.number.pos.left_bottom.x * widthScal + this.IL
          let numY4 = show.number.pos.left_bottom.y * widthScal + this.IT
          this.CTX.strokeStyle = 'yellow';
          this.CTX.lineWidth=1;
          this.CTX.beginPath();
          this.CTX.moveTo(numX1, numY1)
          this.CTX.lineTo(numX2, numY2)

          this.CTX.moveTo(numX2, numY2)
          this.CTX.lineTo(numX3, numY3)

          this.CTX.moveTo(numX3, numY3)
          this.CTX.lineTo(numX4, numY4)

          this.CTX.moveTo(numX4, numY4)
          this.CTX.lineTo(numX1, numY1)
          this.CTX.stroke()
        },

       async uploadImg(file) {
          var forms = new FormData();
          forms.append('file', file)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
         await this.$axios.post('/ocr/idcard?action=bankcard&test_sign=yi_ke_shi_ge_sha_diao&useruin=1008611', forms, config)
            .then(res => {
              console.log(res);
              this.loading=false;
              // this.driving = res.data.ocrcomm_res.items

              const data=res.data;
              if (data.hasOwnProperty("bankcard_result")) {
                this.err=false;
                let result = data.bankcard_result;
                this.pos_card=JSON.stringify(result);
                let data_to_set = [];
                for (let i = 0; i < this.bankcard.length; i++) {
                  let result_key = this.bankcard[i];
                  if (result.hasOwnProperty(result_key) && result[result_key].hasOwnProperty('text')) {
                    data_to_set.push( result[result_key]);
                  }
                }
                // console.log(data_to_set)
                this.result_list=[].concat(data_to_set)
                // console.log(this.aa)
                for(let j=0;j<this.result_list.length;j++){
                  this.result_list[j].pre=this.pre[j]
                }
              }else{
                this.result_list=[];
                this.err=true
              }
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

</style>
