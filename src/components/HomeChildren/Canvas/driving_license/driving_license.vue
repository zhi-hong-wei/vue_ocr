<template>
  <Canvas @upload="upload" :result_show="result_title"
          :list="result_list" :show="loading" :err="err"></Canvas>
</template>

<script>
  import Canvas from 'components/HomeChildren/Canvas/Canvas'
    export default {
        name: "driving_license",
      components:{
        Canvas
      },
      data(){
        return{
          CW: '400px',
          CH: '400px',
          result_title:'驾驶证OCR识别结果',
          driving_license:['id_num','name','sex','nationality',
                'address','birth_date','issue_date','car_class','valid_from','valid_to','official_seal'],
          result_list:[],
          pre:['证号：','姓名：','性别：','国籍：','住址：', '出生日期：','初次领证日期：','准驾车型：','有效起始日期：','有效终止日或年限：','印章文字：',],
          loading:false,
          err:false
        }
      },
      methods:{
        upload(file,canvas){
          // console.log(file)
          if (!file) return;
          this.loading=true
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
              this.CTX = canvas.getContext("2d");
              // 清空画布
              this.CTX.clearRect(0, 0, parseInt(this.CW), parseInt(this.CH));
              // 绘制图片
              this.CTX.drawImage(this.IMAGE, this.IL, this.IT, this.IW, this.IH);

              //上传文件1
              this.uploadImg(file)
            };
          }
        },
        uploadImg(file) {
          var forms = new FormData();
          forms.append('file', file)
          let config = {
            headers: {'Content-Type': 'multipart/form-data'}
          };
          this.$axios.post('/ocr/idcard?action=driving_license&test_sign=yi_ke_shi_ge_sha_diao', forms, config)
            .then(res => {
              console.log(res);
              this.loading=false;
              // this.driving = res.data.ocrcomm_res.items
              const data=res.data;
              if (data.hasOwnProperty("driving_license_result")) {
                this.err=false;
                let result = data.driving_license_result;
                let data_to_set = [];
                for (let i = 0; i < this.driving_license.length; i++) {
                  let result_key = this.driving_license[i];
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
