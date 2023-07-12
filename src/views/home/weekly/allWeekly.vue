<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @全部周报的页面
-->

<template>
  <div>
    <el-input v-model="findContent"
              style="width: 152px; margin-right: 10px; margin-bottom: 8px"></el-input>
    <el-input v-model="findContent"
              style="width: 152px; margin-right: 10px; margin-bottom: 8px"></el-input>
    <el-input v-model="findContent"
              style="width: 152px; margin-right: 10px; margin-bottom: 8px"></el-input>
    <el-button type="primary"
               @click="addOne()">查询</el-button>
    <el-button type="primary"
               @click="addOne()">重置</el-button>
    <el-button type="primary"
               @click="addOne()">查看本周</el-button>
    <el-button type="primary"
               @click="addOne()">查看上周</el-button>
    <el-button type="primary"
               @click="addOne()">查询未提交</el-button>
    <el-button type="primary"
               @click="addOne()">下载</el-button>
    <el-table :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
              style="width: 100%; border: 2px solid #ebeef5; border-color: #868686"
              :header-cell-style="tableHeaderCellStyle"
              border
              :default-sort="{ prop: 'userId' }"
              :cell-style="tableCellStyle">
      <el-table-column prop="id"
                       label=""
                       width="30"> </el-table-column>
      <el-table-column type="selection"
                       width="43"> </el-table-column>
      <el-table-column prop="months"
                       label="用户"
                       width="200">
      </el-table-column>
      <el-table-column prop="weekNum"
                       label="部门"
                       width="180">
      </el-table-column>
      <el-table-column prop="monday"
                       label="月份"
                       width="180">
      </el-table-column>
      <el-table-column prop="sunday"
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
                     @click="modify(scope.row)">修改(双击行)</el-button>
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
  </div>
</template>

<script>
import { getMyWeekList } from '@/api/user'
export default {
  mounted: function () {
    this.getMonthsList()
  },
  methods: {
    upGrade (row) {
      upGra({ acc: row.userAcc }).then((res) => {
        if (res.data.code == 200) {
          this.notifySucceed('升级成功！')
          this.getPersonList()
        }
      })
    },
    reGrade (row) {
      reGra({ acc: row.userAcc }).then((res) => {
        if (res.data.code == 200) {
          this.notifySucceed('降低成功！')
          this.getPersonList()
        }
      })
    },

    tableCellStyle () {
      return 'border-color:#6e4497;'
    },

    tableHeaderCellStyle () {
      return 'border-color: #6e4497; color:#6e4497;'
    },

    deleteU (row) {
      this.$alert('确定要删除吗？', '提示', {
        confirmButtonText: '确定'
      }).then(() => { })
    },

    change (row) {
      modifyState({ acc: row.userAcc }).then((resp) => {
        this.notifySucceed(resp.data.msg)
      })
    },

    modify (obj) {
      this.setShowModify(true)
      // console.log(obj)
      this.objU = obj
    },

    getMonthsList () {
      getMyWeekList({
        months: this.findContent,
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
    }
  },

  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: '',
      findContent: ''
    }
  }
}
</script>
