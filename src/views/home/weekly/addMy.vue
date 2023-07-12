<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @添加周报的页面
-->
<template>
  <div>
    <div>
      <el-button type="primary"
                 @click="getNowWeekF">选择本周</el-button><el-button type="primary"
                 @click="getLastWeek">选择上周</el-button>
      <el-date-picker v-model="selectedDate"
                      type="date"
                      @change="handleDateChange"
                      style="margin-left: 10px;"
                      placeholder="按日期选择"></el-date-picker>

      <el-button type="warning"
                 style="margin-left: 10px;"
                 @click="goToWeek">返回</el-button>
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
                 @click="addWeekly">
        提交</el-button><el-button type="warning"
                 @click="goToWeek">返回</el-button>
    </div>
  </div>
</template>

<script>
import { addOneWeek } from '@/api/user'
import { addOneMon } from '@/api/user'
export default {
  data () {
    return {
      summary1: '',
      summary2: '',
      summary3: '',
      plan1: '',
      plan2: '',
      plan3: '',
      tableData: [],
      weeknum: '', selectedDate: '' // 保存选中的日期
    }
  },
  created () {
    // console.log('接收到的对象参数', this.$route.params.obj)
    this.buildWeek()
  },

  methods: {


    //保存
    addWeekly () {
      console.log(this.months);
      if (this.months == '' || this.months == undefined) {
        this.$message.warning('请选择日期!')
        return
      }

      //   console.log(this.tableData[0].day)

      //   let client = {
      //     months: this.months,
      //     weekNum: this.weeknum,
      //     monday: this.tableData[0].day,
      //     sunday: this.tableData[6].day
      //   }
      //   console.log(client)
      addOneMon({
        months: this.months,
        weekNum: this.weeknum,
        monday: this.tableData[0].day,
        sunday: this.tableData[6].day
      }).then((res) => {
        if (res.data.code == 200) {
          console.log('记录1添加成功！' + res.data.data.id)
          let myPlus = {
            monthsId: res.data.data.id,
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
          console.log(myPlus);
          addOneWeek(this.$qs.stringify(myPlus)).then((res) => {
            if (res.data.code == 200) {
              this.notifySucceed('新增成功！')
              this.$router.push('/myWeekly')
              window.scrollTo(top)
            }
          })
        }
      })
    },
    // 获取上周时间
    getLastWeek () {
      // 获取当前时间
      var currentDate = new Date();

      // 获取当前时间的毫秒表示
      var currentTime = currentDate.getTime();

      // 计算新日期的毫秒表示（当前时间减去 7 天）
      var newTime = currentTime - (7 * 24 * 60 * 60 * 1000);

      // 创建新日期对象
      var newDate = new Date(newTime);

      this.getNowWeek(newDate)
    },
    //这是本周时间的获取
    getNowWeekF () {
      // 获取当前时间
      const now = new Date()
      this.getNowWeek(now)

    },

    // 日期改变处理
    handleDateChange (value) {
      // 处理日期变化事件
      console.log(value);
      if (!value) {
        console.log('日期选择已取消')
        // 在这里执行你的自定义代码
      } else {
        this.getNowWeek(value)
      }
      // 进行相应的操作


    },
    //下面封装起来
    getNowWeek (now) {
      // 获取当前时间是本周的第几天 (0 为星期天，1 为星期一，...，6 为星期六)
      const dayOfWeek = now.getDay()
      // 计算日期偏移量，使其指向本周的周一（以周一为起始）
      const diffDays = dayOfWeek === 1 ? 0 : 1 - dayOfWeek
      if (diffDays > 0) diffDays += 1

      // 设置日期为本周的周一（以周一为起始）
      const monday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + diffDays
      )
      this.tableData[0].day = this.addDays(monday, 1) //周一
      this.tableData[1].day = this.addDays(monday, 2)
      this.tableData[2].day = this.addDays(monday, 3)
      this.tableData[3].day = this.addDays(monday, 4)
      this.tableData[4].day = this.addDays(monday, 5)
      this.tableData[5].day = this.addDays(monday, 6)
      this.tableData[6].day = this.addDays(monday, 7) //周日
      this.weeknum = this.getWeekOfMonth(new Date(this.tableData[0].day)) //从星期一开始，获取是本月的第几周
      this.months = this.getCurrentMonth() //获取当前的月份
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

          day: '请选择日期',
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
          flag4: '',
          months: ''
        })
      }
    },
    getWeekTime (date) {
      const weekNumber = moment(date).isoWeek()
      return `第${weekNumber}周`
    },
    goToWeek () {
      this.$router.push('/myWeekly')
    },
    getWeekOfMonth (targetDates) {
      const targetDate = targetDates
      const firstDayOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1
      )
      let dayOfWeekFirstDay = firstDayOfMonth.getDay()
      dayOfWeekFirstDay = dayOfWeekFirstDay === 0 ? 7 : dayOfWeekFirstDay
      let weekOfMonth = Math.ceil(
        (targetDate.getDate() + dayOfWeekFirstDay - 2) / 7
      )
      if (targetDate.getDate() === 1 && targetDate.getDay() === 1) {
        weekOfMonth = 1
      }
      return weekOfMonth
    },
    getCurrentMonth () {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      let month = currentDate.getMonth() + 1 // 月份从 0 开始，需要加 1
      month = month < 10 ? '0' + month : month // 如果月份小于 10，补充 0
      const formattedMonth = year + '-' + month
      return formattedMonth
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
