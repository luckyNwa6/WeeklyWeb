<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @面包屑的组件
-->

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in lists"
                          :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
  data () {
    return {
      lists: []
    }
  },
  methods: {

  },
  watch: {
    $route (to, from) {
      this.lists = to.matched;
    }
  },
  mounted () {
    this.lists = this.$route.matched;
  }
}
</script>

<style>
</style>