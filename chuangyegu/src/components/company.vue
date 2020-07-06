<template>
  <div class="contact">
    <v-header></v-header>
    <div class="contactTitle">
      <h2>合作企业 Company</h2>
    </div>
    <div class="contactCon">
      <div class="contactConTitle">
        我们与科技园区、风险投资机构等社会力量景象互补对接，为大学生创新创业畅通成长渠道，建
立创业谷项目"出谷考察"与科技园、风投机构"投资评估"同进行的无缝对接机制，为学生创新创业
的梦想插上腾飞的翅膀。
      </div>
      <div class="companyAbout">
        <span><a href="#">品舒（上海）家居用品有限公司</a></span>
        <p>还原清新空气，引导健康生活 针对日益恶化的空气污染问题，品舒（上海）驻同济创业谷项目组整合研发、生
产和营销等方面的资源力量，采用国际严格标准，并融合前沿的物联网和智能硬件技术，面向国内城市中产阶
级，开发一款高端智能空气净化器。</p>
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
.contactConTitle{
  font-size: 17.5px;
  font-family: "Adobe Heiti Std";
  color: rgb( 0, 0, 0 );
  line-height: 25px;
}
.companyAbout{
  margin: 35px 0 40px 0;
}
.companyAbout span a{
  font-size: 18px;
  color: rgb( 254, 108, 0 );
  border-bottom: 1px solid;
  margin-bottom: 20px;
  display: inline-block;
}
.companyAbout p{
  font-family: "Adobe Heiti Std";
  font-size: 15px;
  line-height: 25px;
}
</style>
