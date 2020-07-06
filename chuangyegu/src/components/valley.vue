<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle">
      <h2>同创谷 </h2>
    </div>
    <div class="map-present">
      <div id="demoComponent" class="demo-component">
        <baidu-map class="map" id="demoComponent" :center="{lng: 116.9255627668, lat: 34.2809806341}" :zoom="5" :dragging="false">
          <!-- <bm-info-window :position="{lng: 121.6273150409, lat: 38.9197117560}" title="Info Window Title" :show="dalian" @mouseover="dalian = true">
            <p>123123</p>
          </bm-info-window> -->
          <!-- <bm-info-window :position="{lat: 30.6611640680, lng: 104.0839942718}" title="Info Window Title" :show="true">
            <p>123123</p>
          </bm-info-window> -->
          <bm-marker :position="{lng: 121.6273150409, lat: 38.9197117560}" @mouseover="move(0)" @mouseout="out(0)">
          </bm-marker>
          <bm-marker :position="{lng: 104.0839942718, lat: 30.6611640680}" @mouseover="move(1)" @mouseout="out(1)">
          </bm-marker>
          <bm-info-window :position="{lng: infoData.lng, lat: infoData.lat}" :width="300" :title="infoData.title" :show="infoWindow" >
            <img src="../images/valley1.jpeg" style="float:left !important; margin-right:5px !important;">
            <p v-text="infoData.text" style="font-size:12px; "></p>
          </bm-info-window>
          <!-- <bm-marker :position="{lat: 30.6611640680, lng: 104.0839942718}" :label="{content: data[1], opts: {offset: {width: 20, height: 10}}}" @mouseover="move(1)" @mouseout="out(1)"></bm-marker> -->
          <!-- <bm-marker :position="{lat: 30.6611640680, lng: 104.0839942718}" @mouseover="move(1)" @mouseout="out(1)"></bm-marker> -->
          <!-- <bm-info-window :position="{lng: 104.0839942718, lat: 30.6611640680}" :width="300" title="成都同创谷" :show="infoWindow">
            <img src="../images/valley1.jpeg" style="float:left !important;">
            <p v-text="content[0].data" style="font-size:12px;"></p>
          </bm-info-window> -->
        </baidu-map>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: '2d12993ce41407db4050140fe342d9ba'
})
export default {
  name: 'valley',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      content: [
        {title: '大连同创谷', lng: 121.6273150409, lat: 38.9197117560, data: '位于高新区任贤街16号，立足同济大学相关优势资源与创新能力和东北地区产业发展需要，集创业孵化、企业成长扶持、产业全程服务、产业发展成长的全产业链平台。'},
        {title: '成都同创谷', lng: 104.0839942718, lat: 30.6611640680, data: '全名“同济大学·成都龙泉国际青年创业谷”，坐落于四川成都国家级新区--天府新区龙泉驿片区，总面积6000平米，由成都经开区（龙泉驿区）和同济大学联手打造，同济大学四川校友会成立的平台公司（成都同创谷企业孵化器有限公司）管理运营。'}
      ],
      infoWindow: true,
      infoData: {
        lng: '',
        lat: '',
        title: '',
        text: ''
      }
    }
  },
  methods: {
    move (index) {
      this.setData(index)
      this.infoWindow = true
    },
    out (index) {
      this.infoWindow = false
    },
    setData: function (index) {
      this.infoData.lng = this.content[index].lng
      this.infoData.lat = this.content[index].lat
      this.infoData.title = this.content[index].title
      this.infoData.text = this.content[index].data
    }
  },
  components: {
    'v-header': header,
    'v-footer': footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#allmap label{max-width:none;}
.BMapLabel{
  display: none!important;
}
.contact{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
#demoComponent{
  height: 100%;
}
.map-present{
  width: 866px;
  height: 670px;
  margin: 50px auto;
}
.contactTitle{
  width: 865px;
  margin: 0 auto;
}
.contactTitle h2{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  padding: 10px 0px 10px 0px;
  letter-spacing: 3px;
  font-weight: normal;
}
.contactCon{
  width: 800px;
  margin: 50px auto;
}
.contactConImg{
  text-align: center;
}
.contactConAddr p{
  font-size: 15px;
  font-family: "Adobe Heiti Std";
  color: rgb( 0, 0, 0 );
}
.contactConAddr p.tj{
  font-size: 17.5px;
}
.contactConAddr p.tj{
  margin-bottom: 30px;
}
.contactConAddr p.jd{
  margin-top: 30px;
}
.contactConTitle{
  font-size: 17.5px;
  font-family: "Adobe Heiti Std";
  color: rgb( 254, 108, 0 );
  line-height: 25px;
}
.companyAbout{
  margin: 35px 0 40px 0;
}
.companyAbout p{
  font-family: "Adobe Heiti Std";
  font-size: 15px;
  line-height: 25px;
}
</style>
