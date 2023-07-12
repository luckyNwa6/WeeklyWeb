<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @我的周报的页面
-->

<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-date-picker v-model="selectedDate"
                      type="month"
                      :visible.sync="isCalendarVisible"
                      @change="handleDateChange"
                      style="width: 180px; margin-right: 30px"
                      placeholder="选择月份查询"></el-date-picker>

      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addOne()">新增</el-button>
      <el-button type="primary"
                 icon="el-icon-edit"
                 @click="lastModify()">继续上次修改</el-button>
      <el-button type="primary"
                 icon="el-icon-delete"
                 @click="deleteSelectedRows()">删除</el-button>
      <el-button type="primary"
                 icon="el-icon-download"
                 @click="loadMyWeek()">下载</el-button>
    </div>

    <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
              style="width: 100%; border: 2px solid #ebeef5; border-color: #868686"
              :header-cell-style="tableHeaderCellStyle"
              border
              :cell-style="tableCellStyle"
              @selection-change="handleSelectionChange"
              @row-dblclick="show">
      <el-table-column prop="id"
                       label=""
                       width="30"> </el-table-column>
      <el-table-column type="selection"
                       width="43"> </el-table-column>
      <el-table-column prop="months"
                       label="月份"
                       width="200">
      </el-table-column>
      <el-table-column prop="weekNum"
                       label="周数"
                       width="180">
      </el-table-column>
      <el-table-column prop="monday"
                       label="周一"
                       width="180">
      </el-table-column>
      <el-table-column prop="sunday"
                       label="周日"
                       width="180">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="创建时间"
                       width="180">
      </el-table-column>
      <el-table-column fixed="right"
                       label="修改">
        <template v-slot="scope">
          <el-button size="mini"
                     icon="el-icon-edit"
                     @click="modify(scope.row)"
                     style="background-color: transparent; border: none">修改(双击行)</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block"
           style="margin-top: 15px">
        <el-pagination align="center"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1, 3, 5]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length">
        </el-pagination>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getMyWeekList } from '@/api/user'
import { delMyWeekOne } from '@/api/user'
import { delMyWeekMore } from '@/api/user'
import { loadOne } from '@/api/user'

export default {
  mounted: function () {
    this.getMonthsList()
  },
  methods: {
    show (obj) {   //双击进入修改
      sessionStorage.removeItem('TEMP')
      this.$router.push({ name: 'modifyMy', params: { obj } })
    },
    addOne () {
      this.$router.push({ name: 'addMy' })
    },
    loadMyWeek () {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要下载的周报!')
        return
      }

      this.$confirm('确定要下载选中的周报吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',

        type: 'warning'
      }).then(() => {
        // 获取多行
        const filteredIds = [
          ...new Set(
            this.selectedRows.reduce((ids, array) => {
              const idsArray = this.selectedRows.map((obj) => obj.id)
              return [...ids, ...idsArray]
            }, [])
          )
        ]

        // 下面这个方法是下载一个excel
        // loadOne({monthsId:this.selectedRows[0].id,id:this.selectedRows[0].id}).then((res) => {
        //   window.location.href = res.data
        // })
        // 下面下载多个

        for (let i = 0; i < filteredIds.length; i++) {
          loadOne({ monthsId: filteredIds[i], id: filteredIds[i] }).then((res) => {
            window.location.href = res.data
          })
        }

      })


    },
    lastModify () {
      if (!sessionStorage.getItem('TEMP')) {
        this.$message.warning('您上次并没有修改！')
        return
      }
      let obj = JSON.parse(sessionStorage.getItem('TEMP'))
      this.$router.push({ name: 'modifyMy', params: { obj } })
    },
    deleteSelectedRows () {
      if (this.selectedRows.length === 0) {
        this.$message.warning('请选择要删除的行')
        return
      }

      this.$confirm('确定要删除选中的行吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',

        type: 'warning'
      }).then(() => {
        // 执行删除操作
        const filteredIds = [
          ...new Set(
            this.selectedRows.reduce((ids, array) => {
              const idsArray = this.selectedRows.map((obj) => obj.id)
              return [...ids, ...idsArray]
            }, [])
          )
        ]

        // console.log(filteredIds)

        const result = filteredIds.map(String).join(', ')
        // console.log(result) // 输出: "1, 2, 3, 4" 多删除兼容了单删除

        // delMyWeekOne({ idOne: value }).then((res) => {
        //   if (res.data.code == 200) {
        //     this.notifySucceed('删除成功！')
        //     this.getMonthsList()
        //   }
        // })

        delMyWeekMore(result).then((res) => {
          if (res.data.code == 200) {
            this.notifySucceed('删除成功！')
            this.getMonthsList()
          }
        })
      })
    },
    handleSelectionChange (selectedRows) {
      // 在这里处理选中的行数据
      // console.log('选中的行数据：', selectedRows)
      this.selectedRows = selectedRows
      // 进行其他操作...
    },
    tableCellStyle () {
      return 'border-color:#6e4497;'
    },

    tableHeaderCellStyle () {
      return 'border-color: #6e4497; color:#6e4497;'
    },

    modify (obj) {
      sessionStorage.removeItem('TEMP')
      this.$router.push({ name: 'modifyMy', params: { obj } })
    },

    getMonthsList () {
      getMyWeekList({
        months: this.findContent,
        id: '',
        page: 1,
        limit: 100
      }).then((resp) => {
        this.$data.tableData = resp.data.data
      })
    },

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
    showCalendar () {
      this.isCalendarVisible = true
    },
    handleDateChange (value) {
      // 处理日期变化事件
      if (!value) {
        console.log('日期选择已取消')
        this.findContent = ''
        this.getMonthsList()
        // 在这里执行你的自定义代码
      }
      console.log('Selected Date:', this.formatDate(value))
      this.findContent = this.formatDate(value)
      this.getMonthsList()
      // 进行相应的查询操作
    },
    formatDate (dateString) {
      var selectedDate = new Date(dateString)
      var year = selectedDate.getFullYear()
      var month = selectedDate.getMonth() + 1

      // 将月份转换为两位数
      if (month < 10) {
        month = '0' + month
      }

      var formattedDate = year + '-' + month
      return formattedDate
    }
  },

  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: '',
      findContent: '',
      isCalendarVisible: false,
      selectedDate: '',
      selectedRows: [] // 用于保存选中的行数据
      // objU: ''
    }
  }
}
</script>
