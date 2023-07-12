<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @ 这是首页
-->
<template>
  <div style="display: flex; justify-content: space-between">
    <div class="left">
      <div>
        <div style="display: flex; justify-content: space-between">
          <div class="oneD"
               style="
              box-shadow: 1px 1px 6px;
              width: 360px;
              height: 250px;
              margin-right: 20px;
              margin-bottom: 20px;
            ">
            <div style="
                display: flex;
                justify-content: space-between;
                margin-top: 40px;
                padding-left: 30px;
                padding-right: 50px;
              ">
              <span style="font-size: 20px; font-weight: 700">{{
                formattedDate
              }}</span>
              <span style="
                  margin-top: 2px;
                  color: #5da6f8;
                  font-weight: 700;
                  font-size: 14px;
                ">1月18日&nbsp;|&nbsp;星期一</span>
              <div></div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div style="margin-left: 40px; margin-top: 40px">
                <img :src="codeImg"
                     style="border-radius: 7px; width: 80px; height: 80px" />
                <p style="margin-left: 25px; margin-top: 10px">四仔</p>
              </div>
              <div style="margin-top: 30px; margin-right: 130px">
                <p style="padding-top: 10px; padding-bottom: 4px">公司：</p>
                <p style="padding-bottom: 4px">年假:</p>
                <p style="padding-bottom: 4px">出差:</p>
                <p style="padding-bottom: 4px">外出:</p>
              </div>
            </div>
          </div>
          <div class="twoD"
               style="
              box-shadow: 1px 1px 6px;
              width: 400px;
              margin-right: 30px;
              height: 250px;
            ">
            <p style="
                font-weight: 800;
                margin-top: 10px;
                padding-bottom: 10px;
                border-bottom: 2px solid #f3f3f4;
              ">
              <span style="margin-left: 12px">常用功能</span>
            </p>
            <div style="
                display: flex;
                justify-content: left;
                padding-top: 20px;
                padding-left: 20px;
              ">
              <div @click="goToWeek">
                <img :src="weekImg"
                     style="border-radius: 7px; width: 40px; height: 40px" />
                <div>
                  <button style="
                      margin-left: 6px;
                      background-color: white;
                      border: none;
                    ">
                    周报
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="threeD"
             style="height: 340px; width: 780px; box-shadow: 1px 1px 6px">
          <p style="
              font-weight: 700;
              padding-top: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #f3f3f4;
            ">
            <span style="margin-left: 12px">人员登录记录</span>
          </p>
          <div style="padding: 15px 10px">
            <el-table :data="
                tableData.slice(
                  (currentPage - 1) * pageSize,
                  currentPage * pageSize
                )
              "
                      style="
                width: 100%;
                border: 2px solid #ebeef5;
                border-color: #868686;
              "
                      :header-cell-style="tableHeaderCellStyle"
                      border
                      :cell-style="tableCellStyle">
              <el-table-column type="selection"
                               width="55"> </el-table-column>
              <el-table-column prop="createBy"
                               label="登录名称"
                               width="120"
                               sortable>
              </el-table-column>
              <el-table-column prop="requestIp"
                               label="登录地址"
                               width="100">
              </el-table-column>
              <el-table-column prop="logSys"
                               label="操作系统"
                               width="120">
              </el-table-column>
              <el-table-column prop="logBrowser"
                               label="浏览器"
                               width="100">
              </el-table-column>
              <el-table-column prop="logTip"
                               label="提示消息"
                               width="120">
              </el-table-column>
              <el-table-column prop="createDate"
                               label="访问时间"
                               width="141"
                               sortable>
              </el-table-column>
            </el-table>
            <div class="block"
                 style="margin-top: 15px">
              <el-pagination align="center"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="currentPage"
                             :page-sizes="[1, 3]"
                             :page-size="pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="tableData.length">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div style="width: 400px; box-shadow: 1px 1px 6px; margin-bottom: 20px">
        <el-calendar v-model="value"> </el-calendar>
      </div>
      <div style="box-shadow: 1px 1px 6px; height: 70px">
        <p style="
            font-weight: 700;
            padding-top: 10px;
            padding-left: 10px;
            padding-bottom: 9px;
            border-bottom: 2px solid #f3f3f4;
          ">
          公司公告
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogList } from '@/api/user'
export default {
  data () {
    return {
      value: new Date(),
      timeS: new Date(),
      codeImg: require('@/assets/img/sizai.png'),
      weekImg: require('@/assets/img/week.png'),
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: ''
    }
  },
  created () {
    this.logList()
  },
  mounted () {
    var _this = this
    this.timer = setInterval(function () {
      _this.timeS = new Date()
    }, 1000)
  },
  computed: {
    formattedDate: function () {
      var date = this.timeS
      var hours = date.getHours().toString().padStart(2, '0')
      var minutes = date.getMinutes().toString().padStart(2, '0')
      var seconds = date.getSeconds().toString().padStart(2, '0')

      return hours + ':' + minutes + ':' + seconds
    }
  },

  methods: {
    goToWeek () {
      this.$router.push('/myWeekly')
    },
    logList () {
      getLogList({
        userId: JSON.parse(sessionStorage.getItem('ADMIN')).userId,
        page: 1,
        limit: 1000
      }).then((resp) => {
        this.$data.tableData = resp.data.data
      })
    },
    // 每页条数改变时触发，选中一页显示多少行
    handleSizeChange (val) {
      console.log(`每页${val}条`)
      this.currentPage = 1
      this.pageSize = val
    },
    handleClick (row) {
      console.log(row)
      this.$data.drawe = true
      this.$data.userObj = row
    },
    handleCurrentChange (val) {
      console.log(`当前页:${val}`)
      this.currentPage = val
    },
    tableHeaderCellStyle () {
      return 'border-color: #868686; color: #606266;'
    },
    tableCellStyle () {
      return 'border-color: #868686;'
    }
  }
}
</script>
<style>
.cell {
  text-align: center;
}

.el-calendar-table .el-calendar-day {
  height: 25px;
}
.el-calendar__title {
  color: #888888;
  font-weight: 700;
}

.el-icon-tickets {
  size: 30px;
}
</style>
