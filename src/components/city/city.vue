<!--  -->
<template>
  <div class="city-box">
    <div class="city-top clearfix">
      <div class="city-image" id="map" :style="{width:'545px',height:'575px'}">
      </div>
      <div class="city-data">
        <div class="city-number">
          <div class="item">
            <span>{{Mpubcount}}</span>
            <p>庄稼医院( 所 )</p>
          </div>
          <div class="item">
            <span>{{Usercount}}</span>
            <p>会员( 个 )</p>
          </div>
          <div class="item">
            <span>{{Expertcount}}</span>
            <p>专家( 位 )</p>
          </div>
          <div class="item">
            <span>{{Totalview.total}}</span>
            <p>诊疗( 次 )</p>
          </div>
        </div>
      </div>
      <div class="server-box"></div>
    </div>
    <div class="city-bottom clearfix">
      <p class="audio-text">视频诊疗室</p>
      <a @click="goHref" class="tv-href"></a>
      <a class="dingding" href="dingtalk://dingtalkclient/page/link?url="></a>
      <!-- <a @click="goHref" class="city-href"><img src="./city-href.png" alt=""></a> -->
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/map')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import zj from 'echarts/map/json/province/zhejiang'
import Swiper from 'swiper'

export default {
  data () {
    return {
      showFlag:0
    };
  },
  props:{
    Mpubcount:String,
    Usercount:Number,
    Expertcount:String,
    Fstusername:String,
    FstRoomid:String,
    Fstuserpw:String,
    cityActive:{
      type:Number,
      default:0
    },
    provinceList:{
      type:Array,
      default:function(){
        return []
      }
    },
    Description:String, // 医院介绍文案
    Totalview:Object, //诊疗次数数据 
    Hotmpdata:{  //专科医院介绍+诊疗视频图片
      type:Array,
      default:function(){
        return []
      }
    }
  },
  // components: {},
  computed:{
    cityList(){
      let arr = []
      for(let i = 0;i<this.provinceList.length;i++){
        arr.push(this.provinceList[i].name)
      }
      return arr.reverse();
    },
    cityNum(){
       let arr = []
      for(let i = 0;i<this.provinceList.length;i++){     
        arr.push(this.provinceList[i].nums)
      }
      return arr.reverse();
    },
    barGapArr(){
      let arr = []
      let length = this.cityNum.length
      for(let i =0;i<length;i++){
        arr.push(this.cityNum[length - 1])
      }
      return arr
    },
    cityData(){
      let cityName = this.cityList.concat([]).splice(0,this.cityList.length - 1).reverse()
      let num = this.cityNum.concat([]).splice(0,this.cityNum.length - 1).reverse()
      let arr = []
      for(let i = 0;i<cityName.length;i++){
        arr.push({name:`${cityName[i]}市`,value:num[i],selected:false})
      }
      arr[this.cityActive].selected = true
      // arr[this.cityActive].value = this.cityActive
      return arr
    }
  },
  methods: {
    goHref:function() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf(" chrome/") >= 0 || ua.indexOf(" firefox/") >= 0 || ua.indexOf(' gecko/') >= 0) {
        var StringMaker = function () {
          this.str = "";
          this.length = 0;
          this.append = function (s) {
            this.str += s;
            this.length += s.length;
          }
          this.prepend = function (s) {
            this.str = s + this.str;
            this.length += s.length;
          }
          this.toString = function () {
            return this.str;
          }
        }
      } else {
        var StringMaker = function () {
          this.parts = [];
          this.length = 0;
          this.append = function (s) {
            this.parts.push(s);
            this.length += s.length;
          }
          this.prepend = function (s) {
            this.parts.unshift(s);
            this.length += s.length;
          }
          this.toString = function () {
            return this.parts.join('');
          }
        }
      }


      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

      function encode64(input) {
        var output = new StringMaker();
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output.append(keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4));
        }

        return output.toString();
      }

      let str = `{http://47.97.61.230:8080/download/ZNZX_for_Windows_V3.13.5.8.exe}{Fastonz}{FMDesktop}{-link TCP:47.97.61.230:1089 -uname ${this.Fstusername} -upwd ${this.Fstuserpw} -utype 1 -rid ${this.FstRoomid} -stype 1}`
      str = encodeURIComponent(str)
      let url = "launcher.fsm://" + encode64(str)
      console.log(str)
      
      window.location.href = url
      
    },
    initMap(){
      let that = this
      // 注册可用的地图
      let mapEcharts = echarts.init(document.getElementById('map'))
      echarts.registerMap('zhejiang', zj);
      mapEcharts.setOption({
                    tooltip: {
                        trigger: 'item',
                        axisPointer: {
                            type: 'shadow',
                            shadowWidth:'60%'
                        },
                        formatter: '{b}: {c}所医院'
                    },
                    series: [
                        {
                          name: '浙江地图',
                          type: 'map',
                          map: 'zhejiang',
                          mapType: 'zj',
                          roam: false,
                          zoom: 1.2,
                          selectedMode: 'single', 
                          itemStyle:{
                              normal:{
                                  areaColor: '#226DBF',
                                  label:{
                                      show:true,
                                      textStyle: {
                                          color: '#fff',
                                          fontSize: 16
                                      }
                                  },
                              },
                              emphasis:{
                                  areaColor: '#F79D1D',
                                  label:{
                                      show:true,
                                      textStyle: {
                                          color: '#000',
                                          fontSize:16
                                      }
                                  }
                                    
                              }
                            },
                          data:this.cityData
                        }
                    ]
                },true); 
          mapEcharts.off('click') 
          mapEcharts.on('click',function(params){
            that.$emit('mapFn',params.name,params.dataIndex)
          
          })         
      }
  },

  mounted(){
    this.initMap()
    // new Swiper('.swiper-container', {
    //       autoplay: {
    //         delay: 18000,
    //         stopOnLastSlide: false,
    //         disableOnInteraction: true
    //       },
    //       loop : true
    //     })
  },
  watch:{
    cityActive(){
      this.initMap()
    },
    
  },
  // created() {
  // },
  // components:{
   
  // }
  // methods: {}
}

