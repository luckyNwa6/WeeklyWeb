<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @右侧菜单的组件
-->

<template>
  <el-aside width="165px !important"
            style="height: 2250px !important">
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>周报管理</span>
        </template>
        <el-menu-item index="1-1">我的周报</el-menu-item>
        <el-menu-item index="1-2">所有周报</el-menu-item>
      </el-submenu>
    </el-menu> -->

    <el-menu default-active="1"
             class="el-menu-vertical-demo"
             router>
      <div v-for="item in lists"
           :key="item.id">
        <template v-if="item.isFlag">
          <el-menu-item :index="item.index">
            <i :class="item.ic"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <el-submenu :index="item.index">
            <template slot="title">
              <i class="el-icon-s-cooperation"></i>{{ item.name }}
            </template>
            <el-menu-item :index="itema.index"
                          v-for="itema in item.children"
                          :key="itema.id">{{ itema.name }}</el-menu-item>
          </el-submenu>
        </template>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  created () {
    // console.log(JSON.parse(window.sessionStorage.getItem('ADMIN')).roleId)
    //如果没有做菜单权限管理，而是直接普通只显示周报页面，管理员显示周报管理，直接本地查赋值会提高效率无需访问数据库
    //如果是有菜单权限管理，则需要一个菜单表，一个权限表以及中间表
    //1的话直接给它主页，2给主页和管理
    if (JSON.parse(window.sessionStorage.getItem('ADMIN')).roleId == 1) {
      this.lists = this.lists1
      this.$router.push('/myWeekly')
    } else {
      this.lists = this.lists2
      // getMenu({ acc: 3 }).then((res) => {
      //   if (res.data.code == 200) {
      //     console.log(res.data.data)
      //     this.lists3.push({
      //       id: 0,
      //       index: '/index',
      //       ic: 'el-icon-s-flag',
      //       name: '首页',
      //       isFlag: 1,
      //       children: ''
      //     })
      //     for (var i = 0; i < res.data.data.length; i++) {
      //       this.lists3.push({
      //         id: res.data.data[i].listId,
      //         index: res.data.data[i].listIndex,
      //         ic: res.data.data[i].listIcon,
      //         name: res.data.data[i].menuName,
      //         isFlag: res.data.data[i].listIsFlag,
      //         children: ''
      //       })
      //     }
      //   }
      // })
      // this.lists = this.lists3
    }
  },
  data () {
    return {
      lists: [],
      lists3: [],
      lists1: [
        {
          id: 1,
          index: '/weekly',
          ic: 'el-icon-data-line',
          name: '周报管理',
          isFlag: false,
          children: [
            {
              index: '/myWeekly',
              name: '我的周报'
            }
            ,
            // {
            //   index: '/allWeekly',
            //   name: '所有周报'
            // }
          ]
        }
      ],

      lists2: [
        {
          id: 0,
          index: '/index',
          ic: 'el-icon-s-home',
          name: '首页',
          isFlag: 1,
          children: ''
        },
        {
          id: 1,
          index: '/weekly',
          ic: 'el-icon-data-line',
          name: '周报管理',
          isFlag: false,
          children: [
            {
              index: '/myWeekly',
              name: '我的周报'
            }
            ,
            // {
            //   index: '/allWeekly',
            //   name: '所有周报'
            // }
          ]
        }
      ]
    }
  }
}
</script>
