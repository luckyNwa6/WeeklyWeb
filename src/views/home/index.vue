<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
-->
<template>
  <div id="module">
    <el-header class="headerL" style="padding-bottom: 20px">
      <MyHeader></MyHeader
    ></el-header>
    <el-container>
      <NavMenu />
      <el-container>
        <el-header>
          <Breadcrumb />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue'
import NavMenu from '@/components/NavMenu.vue'
import Breadcrumb from '@/components/BreadCrumb.vue'

export default {
  data() {
    return {}
  },
  methods: {},
  components: {
    NavMenu,
    Breadcrumb,
    MyHeader
  }
}
</script>

<style></style>
