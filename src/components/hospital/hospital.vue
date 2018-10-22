<!--  -->
<template>
  <div class="hospital-box clearfix">
    <div class="hospital-title">{{cityName}}地区医院占比</div>
    <div class="hospital-number-box" v-show="showFlag">
      <h5>{{count}}</h5>
      <p>庄稼医院（所）</p>
    </div>
    <div v-show="showFlag">
      <div class="data1" id="pie1" :style="{width:'100%',height:'234px'}"></div>
    </div>
    <div class="hospital-title2" v-show="showFlag">
      <div class="icon" v-show="icon == 2"></div>
      {{apiece.name}}
    </div>
    <div class="pospital-h6" v-show="showFlag">诊疗数据</div>
    <div class="data2" id="apiece" :style="{width:'376px',height:'250px'}" v-show="showFlag"></div>
    <div class="noData-box" v-show="!showFlag">
      <p>该地区暂无医院</p>
      <span>敬请期待</span>
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')



export default {
  data () {
    return {
      CMpublicArrayIndex:0,
      bai:'50%'
    };
  },
  props:{
    cityName:{
      type:String,
      default:'杭州'
    },
    adsArray:{
      type:Array,
      default:function(){
        return []
      }
    },
    CMpublicArray:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  // components: {},

  computed: {
    count:function(){
      let sum = 0
      for (let i = 0;i<this.adsArray.length;i++){
        sum += parseInt(this.adsArray[i].count)
      }
      return sum
    },
    adsArrayFilter(){
      let arr = []
      for(let i =0;i < this.adsArray.length;i++){
          if(this.adsArray[i].count != 0){
            arr.push({value:this.adsArray[i].count,name:this.adsArray[i].name,list:this.adsArray[i].list})
          }
      }
      return arr
    },
    opt(){  //地区医院占比echarts 配置项
      let that = this
      let obj = {
        tooltip : {
              trigger: 'item',
              // formatter: "{b} : {c} ({d}%)"
              formatter:function(params){
                let arr = params.data.list
                let str = arr.join("<br/>")
                str = `${params.data.name}${params.data.value}所医院:<br/>${str}`
                return str
              }
          },
          avoidLabelOverlap: false,
          calculable : true,
          series : [
              {
                name:'庄稼医院',
                type:'pie',
                radius : [30, 95],
                center : ['50%', '55%'],
                roseType : 'radius',
                data:this.adsArrayFilter
              }
          ],
          color: ['#F79D1D','#AFD482','#7FCCE3','rgb(200,200,169)','rgb(131,175,155)']
      }
      return obj
    },
    apiece(){
      return this.CMpublicArray[this.CMpublicArrayIndex]
    },
    icon(){
      return this.CMpublicArray[this.CMpublicArrayIndex].icon
    },
    apieceDataList(){  //专科医院数据
      let arr = []
      if(this.apiece.isstore == 0){
        arr = [this.apiece.wen,this.apiece.expert]
      }else{
        arr = [this.apiece.wen,this.apiece.cetu,this.apiece.zuo,this.apiece.xun]
      }
      return arr
    },
    maxBarData(){  //专科医院数据最大值 ==> echarts 配置项使用
      let arr = []
      let l = this.apieceDataList.length
      let max = Math.max.apply(Math,this.apieceDataList)
      for(let i = 0;i < l;i++){
        arr.push(max)
      }
      return arr
    },
    showFlag(){  //舟山数据为0时，
      if(this.CMpublicArray[0].name == 'zhoushan') {
        return false
      }else{
         return true
      }
    },
    sort(){
      let sort = []
      if(this.apiece.isstore == 0){
        sort = ['网诊','专家']
        this.bai = '25%'
      }else{
        sort = ['网诊','测土配方','坐诊','巡诊']  
         this.bai = '50%'   
      }
      return sort
    }
  },
  mounted(){
    this.initPie()
    this.initApiece()
    setInterval(this.setIndex,10000)
    console.log('v.1')
  },
  methods: {
    initPie(){
      let ch = echarts.init(document.getElementById('pie1'))
      ch.setOption(this.opt)
    },
    initApiece(){
        let tEchart = echarts.init(document.getElementById('apiece'))
        tEchart.setOption({
          color: ['#AFD482','#7FCCE3','#AFD482','#7FCCE3'],
          tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                  type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'   
              },
              formatter: '{b1}: {c1}'
          },
          grid: {
              left: '0%',
              right: '0%',
              bottom: '0%',
              containLabel: true
          },
          xAxis : [
              {
                  type : 'category',
                  data : this.sort,
                  axisTick: {
                      alignWithLabel: false
                  },
                  axisLabel : {
                    textStyle: {
                        color: '#7FB5F1',
                        fontSize:'14'
                    }
                  }
              }
          ],
          yAxis : [
              {   data:this.apieceDataList,
                  type : 'value',
                  show:false
              }
          ],
          series : [
             { // For shadow
                  type: 'bar',
                  itemStyle: {
                      normal: {color: '#010931'}             
                  },
                  barGap:'-100%',
                  barCategoryGap:'30px',
                  barWidth: this.bai,
                  data: this.maxBarData,
                  animation: false      
              },
              {
                  type:'bar',
                  barWidth: this.bai,
                  itemStyle: {
                  normal: {
                      color: new echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#009CFF'},
                              {offset: 1, color: '#226DBF'}
                          ]
                      )
                    }
                  },
                  data:this.apieceDataList,
                  label:{
                    normal: {
                      show: true,
                      textBorderColor: 'none',
                      color:'#fff',
                      textBorderWidth: 1,
                      position: 'top',
                      backgroundColor:'#010931'
                    }
                  },
              }
          ]
        })
    },
    setIndex(){
      this.CMpublicArrayIndex += 1
      if(this.CMpublicArrayIndex >= this.CMpublicArray.length){
         this.CMpublicArrayIndex = 0
      }
    },
  },
  watch:{
    adsArray:function(){
      this.initPie()
    },
    CMpublicArrayIndex(){
       this.initApiece()
    },
    CMpublicArray(){  
      this.setIndex()
      this.CMpublicArrayIndex = 0
      this.initApiece()
    }
  }
}

</script>
<style lang='stylus' scoped>
.hospital-box
  padding-top 100px
  .hospital-title
    margin 20px 0 20px 22px
    padding-left 20px
    line-height 45px
    font-size 22px
  .hospital-number-box
    width 146px
    height 83px
    text-align center
    float right
    margin-right 37px
    &:after, &:before
      content ''
      width 100%
      height 2px
      display block
      background url('./border-short.png') no-repeat top center
    &>h5
      font-size 40px
      line-height 42px
      margin 9px 0 5px
      color #7FB5F1
    & > p
      font-size 14px
      margin-bottom 10px
  .data1
    width 100%
    height 234px
    margin 123px auto 16px
  .hospital-title2
    margin 0 0 20px 22px
    padding-left 20px
    line-height 45px
    font-size 22px
    .icon
      width 27px
      height 27px
      background url('./icon-03.png') no-repeat
      display inline-block
      vertical-align middle
      margin-top -3px
  .pospital-h6
    color #7FB5F1
    font-size 22px
    text-align right
    padding-right 38px
    margin-top 20px
    margin-bottom 10px
  .noData-box
    width 100%
    height 787px
    background url('./no-data.png') no-repeat
    margin-top -19px
    text-align center
    color RGBA(127, 181, 241, 0.5)
    & > p
      font-size 26px
      font-weight 400
      padding-top 320px
      margin-bottom 18px
    & > span
      font-size 20px
</style>