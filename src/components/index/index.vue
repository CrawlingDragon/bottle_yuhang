<!--  -->
<template>

  <div class="container clearfix">
    <div class="servers-container">
      1
      <keep-alive>

        <Servers v-on:getCity="getCityData" v-bind:cityArray="cityData.cityArray" v-bind:townArray="cityData.townArray" v-bind:countychart="cityData.countyArray" v-bind:isActive="isActive"></Servers>
      </keep-alive>
    </div>
    <div class="hospital-container">
      <keep-alive>
        <Hospital v-bind:cityName="cn" v-bind:adsArray="cityData.typeArray" :CMpublicArray="checkCM"></Hospital>
      </keep-alive>
    </div>
    <div class="city-container">
      <keep-alive>
        <City :Mpubcount="cityData.Mpubcount" :Usercount="cityData.Usercount" :Expertcount="cityData.Expertcount" :Fstusername="cityData.Fstusername" :FstRoomid="cityData.FstRoomid" :provinceList="cityData.TMpublicArray" v-on:mapFn="getMapParmes" :cityActive="isActive" :Fstuserpw="cityData.Fstuserpw" :Description="cityData.Description" :Totalview="cityData.Totalview" :Hotmpdata="cityData.Hotmpdata"></City>
      </keep-alive>
    </div>
    <div class="treat-container">
      <keep-alive>

        <Treat :Mplocaldata="cityData.Mplocaldata" :Explocaldata="cityData.Explocaldata"></Treat>
      </keep-alive>
    </div>
    <div class="onlineDiagnose-container">
      <keep-alive>

        <OnlineDiagnose :Replydata="cityData.Replydata"></OnlineDiagnose>
      </keep-alive>
    </div>
    <div class="times">
      <div class="refresh-img" @click="refresh"></div>
      <span class="refresh-span" @click="refresh">刷新</span>
      <div class="years">{{getDate() || date}}</div>
    </div>
  </div>
</template>

<script>
import Servers from "@/components/servers/servers";
import Hospital from "@/components/hospital/hospital";
import City from "@/components/city/city";
import Treat from "@/components/treat/treat";
import OnlineDiagnose from "@/components/onlineDiagnose/onlineDiagnose";
import { getData } from "@/api/data";

export default {
  data() {
    return {
      date: "",
      cityData: "",
      isActive: 0
    };
  },

  computed: {
    cn() {
      return this.cityData.countyArray[0].name.substr(0, 2);
    },
    checkCM() {
      if (this.cityData.CMpublicArray.length == 0) {
        return [
          {
            name: "zhoushan",
            icon: 1,
            wen: 0,
            zuo: 0,
            xun: 0,
            cetu: 0,
            flag: false
          }
        ];
      } else {
        return this.cityData.CMpublicArray;
      }
    }
  },

  mounted() {
    setInterval(() => {
      this.getDate();
    }, 2000);
    this._initData("杭州市");
  },
  created() {},
  methods: {
    getDate() {
      let myDate = new Date();
      let y = myDate.getFullYear();
      let m = myDate.getMonth() + 1;
      let d = myDate.getDate();
      let h = myDate.getHours();
      let f = myDate.getMinutes();
      if (m < 10) {
        m = `0${m}`;
      }
      if (d < 10) {
        d = `0${d}`;
      }
      if (h < 10) {
        h = `0${h}`;
      }
      if (f < 10) {
        f = `0${f}`;
      }
      this.date = `${y}-${m}-${d}  ${h}:${f}`;
      return this.date;
    },
    refresh() {
      window.location.reload();
    },
    getCityData(e, index) {
      getData(e).then(res => {
        if (res.code == 200) {
          this.cityData = res.data;
          this.isActive = index;
        }
      });
    },
    _initData(city) {
      getData(city).then(res => {
        if (res.code == 200) {
          this.cityData = res.data;
        }
      });
    },
    getMapParmes(name, index) {
      this.getCityData(name, index);
      this.isActive = index;
    }
  },
  components: {
    Servers,
    Hospital,
    City,
    Treat,
    OnlineDiagnose
  }
};
</script>
<style lang='stylus' scoped>
.container {
  width: 3200px;
  height: 960px;
  background: blue;
  min-width: 3200px;
  background: url('./bj.png') no-repeat;
  padding: 0 25px;
  position: relative;
  overflow: hidden;

  .servers-container {
    width: 420px;
    float: left;
    margin-right: 18px;
  }

  .hospital-container {
    float: left;
    width: 420px;
    margin-right: 18px;
  }

  .city-container {
    float: left;
    width: 1305px;
    margin-right: 18px;
  }

  .treat-container {
    float: left;
    width: 420px;
    margin-right: 18px;
  }

  .onlineDiagnose-container {
    float: left;
    width: 505px;
  }

  .times {
    position: absolute;
    right: 35px;
    top: 30px;
    font-size: 0;

    .refresh-img {
      width: 29px;
      height: 29px;
      background: url('./refresh.png') no-repeat center;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      cursor: pointer;
    }

    .refresh-span {
      vertical-align: middle;
      margin: 0 25px 0 10px;
      color: #7FB5F1;
      font-size: 24px;
      cursor: pointer;
    }

    .years {
      display: inline-block;
      color: #7FB5F1;
      font-size: 24px;
      margin-left: 25px;
      vertical-align: middle;
    }
  }
}
</style>