<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @修改和历史缓存的的页面
-->

<template>
  <div>
    <div>
      修改{{ $route.params.obj.months }}第{{ $route.params.obj.weekNum }}周
      <!-- <el-button type="primary">选择本周</el-button
      ><el-button type="primary">选择上周</el-button
      ><el-button type="primary"> 按日期选择</el-button
      > -->
      <!-- <el-button type="warning"
                 @click="goToWeek">返回</el-button> -->
    </div>
    <div style="
        box-shadow: 1px 1px 6px;

        width: 100%;
        margin-top: 10px;
      ">
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          本周总结1
        </p>
        <el-input v-model="summary1"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          本周总结2
        </p>
        <el-input v-model="summary2"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          本周总结3
        </p>
        <el-input v-model="summary3"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <!-- 下面是表格 -->

      <div>
        <el-table :data="tableData"
                  style="width: 100%">
          <!-- 周时间 -->
          <el-table-column prop="week"
                           label="周时间"
                           width="90">
          </el-table-column>
          <!-- 日期 -->
          <el-table-column prop="day"
                           label="日期"
                           width="98"></el-table-column>
          <!-- 时间（上午和下午） -->
          <el-table-column prop="time"
                           label="时间"
                           width="50">
            <template slot-scope="scope">
              <div class="cell-wrap">{{ scope.row.time }}</div>
            </template>
          </el-table-column>
          <!-- 具体事情 -->
          <el-table-column prop="event"
                           label="具体事宜">
            <template slot-scope="scope">
              <el-input v-model="scope.row.inputValue1"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue2"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue3"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue4"
                        class="custom-input"></el-input>
            </template>
          </el-table-column>
          <!-- 标记 -->
          <el-table-column label="标记"
                           width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.flag1"
                         width="100%"
                         class="custom-input">
                <el-option label="完成"
                           value="完成"></el-option>
                <el-option label="未完成"
                           value="未完成"></el-option>
              </el-select>
              <el-select v-model="scope.row.flag2"
                         width="100%"
                         class="custom-input">
                <el-option label="完成"
                           value="完成"></el-option>
                <el-option label="未完成"
                           value="未完成"></el-option>
              </el-select>
              <el-select v-model="scope.row.flag3"
                         width="100%"
                         class="custom-input">
                <el-option label="完成"
                           value="完成"></el-option>
                <el-option label="未完成"
                           value="未完成"></el-option>
              </el-select>
              <el-select v-model="scope.row.flag4"
                         width="100%"
                         class="custom-input">
                <el-option label="完成"
                           value="完成"></el-option>
                <el-option label="未完成"
                           value="未完成"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 结果分析 -->
          <el-table-column prop="analysis"
                           label="结果分析">
            <template slot-scope="scope">
              <el-input v-model="scope.row.inputValue5"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue6"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue7"
                        class="custom-input"></el-input>
              <el-input v-model="scope.row.inputValue8"
                        class="custom-input"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 下面是下周计划和确定取消 -->
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          下周计划1
        </p>
        <el-input v-model="plan1"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          下周计划2
        </p>
        <el-input v-model="plan2"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p style="
            font-size: 15px;
            font-weight: 700;
            margin-top: 30px;
            margin-left: 19px;
            width: 120px;
          ">
          下周计划3
        </p>
        <el-input v-model="plan3"
                  style="
            margin-right: 30px;
            margin-top: 20px;
            border: 2px solid #cfcfcf;
            border-radius: 5px;
          ">
        </el-input>
      </div>
      <el-button type="primary"
                 style="
          margin-top: 20px;
          margin-left: 29px;
          margin-right: 39px;
          margin-bottom: 30px;
        "
                 @click="keepMyWeek">
        确定</el-button><el-button type="warning"
                 @click="goToWeek">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getMyWeek } from '@/api/user'
import { keepMyWeekly } from '@/api/user'

