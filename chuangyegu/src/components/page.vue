<template>
  <div class="page">
    <label class="page-item">
      <a href="javascript:void(0)" v-on:click="changePage(1)" class="font-nor">首页</a>
    </label>
    <label class="page-item" v-for="n in 5" v-if="n + args.pageNum - 3 > 0 && n + args.pageNum - 3 <= args.totalPage">
      <a href="javascript:void(0)" v-on:click="changePage(n + args.pageNum - 3)" class="font-nor" v-bind:class="{active: (n == 3) }">{{n + args.pageNum - 3}}</a>
    </label>
    <label class="page-item">
      <a href="javascript:void(0)" v-on:click="changePage(args.totalPage)" class="font-nor">尾页</a>
    </label>
  </div>
</template>
<script>
export default {
  name: 'page',
  props: ['args'],
  methods: {
    changePage: function (value) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.$emit('page', value)
    }
  }
}
</script>
<style scoped>
.page {
  text-align: right;
  height: 40px;
  padding: 10px 10px;
}
.page-item a{
  text-decoration: none;
  color: black;
}
.page-item a.active {
  color:rgb( 254, 108, 0 );
}
.page-item {
  /*margin-right: 10px;*/
  background-color: transparent;
  padding: 5px 10px;
}

</style>
