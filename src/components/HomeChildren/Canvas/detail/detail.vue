<template>
  <Canvas @upload="upload" :result_show="result_title"
          :list="result_list" :show="loading" :err="err"></Canvas>
</template>

<script>
  import Canvas from 'components/HomeChildren/Canvas/Canvas'
    export default {
        name: "detail",
      components:{
        Canvas
      },
      data(){
        return{
          CW: '400px',
          CH: '400px',
          result_title:'身份证OCR识别结果',
          detail:['type','name','gender',
            'nationality','birth','address','id','valid_date','authority'],
          result_list:[],
          pre:['正反面：','名字：','性别：','民族：',
            '出生年月：','地址：','身份证号：','有效日期：','签证机关：'],
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
          this.$axios.post('/ocr/idcard?action=idcard&type=photo&test_sign=yi_ke_shi_ge_sha_diao', forms, config)
            .then(res => {
              console.log(res);
              this.loading=false;
              // this.driving = res.data.ocrcomm_res.items
              const data=res.data;
              if (data.hasOwnProperty("result")) {
                this.err=false;
                let result = data.result;
                let data_to_set = [];
                for (let i = 0; i < this.detail.length; i++) {
                  let result_key = this.detail[i];
                  if (result.hasOwnProperty(result_key)) {
                    data_to_set.push( result[result_key]);
                  }
                }
                console.log(data_to_set)
                this.result_list=[].concat(data_to_set);
                console.log(this.result_list)
                  if(result['type']===0){
                      let obj={};
                      obj.pre=this.pre[0]
                      obj.text='正面';
                      this.result_list[0]=obj;
                      // this.result_list[0].text="正面";
                      for(let j=1;j<this.result_list.length;j++){
                          this.result_list[j].pre=this.pre[j]
                      }
                  }
                  else{
                      let obj={};
                      obj.pre=this.pre[0]
                      obj.text='反面';
                      this.result_list[0]=obj;
                      this.result_list[1].pre=this.pre[7]
                      this.result_list[2].pre=this.pre[8]
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