</script>
<style lang='stylus' scoped>
.city-box
  padding-top 100px
  .city-top
    padding-top 63px
    padding-bottom 6px
    .city-image
      width 545px
      height 575px
      margin-left 100px
      margin-right 95px
      float left
      & > img
        width 100%
        height 100%
    .city-data
      width 516px
      margin-bottom 25px
      position relative
      float left
      .city-number
        height 80px
        & > .item
          width 25%
          float left
          text-align center
          & > span
            font-size 30px
            color #f79d1d
            line-height 30px
            margin 13px 0 8px
            display block
          & > p
            font-size 14px
            color #7fb5f1
        &:after
          content ''
          position absolute
          top 0
          left 0
          width 100%
          height 2px
          background url('./border-longest.png') no-repeat
        &:before
          content ''
          position absolute
          bottom 0
          left 0
          width 100%
          height 2px
          background url('./border-longest.png') no-repeat
        .data-box
          width 415px
          height 445px
    .server-box
      float left
      width 510px
      height 400px
      background url('./servers.png') no-repeat
      margin-top 40px
  .city-bottom
    margin-top 17px
    height 164px
    position relative
    padding-left 430px
    .audio-text
      font-size 28px
      color #ffffff
      position absolute
      left 155px
      top 68px
      font-weight 400
      letter-spacing 2px
    .dingding
      float left
      display block
      color #F79D1D
      width 332px
      height 102px
      background url('./dingding.png') no-repeat
      background-position center
      margin 32px 20px 0 66px
      cursor pointer
    .city-href
      width 647px
      height 126px
      float left
      margin-top 23px
      margin-left 62px
      cursor pointer
      & > img
        display block
        width 100%
        height 100%
    .tv-href
      float left
      display block
      width 332px
      height 102px
      background url('./yinongbao.png') no-repeat
      cursor pointer
      margin-top 32px
</style>