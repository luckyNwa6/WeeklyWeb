<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @头部区域
-->
<template>
  <div class="headContainer">
    <div class="headlog">
      <span style="font-weight: 700; margin-left: 20px"> 工作日志</span>
      <span style="font-size: 17px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;欢迎&nbsp;{{ userName }}</span>
    </div>
    <div>
      <HeadPortrait></HeadPortrait>
    </div>
  </div>
</template>

<script>
import HeadPortrait from '@/components/HeadPortrait.vue'
export default {
  components: { HeadPortrait },
  name: 'MyHeader',
  data () {
    return {
      userName: '',
      roleName: ''
    }
  },
  methods: {},
  created () {
    // 这是挂载完成
    const obj = JSON.parse(window.sessionStorage.getItem('ADMIN'))

    this.userName = obj.userName
  }
}
</script>
