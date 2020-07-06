<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle">
      <h2>联系我们 Contact US</h2>
    </div>
    <div class="contactCon">
      <div class="contactConImg">
        <img src="../images/addr.png" alt="">
      </div>
      <div class="contactConAddr">
        <p class="tj">同济大学创业谷</p>
        <p>四平创业谷</p>
        <p>电话: +86 021 65982728</p>
        <p>地址: 中国上海市杨浦区彰武路100号创业大楼</p>
        <p>邮编: 200092</p>
        <p class="jd">嘉定创业谷</p>
        <p>电话: +86 021 59946392</p>
        <p>中国上海市嘉定区曹安公路4800号朋园3号楼</p>
        <p>邮编: 201804</p>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
export default {
  name: 'contact',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
.contact{
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
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
</style>
