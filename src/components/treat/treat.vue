<!--  -->
<template>
  <div class="treat-box">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(item,index) in Mplocaldata" class="swiper-slide">
          <div class="treat-title1">{{item.name}}</div>
          <ul class="treat-number">
            <li>
              <!-- <div class="ads-label">
                <div class="label">位置:</div>
                <div class="text">{{item.position}}
                </div>
              </div>
              <div class="ads-label">
                <div class="label">诊疗科室:</div>
                <div class="text">{{item.keshi}}</div>
              </div> -->
              <div class="swiper-box">
                <div class="swiper-container2">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in item.pic">
                      <img :src="item.url" alt="">
                      <div class="title">{{item.alt}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="treat-title2">余杭本地专家</div>
    <ul class="nums">
      <li v-for="(item,index) in afterExpphdata">
        <div class="num" :style={color:item.color}>{{index+1}}</div>
        <div class="person-img">
          <img :src="item.avatar" alt="">
        </div>
        <div class="name">{{item.name}}</div>
        <div class="total-num">{{item.duty}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Swiper from 'swiper'
let colorArr = ['#FA4647','#F79D1D','#7FB5F1','#0963B1','#0963B1']
  export default {
    data() {
      return {};
    },
    props:{
      Mplocaldata:{
        type:Array,
        default:function(){
          return []
        }
      },
        Explocaldata:{  //专家解答数排行
          type:Array,
          default:function(){
            return []
          }
        }
    },
    // components: {},

    computed: {
      afterExpphdata(){
        for(let i = 0;i < this.Explocaldata.length;i++){
          this.Explocaldata[i].color = colorArr[i]
        }
        return this.Explocaldata
      },
      swiperTime(){
        let time = this.Mplocaldata[0].pic.length * 3000
        return (time + 330)
      }
    },

    mounted() {
      let that = this
      new Swiper('.swiper-container', {
          autoplay: {    
            delay: that.swiperTime,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          loop : true
        })
        new Swiper('.swiper-container2', {
          autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
          },
          loop : true
        })
    },

    methods: {
    
    },
    watch:{
     
    }
  }

</script>
<style lang='stylus' scoped>
.treat-box
  margin-top 100px
  position relative
  .treat-title1
    font-size 22px
    padding 21px 0 0 22px
    line-height 45px
    text-indent 18px
  .treat-number
    padding-left 25px
    margin-top 20px
    height 327px
    li
      position relative
      padding-top 8px
      .ads-label
        margin-bottom 5px
        position relative
        padding-left 60px
        font-size 12px
        font-family SimSun
        font-weight 400
        color #7FB5F1
        line-height 24px
        &>.label
          position absolute
          left 0
          top 0
          width 60px
          text-align justify
          &:after
            content ''
            width 100%
            height 0
            margin 0
            display inline-block
            overflow hidden
        &>.text
          width 302px
          letter-spacing 1px
      .swiper-box
        width 335px
        height 315px
        margin 0 auto
        text-align center
        overflow hidden
        font-size 14px
        margin-left 14px
        .swiper-container2
          width 100%
          height 100%
          img
            display block
            // width 200px
            // height 155px
            width 335px
            height 265px
            margin-bottom 20px
  .treat-title2
    padding 0 22px
    text-indent 20px
    font-size 22px
    line-height 45px
  .nums
    padding-top 30px
    & > li
      font-size 0
      padding-left 32px
      margin-bottom 10px
      .num
        font-size 25px
        font-weight bold
        color #FA4647
        display inline-block
        vertical-align middle
        margin-right 25px
        font-style italic
      .person-img
        display inline-block
        vertical-align middle
        width 50px
        height 50px
        border-radius 100%
        background #7FB5F1
        margin 0 20px 0 25px
        overflow hidden
        & > img
          width 100%
      .name
        font-size 20px
        color #ffffff
        display inline-block
        vertical-align middle
        margin-left 20px
        margin-right 35px
      .total-num
        font-size 20px
        margin-left 35px
        float right
        margin 16px 34px 0 0
        color #7FB5F1
</style>
