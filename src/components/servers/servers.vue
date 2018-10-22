<!--  -->
<template>
  <div class="servers-box">
    <div class="servers-title">四级服务体系</div>
    <div class="item item1">
      <div class="item-icon">省</div>
      <div class="item-h3">
        浙江省网上庄稼医院
      </div>
    </div>
    <div class="item item2">
      <div class="item-icon">市</div>
      <ul class="item2-ul clearfix">
        <li v-bind:class="{'active':isActive === index}" @click="getCityData(item.substr(0,3),index)" v-for="(item,index) in cityArray">{{item}}</li>
      </ul>
    </div>
    <div class="item item3">
      <div class="item-icon">县</div>
      <div class="item-hospital-container">
        <div class="title">区县中心医院</div>
        <div class="item-hospital-text">
          <h6>{{countychart[0].value}}</h6>
          <p>{{countychart[0].name}}（所）</p>
        </div>
        <div class="item-hospital-text">
          <h6>{{countychart[1].value}}</h6>
          <p>{{countychart[1].name}}（所）</p>
        </div>
      </div>
      <div class="number-data" id="numberData1" ref="mychart1" :style="{width: '140px', height: '140px'}">

      </div>
      <div class="ratio">
        <span>占比</span><br/>{{ratio1}}</div>
    </div>
    <div class="item item3 item4">
      <div class="item-icon">乡</div>
      <div class="item-hospital-container">
        <div class="title">乡镇专科/综合医院</div>
        <div class="item-hospital-text">
          <h6>{{townArray[0].value}}</h6>
          <p>{{townArray[0].name}}（所）</p>
        </div>
        <div class="item-hospital-text">
          <h6>{{townArray[1].value}}</h6>
          <p>{{townArray[1].name}}（所）</p>
        </div>
      </div>
      <div class="number-data" id="numberData2" :style="{width: '140px', height: '140px'}">

      </div>
      <div class="ratio">
        <span>占比</span><br/>{{ratio2}}</div>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  data () {
    return {
      
    };
  },
  props:{
    cityArray:{
      type:Array,
      default:function(){
        return ["杭州市院","宁波市院","温州市院","嘉兴市院","湖州市院","绍兴市院","金华市院","衢州市院","舟山市院","台州市院","丽水市院"]
      }
    },
    countychart:{
      type:Array,
      default:function(){
        return []
      }
    },
    townArray:{
      type:Array,
      default:function(){
        return []
      }
    },
    isActive:{
      type:Number,
      default:0
    }
  },
  // components: {},

  computed: {
    ratio1(){
     let num = this.countychart[0].value / parseInt(this.countychart[1].value)
     num = `${(num*100).toFixed(0)}%`
     return num
    },
    ratio2(){
     let num = this.townArray[0].value / parseInt(this.townArray[1].value)
     num = `${(num*100).toFixed(0)}%`
     return num
    },
    op1(){
      let that = this
      let obj = {
        tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        show:false,
      },
       color: ['#7FCCE3','#AFD482','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)'],
      series: [
          {
            name:'中心医院',
            type:'pie',
            radius: ['55%', '85%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '0',
                        fontWeight: '100'
                    }
                }
            },
              labelLine: {
                  normal: {
                      show: true
                  }
              },
              data:[
                  {value:that.countychart[0].value, name:that.countychart[0].name},
                  {value:(that.countychart[1].value - that.countychart[0].value), name:that.countychart[1].name}
              ]
          }
      ]}
      return obj
    }
  },

  mounted() {
    this.drawLine()
    this.drawLine2()
  },

  methods: {  
    getCityData(city,index){
      this.$emit('getCity',city,index)
    },
    drawLine() {
      let dom = this.$refs.mychart1
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('numberData1'))
      // 绘制图表
      myChart.setOption(this.op1)
    },
     drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart2 = echarts.init(document.getElementById('numberData2'))
      // 绘制图表
      myChart2.setOption({
        tooltip: {
        trigger: 'item',
        show:false,
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
          {
            name:'乡镇医院',
            type:'pie',
            radius: ['55%', '85%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '0',
                        fontWeight: '100'
                    }
                }
            },
              labelLine: {
                  normal: {
                      show: true
                  }
              },
              data:[
                  {value:this.townArray[0].value, name:this.townArray[0].name},
                  {value:(this.townArray[1].value-this.townArray[0].value), name:this.townArray[1].name}
              ]
          }
      ],
      color: ['#7FCCE3','#AFD482','rgb(249,205,173)','rgb(200,200,169)','rgb(131,175,155)']
      })
    }
  },
  watch:{
    countychart(){
      this.drawLine()
    },
    townArray(){
       this.drawLine2()
    }
  }
}
</script>
<style lang='stylus' scoped>
.servers-box
  padding-top 100px
  .servers-title
    font-size 22px
    margin 20px 0 0 21px
    line-height 45px
    padding-left 20px
  .item
    background url('./border-long.png') no-repeat bottom left
    padding-left 63px
    padding-bottom 30px
    position relative
    margin-left 20px
    padding-top 20px
    position relative
    .number-data
      position absolute
      right 30px
      top 75px
    .ratio
      text-align center
      font-size 24px
      color #AFD482
      position absolute
      right 72px
      top 117px
      font-weight bold
      width 52px
      & > span
        font-size 14px
        color #ffffff
        font-weight 100
    &.item2
      padding-bottom 15px
    &.item4
      background none
    .item-icon
      width 42px
      height 42px
      background url('./icon-01.png') no-repeat 100%
      position absolute
      left 0
      top 19px
      text-align center
      line-height 42px
      font-size 18px
    .item-h3
      margin-top 12px
      margin-bottom 10px
      font-size 16px
    .item2-ul
      width 275px
      margin-top 7px
      li
        float left
        padding 5px
        border 1px solid rgba(0, 0, 0, 0)
        margin 0 15px 15px 0
        font-size 16px
        cursor pointer
        &.active
          border 1px solid rgba(247, 157, 29, 1)
          color #F79D1D
    .item-hospital-container
      width 148px
      .title
        font-size 16px
        line-height 18px
        margin-top 11px
        padding-bottom 23px
        background url('./border-short.png') no-repeat bottom left
      .item-hospital-text
        text-align center
        background url('./border-short.png') no-repeat bottom left
        padding 10px 0
        &>h6
          font-size 24px
          color #91B276
          line-height 26px
          margin-bottom 6px
</style>