<template>
  <div class="services">
    <v-header></v-header>
    <div class="servicesContent">
      <div class="servicesTitle">
        <h2>创业服务 Services</h2>
      </div>
      <div class="servicesCon">
        <div class="servicesConImg">
          <img src="../images/bg.png" alt="">
        </div>
        <h5 style="margin-top:20px;">Build the Last Kilometer Project</h5>
        <h5>from University Campus to the Science and Technology Park</h5>
      </div>
      <div class="servicesAbout">
        <p class="servicesAboutTitle">同济创业谷是一个供有创业梦想的年轻人“讲述创业故事、分享创业经验、畅谈创业感悟、汇集创业力量”的青年创业实践平台，
          将利用优质的空间设施，先进的管理运营方法，结合同济大学优良教学资源、政府优惠政策、社会风投基金等创业支持，帮助大学生创新创业项目成长。具体的服务模块为：</p>
        <p>1、互动性的能力提升平台：同济创业谷通过开设各种类型的创新创业活动，帮助创业大学生提升创业能力，拓展创业资源，具体活动信息与参与请关注创业谷活动信息。</p>
        <p>2、开放型的种子培育平台：同济创业谷为每一个创业种子提供成长的可能，为创业团队寻找并匹配创业资源，帮助在创业初期的你探索最适合你的创业之路。</p>
        <p>3、陪伴式的导师辅导平台：同济创业谷为有创业导师支持需求的创业团队寻找并匹配“陪伴式”导师，为创业团队在创业的不同阶段配备最合适的创业助力。</p>
        <p>4、多元化的梦想放飞平台：同济创业谷鼓励创业者为自己的创业项目寻找最合适的出路，欢迎有创业想法或创业困惑的年轻人联系并咨询我们，
          我们将根据你的项目情况组织专家评审对你的项目前景进行评估，并给与建议。</p>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import header from './header'
import footer from './footer'
export default {
  name: 'service',
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
.services{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #fff;
}
.servicesContent{
  width: 1000px;
  margin: 0 auto;
}
.servicesTitle h2{
  font-size: 18px;
color: rgb( 254, 108, 0 );
border-bottom: 1px solid;
padding: 10px 0px 10px 0px;
font-weight: normal;
letter-spacing: 3px;
}
.servicesCon{
  width: 800px;
  margin: 50px auto;
}
h5{
  font-size: 16px;
  color: rgb( 254, 108, 0 );
}
.servicesAbout{
  width: 800px;
  margin:0 auto 50px;
  font-size: 14px;
  font-weight: 600;
  line-height: 30px;
  font-family: "FZLTZHK";
  color: rgb( 83, 83, 83 );
}
.servicesAbout p{
  margin: 20px 0;
}
</style>
