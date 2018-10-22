<!--  -->
<template>
  <div class="dia-box">
    <div class="dia-title">最新网诊数据</div>
    <ul class="dia-ul" id="diaUl">
      <li v-for="(item,index) in Replydata">
        <a :href="'http://www.114nz.com/index.php?m=content&c=index&a=datavinfo&catid=1540&id='+item.tid+'&tdsourcetag=s_pcqq_aiomsg.html'" target="_blank">
          <div class="time">{{item.dateline}}</div>
          <div class="text">
            <span class="text1">{{item.subject}}</span>
            <span class="text2" :style="{display:'none'}">{{item.subject}}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
props:{
  Replydata:{
    type:Array,
    default:function(){
      return []
    }
  }
},
  // components: {},

  // computed: {},

  mounted() {
    this.getWidth()
  },

  methods: {
    getWidth(){
      let textList1 = document.getElementById('diaUl').getElementsByClassName('text1')
      let textList2 = document.getElementById('diaUl').getElementsByClassName('text2')
      let liList = document.getElementById('diaUl').getElementsByTagName('li')[0]
      for(let i = 0;i<textList1.length;i++){
        let textW = textList1[i].clientWidth
        let liW = liList.clientWidth
        if(textW > 420){
          textList1[i].className = 'text1 an t1'
          textList2[i].style.display = "block"
          textList2[i].className = 'text2 an2 t2'
        }
      }
    }
  }
}

</script>
<style lang='stylus' scoped>
.dia-box
  margin-top 100px
  .dia-title
    padding 21px 20px 13px
    font-size 22px
    line-height 45px
    text-indent 18px
  .dia-ul
    margin-top 30px
    margin-left 23px
    &>li
      padding-left 61px
      position relative
      margin-bottom 23px
      overflow hidden
      & > a
        display block
        color #ffffff
        line-height 20px
        .time
          position absolute
          left 0
          top 0
          width 50px
          height 20px
          text-align center
          line-height 20px
          background #0C2C78
          color #7FB5F1
        .text
          white-space normal
          display inline-block
          overflow hidden
          word-break keep-all /* 不换行 */
          white-space nowrap /* 不换行 */
          position relative
          height 20px
          min-width 420px
          & > span
            display block
            font-size 16px
          .t1
            animation marquee1 32s linear infinite
            margin-left 100%
            position absolute
            width auto
          .t2
            animation marquee2 32s linear 16s infinite
            margin-left 100%
            position absolute
          @keyframes marquee1
            0%
              transform translateX(0)
            100%
              transform translateX(-225%)
          @keyframes marquee2
            0%
              transform translateX(0)
            100%
              transform translateX(-225%)
</style>