export default {
  data () {
    return {
      summary1: '',
      summary2: '',
      summary3: '',
      plan1: '',
      plan2: '',
      plan3: '',
      tableData: []
    }
  },
  created () {
    // console.log('接收到的对象参数', this.$route.params.obj)
    this.buildWeek()
  },

  mounted () {
    if (!sessionStorage.getItem('TEMP')) {
      this.getMyWeekIng()
    } else {
      this.summary1 = this.$route.params.obj.summary1
      this.summary2 = this.$route.params.obj.summary2
      this.summary3 = this.$route.params.obj.summary3
      this.plan1 = this.$route.params.obj.plan1
      this.plan2 = this.$route.params.obj.plan2
      this.plan3 = this.$route.params.obj.plan3
      // console.log(this.tableData[1])
      this.tableData[0].inputValue1 = this.$route.params.obj.monMoA1
      this.tableData[0].inputValue2 = this.$route.params.obj.monMoA2
      this.tableData[0].inputValue3 = this.$route.params.obj.monAfA1
      this.tableData[0].inputValue4 = this.$route.params.obj.monAfA2
      this.tableData[0].inputValue5 = this.$route.params.obj.monMoR1
      this.tableData[0].inputValue6 = this.$route.params.obj.monMoR2
      this.tableData[0].inputValue7 = this.$route.params.obj.monAfR1
      this.tableData[0].inputValue8 = this.$route.params.obj.monAfR2
      this.tableData[0].flag1 = this.$route.params.obj.monMoA1S
      this.tableData[0].flag2 = this.$route.params.obj.monMoA2S
      this.tableData[0].flag3 = this.$route.params.obj.monAfA1S
      this.tableData[0].flag4 = this.$route.params.obj.monAfA2S

      this.tableData[1].inputValue1 = this.$route.params.obj.tuMoA1
      this.tableData[1].inputValue2 = this.$route.params.obj.tuMoA2
      this.tableData[1].inputValue3 = this.$route.params.obj.tuAfA1
      this.tableData[1].inputValue4 = this.$route.params.obj.tuAfA2
      this.tableData[1].inputValue5 = this.$route.params.obj.tuMoR1
      this.tableData[1].inputValue6 = this.$route.params.obj.tuMoR2
      this.tableData[1].inputValue7 = this.$route.params.obj.tuAfR1
      this.tableData[1].inputValue8 = this.$route.params.obj.tuAfR2
      this.tableData[1].flag1 = this.$route.params.obj.tuMoA1S
      this.tableData[1].flag2 = this.$route.params.obj.tuMoA2S
      this.tableData[1].flag3 = this.$route.params.obj.tuAfA1S
      this.tableData[1].flag4 = this.$route.params.obj.tuAfA2S
      this.tableData[2].inputValue1 = this.$route.params.obj.weMoA1
      this.tableData[2].inputValue2 = this.$route.params.obj.weMoA2
      this.tableData[2].inputValue3 = this.$route.params.obj.weAfA1
      this.tableData[2].inputValue4 = this.$route.params.obj.weAfA2
      this.tableData[2].inputValue5 = this.$route.params.obj.weMoR1
      this.tableData[2].inputValue6 = this.$route.params.obj.weMoR2
      this.tableData[2].inputValue7 = this.$route.params.obj.weAfR1
      this.tableData[2].inputValue8 = this.$route.params.obj.weAfR2
      this.tableData[2].flag1 = this.$route.params.obj.weMoA1S
      this.tableData[2].flag2 = this.$route.params.obj.weMoA2S
      this.tableData[2].flag3 = this.$route.params.obj.weAfA1S
      this.tableData[2].flag4 = this.$route.params.obj.weAfA2S
      this.tableData[3].inputValue1 = this.$route.params.obj.thMoA1
      this.tableData[3].inputValue2 = this.$route.params.obj.thMoA2
      this.tableData[3].inputValue3 = this.$route.params.obj.thAfA1
      this.tableData[3].inputValue4 = this.$route.params.obj.thAfA2
      this.tableData[3].inputValue5 = this.$route.params.obj.thMoR1
      this.tableData[3].inputValue6 = this.$route.params.obj.thMoR2
      this.tableData[3].inputValue7 = this.$route.params.obj.thAfR1
      this.tableData[3].inputValue8 = this.$route.params.obj.thAfR2
      this.tableData[3].flag1 = this.$route.params.obj.thMoA1S
      this.tableData[3].flag2 = this.$route.params.obj.thMoA2S
      this.tableData[3].flag3 = this.$route.params.obj.thAfA1S
      this.tableData[3].flag4 = this.$route.params.obj.thAfA2S
      this.tableData[4].inputValue1 = this.$route.params.obj.frMoA1
      this.tableData[4].inputValue2 = this.$route.params.obj.frMoA2
      this.tableData[4].inputValue3 = this.$route.params.obj.frAfA1
      this.tableData[4].inputValue4 = this.$route.params.obj.frAfA2
      this.tableData[4].inputValue5 = this.$route.params.obj.frMoR1
      this.tableData[4].inputValue6 = this.$route.params.obj.frMoR2
      this.tableData[4].inputValue7 = this.$route.params.obj.frAfR1
      this.tableData[4].inputValue8 = this.$route.params.obj.frAfR2
      this.tableData[4].flag1 = this.$route.params.obj.frMoA1S
      this.tableData[4].flag2 = this.$route.params.obj.frMoA2S
      this.tableData[4].flag3 = this.$route.params.obj.frAfA1S
      this.tableData[4].flag4 = this.$route.params.obj.frAfA2S
      this.tableData[5].inputValue1 = this.$route.params.obj.saMoA1
      this.tableData[5].inputValue2 = this.$route.params.obj.saMoA2
      this.tableData[5].inputValue3 = this.$route.params.obj.saAfA1
      this.tableData[5].inputValue4 = this.$route.params.obj.saAfA2
      this.tableData[5].inputValue5 = this.$route.params.obj.saMoR1
      this.tableData[5].inputValue6 = this.$route.params.obj.saMoR2
      this.tableData[5].inputValue7 = this.$route.params.obj.saAfR1
      this.tableData[5].inputValue8 = this.$route.params.obj.saAfR2
      this.tableData[5].flag1 = this.$route.params.obj.saMoA1S
      this.tableData[5].flag2 = this.$route.params.obj.saMoA2S
      this.tableData[5].flag3 = this.$route.params.obj.saAfA1S
      this.tableData[5].flag4 = this.$route.params.obj.saAfA2S
      this.tableData[6].inputValue1 = this.$route.params.obj.suMoA1
      this.tableData[6].inputValue2 = this.$route.params.obj.suMoA2
      this.tableData[6].inputValue3 = this.$route.params.obj.suAfA1
      this.tableData[6].inputValue4 = this.$route.params.obj.suAfA2
      this.tableData[6].inputValue5 = this.$route.params.obj.suMoR1
      this.tableData[6].inputValue6 = this.$route.params.obj.suMoR2
      this.tableData[6].inputValue7 = this.$route.params.obj.suAfR1
      this.tableData[6].inputValue8 = this.$route.params.obj.suAfR2
      this.tableData[6].flag1 = this.$route.params.obj.suMoA1S
      this.tableData[6].flag2 = this.$route.params.obj.suMoA2S
      this.tableData[6].flag3 = this.$route.params.obj.suAfA1S
      this.tableData[6].flag4 = this.$route.params.obj.suAfA2S
    }
  },
  methods: {
    // 这是保存的方法
    keepMyWeek () {
      let myPlus = {
        monthsId: this.$route.params.obj.id,
        summary1: this.summary1,
        summary2: this.summary2,
        summary3: this.summary3,
        plan1: this.plan1,
        plan2: this.plan2,
        plan3: this.plan3,

        monMoA1: this.tableData[0].inputValue1,
        monMoA2: this.tableData[0].inputValue2,
        monAfA1: this.tableData[0].inputValue3,
        monAfA2: this.tableData[0].inputValue4,
        monMoR1: this.tableData[0].inputValue5,
        monMoR2: this.tableData[0].inputValue6,
        monAfR1: this.tableData[0].inputValue7,
        monAfR2: this.tableData[0].inputValue8,
        monMoA1S: this.tableData[0].flag1,
        monMoA2S: this.tableData[0].flag2,
        monAfA1S: this.tableData[0].flag3,
        monAfA2S: this.tableData[0].flag4,

        tuMoA1: this.tableData[1].inputValue1,
        tuMoA2: this.tableData[1].inputValue2,
        tuAfA1: this.tableData[1].inputValue3,
        tuAfA2: this.tableData[1].inputValue4,
        tuMoR1: this.tableData[1].inputValue5,
        tuMoR2: this.tableData[1].inputValue6,
        tuAfR1: this.tableData[1].inputValue7,
        tuAfR2: this.tableData[1].inputValue8,
        tuMoA1S: this.tableData[1].flag1,
        tuMoA2S: this.tableData[1].flag2,
        tuAfA1S: this.tableData[1].flag3,
        tuAfA2S: this.tableData[1].flag4,
        weMoA1: this.tableData[2].inputValue1,
        weMoA2: this.tableData[2].inputValue2,
        weAfA1: this.tableData[2].inputValue3,
        weAfA2: this.tableData[2].inputValue4,
        weMoR1: this.tableData[2].inputValue5,
        weMoR2: this.tableData[2].inputValue6,
        weAfR1: this.tableData[2].inputValue7,
        weAfR2: this.tableData[2].inputValue8,
        weMoA1S: this.tableData[2].flag1,
        weMoA2S: this.tableData[2].flag2,
        weAfA1S: this.tableData[2].flag3,
        weAfA2S: this.tableData[2].flag4,
        thMoA1: this.tableData[3].inputValue1,
        thMoA2: this.tableData[3].inputValue2,
        thAfA1: this.tableData[3].inputValue3,
        thAfA2: this.tableData[3].inputValue4,
        thMoR1: this.tableData[3].inputValue5,
        thMoR2: this.tableData[3].inputValue6,
        thAfR1: this.tableData[3].inputValue7,
        thAfR2: this.tableData[3].inputValue8,
        thMoA1S: this.tableData[3].flag1,
        thMoA2S: this.tableData[3].flag2,
        thAfA1S: this.tableData[3].flag3,
        thAfA2S: this.tableData[3].flag4,
        frMoA1: this.tableData[4].inputValue1,
        frMoA2: this.tableData[4].inputValue2,
        frAfA1: this.tableData[4].inputValue3,
        frAfA2: this.tableData[4].inputValue4,
        frMoR1: this.tableData[4].inputValue5,
        frMoR2: this.tableData[4].inputValue6,
        frAfR1: this.tableData[4].inputValue7,
        frAfR2: this.tableData[4].inputValue8,
        frMoA1S: this.tableData[4].flag1,
        frMoA2S: this.tableData[4].flag2,
        frAfA1S: this.tableData[4].flag3,
        frAfA2S: this.tableData[4].flag4,
        saMoA1: this.tableData[5].inputValue1,
        saMoA2: this.tableData[5].inputValue2,
        saAfA1: this.tableData[5].inputValue3,
        saAfA2: this.tableData[5].inputValue4,
        saMoR1: this.tableData[5].inputValue5,
        saMoR2: this.tableData[5].inputValue6,
        saAfR1: this.tableData[5].inputValue7,
        saAfR2: this.tableData[5].inputValue8,
        saMoA1S: this.tableData[5].flag1,
        saMoA2S: this.tableData[5].flag2,
        saAfA1S: this.tableData[5].flag3,
        saAfA2S: this.tableData[5].flag4,
        suMoA1: this.tableData[6].inputValue1,
        suMoA2: this.tableData[6].inputValue2,
        suAfA1: this.tableData[6].inputValue3,
        suAfA2: this.tableData[6].inputValue4,
        suMoR1: this.tableData[6].inputValue5,
        suMoR2: this.tableData[6].inputValue6,
        suAfR1: this.tableData[6].inputValue7,
        suAfR2: this.tableData[6].inputValue8,
        suMoA1S: this.tableData[6].flag1,
        suMoA2S: this.tableData[6].flag2,
        suAfA1S: this.tableData[6].flag3,
        suAfA2S: this.tableData[6].flag4
      }

      keepMyWeekly(this.$qs.stringify(myPlus)).then((res) => {
        if (res.data.code == 200) {
          this.notifySucceed('修改成功！')
          this.$router.push('/myWeekly')
          window.scrollTo(top)
          sessionStorage.removeItem('TEMP')
        }
      })
    },
    // 这是存进本地的方法并前往我的周报页面,为了下次来能继续保存
    goToWeek () {
      let tempObject = {}
      tempObject.id = this.$route.params.obj.id
      tempObject.months = this.$route.params.obj.months
      tempObject.weekNum = this.$route.params.obj.weekNum
      tempObject.monday = this.$route.params.obj.monday
      tempObject.summary1 = this.summary1
      tempObject.summary2 = this.summary2
      tempObject.summary3 = this.summary3
      tempObject.plan1 = this.plan1
      tempObject.plan2 = this.plan2
      tempObject.plan3 = this.plan3
      tempObject.monMoA1 = this.tableData[0].inputValue1
      tempObject.monMoA2 = this.tableData[0].inputValue2
      tempObject.monAfA1 = this.tableData[0].inputValue3
      tempObject.monAfA2 = this.tableData[0].inputValue4
      tempObject.monMoR1 = this.tableData[0].inputValue5
      tempObject.monMoR2 = this.tableData[0].inputValue6
      tempObject.monAfR1 = this.tableData[0].inputValue7
      tempObject.monAfR2 = this.tableData[0].inputValue8
      tempObject.monMoA1S = this.tableData[0].flag1
      tempObject.monMoA2S = this.tableData[0].flag2
      tempObject.monAfA1S = this.tableData[0].flag3
      tempObject.monAfA2S = this.tableData[0].flag4
      tempObject.tuMoA1 = this.tableData[1].inputValue1
      tempObject.tuMoA2 = this.tableData[1].inputValue2
      tempObject.tuAfA1 = this.tableData[1].inputValue3
      tempObject.tuAfA2 = this.tableData[1].inputValue4
      tempObject.tuMoR1 = this.tableData[1].inputValue5
      tempObject.tuMoR2 = this.tableData[1].inputValue6
      tempObject.tuAfR1 = this.tableData[1].inputValue7
      tempObject.tuAfR2 = this.tableData[1].inputValue8
      tempObject.weMoA1 = this.tableData[2].inputValue1
      tempObject.weMoA2 = this.tableData[2].inputValue2
      tempObject.weAfA1 = this.tableData[2].inputValue3
      tempObject.weAfA2 = this.tableData[2].inputValue4
      tempObject.weMoR1 = this.tableData[2].inputValue5
      tempObject.weMoR2 = this.tableData[2].inputValue6
      tempObject.weAfR1 = this.tableData[2].inputValue7
      tempObject.weAfR2 = this.tableData[2].inputValue8
      tempObject.thMoA1 = this.tableData[3].inputValue1
      tempObject.thMoA2 = this.tableData[3].inputValue2
      tempObject.thAfA1 = this.tableData[3].inputValue3
      tempObject.thAfA2 = this.tableData[3].inputValue4
      tempObject.thMoR1 = this.tableData[3].inputValue5
      tempObject.thMoR2 = this.tableData[3].inputValue6
      tempObject.thAfR1 = this.tableData[3].inputValue7
      tempObject.thAfR2 = this.tableData[3].inputValue8
      tempObject.frMoA1 = this.tableData[4].inputValue1
      tempObject.frMoA2 = this.tableData[4].inputValue2
      tempObject.frAfA1 = this.tableData[4].inputValue3
      tempObject.frAfA2 = this.tableData[4].inputValue4
      tempObject.frMoR1 = this.tableData[4].inputValue5
      tempObject.frMoR2 = this.tableData[4].inputValue6
      tempObject.frAfR1 = this.tableData[4].inputValue7
      tempObject.frAfR2 = this.tableData[4].inputValue8
      tempObject.saMoA1 = this.tableData[5].inputValue1
      tempObject.saMoA2 = this.tableData[5].inputValue2
      tempObject.saAfA1 = this.tableData[5].inputValue3
      tempObject.saAfA2 = this.tableData[5].inputValue4
      tempObject.saMoR1 = this.tableData[5].inputValue5
      tempObject.saMoR2 = this.tableData[5].inputValue6
      tempObject.saAfR1 = this.tableData[5].inputValue7
      tempObject.saAfR2 = this.tableData[5].inputValue8
      tempObject.suMoA1 = this.tableData[6].inputValue1
      tempObject.suMoA2 = this.tableData[6].inputValue2
      tempObject.suAfA1 = this.tableData[6].inputValue3
      tempObject.suAfA2 = this.tableData[6].inputValue4
      tempObject.suMoR1 = this.tableData[6].inputValue5
      tempObject.suMoR2 = this.tableData[6].inputValue6
      tempObject.suAfR1 = this.tableData[6].inputValue7
      tempObject.suAfR2 = this.tableData[6].inputValue8
      tempObject.suMoA1S = this.tableData[6].flag1
      tempObject.suMoA2S = this.tableData[6].flag2
      tempObject.suAfA1S = this.tableData[6].flag3
      tempObject.suAfA2S = this.tableData[6].flag4
      tempObject.tuMoA1S = this.tableData[1].flag1
      tempObject.tuMoA2S = this.tableData[1].flag2
      tempObject.tuAfA1S = this.tableData[1].flag3
      tempObject.tuAfA2S = this.tableData[1].flag4
      tempObject.saMoA1S = this.tableData[5].flag1
      tempObject.saMoA2S = this.tableData[5].flag2
      tempObject.saAfA1S = this.tableData[5].flag3
      tempObject.saAfA2S = this.tableData[5].flag4
      tempObject.frMoA1S = this.tableData[4].flag1
      tempObject.frMoA2S = this.tableData[4].flag2
      tempObject.frAfA1S = this.tableData[4].flag3
      tempObject.frAfA2S = this.tableData[4].flag4
      tempObject.thMoA1S = this.tableData[3].flag1
      tempObject.thMoA2S = this.tableData[3].flag2
      tempObject.thAfA1S = this.tableData[3].flag3
      tempObject.thAfA2S = this.tableData[3].flag4
      tempObject.weMoA1S = this.tableData[2].flag1
      tempObject.weMoA2S = this.tableData[2].flag2
      tempObject.weAfA1S = this.tableData[2].flag3
      tempObject.weAfA2S = this.tableData[2].flag4

      window.sessionStorage.setItem('TEMP', JSON.stringify(tempObject))
      this.$router.push('/myWeekly')
      window.scrollTo(top)
    },
    //数据回显
    getMyWeekIng () {
      getMyWeek({ monthsId: this.$route.params.obj.id }).then((res) => {
        if (res.data.code == 200) {
          this.summary1 = res.data.data.summary1
          this.summary2 = res.data.data.summary2
          this.summary3 = res.data.data.summary3
          this.plan1 = res.data.data.plan1
          this.plan2 = res.data.data.plan2
          this.plan3 = res.data.data.plan3
          // console.log(this.tableData[1])
          this.tableData[0].inputValue1 = res.data.data.monMoA1
          this.tableData[0].inputValue2 = res.data.data.monMoA2
          this.tableData[0].inputValue3 = res.data.data.monAfA1
          this.tableData[0].inputValue4 = res.data.data.monAfA2
          this.tableData[0].inputValue5 = res.data.data.monMoR1
          this.tableData[0].inputValue6 = res.data.data.monMoR2
          this.tableData[0].inputValue7 = res.data.data.monAfR1
          this.tableData[0].inputValue8 = res.data.data.monAfR2
          this.tableData[0].flag1 = res.data.data.monMoA1S
          this.tableData[0].flag2 = res.data.data.monMoA2S
          this.tableData[0].flag3 = res.data.data.monAfA1S
          this.tableData[0].flag4 = res.data.data.monAfA2S

          this.tableData[1].inputValue1 = res.data.data.tuMoA1
          this.tableData[1].inputValue2 = res.data.data.tuMoA2
          this.tableData[1].inputValue3 = res.data.data.tuAfA1
          this.tableData[1].inputValue4 = res.data.data.tuAfA2
          this.tableData[1].inputValue5 = res.data.data.tuMoR1
          this.tableData[1].inputValue6 = res.data.data.tuMoR2
          this.tableData[1].inputValue7 = res.data.data.tuAfR1
          this.tableData[1].inputValue8 = res.data.data.tuAfR2
          this.tableData[1].flag1 = res.data.data.tuMoA1S
          this.tableData[1].flag2 = res.data.data.tuMoA2S
          this.tableData[1].flag3 = res.data.data.tuAfA1S
          this.tableData[1].flag4 = res.data.data.tuAfA2S
          this.tableData[2].inputValue1 = res.data.data.weMoA1
          this.tableData[2].inputValue2 = res.data.data.weMoA2
          this.tableData[2].inputValue3 = res.data.data.weAfA1
          this.tableData[2].inputValue4 = res.data.data.weAfA2
          this.tableData[2].inputValue5 = res.data.data.weMoR1
          this.tableData[2].inputValue6 = res.data.data.weMoR2
          this.tableData[2].inputValue7 = res.data.data.weAfR1
          this.tableData[2].inputValue8 = res.data.data.weAfR2
          this.tableData[2].flag1 = res.data.data.weMoA1S
          this.tableData[2].flag2 = res.data.data.weMoA2S
          this.tableData[2].flag3 = res.data.data.weAfA1S
          this.tableData[2].flag4 = res.data.data.weAfA2S
          this.tableData[3].inputValue1 = res.data.data.thMoA1
          this.tableData[3].inputValue2 = res.data.data.thMoA2
          this.tableData[3].inputValue3 = res.data.data.thAfA1
          this.tableData[3].inputValue4 = res.data.data.thAfA2
          this.tableData[3].inputValue5 = res.data.data.thMoR1
          this.tableData[3].inputValue6 = res.data.data.thMoR2
          this.tableData[3].inputValue7 = res.data.data.thAfR1
          this.tableData[3].inputValue8 = res.data.data.thAfR2
          this.tableData[3].flag1 = res.data.data.thMoA1S
          this.tableData[3].flag2 = res.data.data.thMoA2S
          this.tableData[3].flag3 = res.data.data.thAfA1S
          this.tableData[3].flag4 = res.data.data.thAfA2S
          this.tableData[4].inputValue1 = res.data.data.frMoA1
          this.tableData[4].inputValue2 = res.data.data.frMoA2
          this.tableData[4].inputValue3 = res.data.data.frAfA1
          this.tableData[4].inputValue4 = res.data.data.frAfA2
          this.tableData[4].inputValue5 = res.data.data.frMoR1
          this.tableData[4].inputValue6 = res.data.data.frMoR2
          this.tableData[4].inputValue7 = res.data.data.frAfR1
          this.tableData[4].inputValue8 = res.data.data.frAfR2
          this.tableData[4].flag1 = res.data.data.frMoA1S
          this.tableData[4].flag2 = res.data.data.frMoA2S
          this.tableData[4].flag3 = res.data.data.frAfA1S
          this.tableData[4].flag4 = res.data.data.frAfA2S
          this.tableData[5].inputValue1 = res.data.data.saMoA1
          this.tableData[5].inputValue2 = res.data.data.saMoA2
          this.tableData[5].inputValue3 = res.data.data.saAfA1
          this.tableData[5].inputValue4 = res.data.data.saAfA2
          this.tableData[5].inputValue5 = res.data.data.saMoR1
          this.tableData[5].inputValue6 = res.data.data.saMoR2
          this.tableData[5].inputValue7 = res.data.data.saAfR1
          this.tableData[5].inputValue8 = res.data.data.saAfR2
          this.tableData[5].flag1 = res.data.data.saMoA1S
          this.tableData[5].flag2 = res.data.data.saMoA2S
          this.tableData[5].flag3 = res.data.data.saAfA1S
          this.tableData[5].flag4 = res.data.data.saAfA2S
          this.tableData[6].inputValue1 = res.data.data.suMoA1
          this.tableData[6].inputValue2 = res.data.data.suMoA2
          this.tableData[6].inputValue3 = res.data.data.suAfA1
          this.tableData[6].inputValue4 = res.data.data.suAfA2
          this.tableData[6].inputValue5 = res.data.data.suMoR1
          this.tableData[6].inputValue6 = res.data.data.suMoR2
          this.tableData[6].inputValue7 = res.data.data.suAfR1
          this.tableData[6].inputValue8 = res.data.data.suAfR2
          this.tableData[6].flag1 = res.data.data.suMoA1S
          this.tableData[6].flag2 = res.data.data.suMoA2S
          this.tableData[6].flag3 = res.data.data.suAfA1S
          this.tableData[6].flag4 = res.data.data.suAfA2S
          // this.$set('tableData', '')

          // console.log(res.data.data)
          // console.log(this.tableData)
        }
      })
    },
    getWeekday (day) {
      day = day + 1
      const weekdays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      if (day >= 1 && day <= 7) {
        return weekdays[day - 1]
      } else {
        return '输入无效'
      }
    },
    addDays (dateString, days) {
      const date = new Date(dateString)
      date.setDate(date.getDate() + days)
      return date.toISOString().split('T')[0]
    },

    buildWeek () {
      for (var i = 0; i <= 6; i++) {
        this.tableData.push({
          week: this.getWeekday(i),
          time: '上午' + '\n' + '下午',

          day: this.addDays(this.$route.params.obj.monday, i),
          inputValue1: '',
          inputValue2: '',
          inputValue3: '',
          inputValue4: '',
          inputValue5: '',
          inputValue6: '',
          inputValue7: '',
          inputValue8: '',
          flag1: '',
          flag2: '',
          flag3: '',
          flag4: ''
        })
      }
    },
    getWeekTime (date) {
      const weekNumber = moment(date).isoWeek()
      return `第${weekNumber}周`
    }
  }
}
</script>

<style scoped>
.custom-input {
  margin-bottom: 10px; /* 设置输入框之间的右侧间隔 */
}
.cell-wrap {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
