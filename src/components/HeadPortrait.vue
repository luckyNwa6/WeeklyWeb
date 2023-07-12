<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @本来是右边头像的组件，改成修改密码和退出的
-->
<template>
  <div>
    <div class="navbar">
      <el-button @click="showDialog"
                 style="
          border: none;
          background-color: transparent;

          color: white;
        "
                 icon="el-icon-lock">
        修改密码
      </el-button>
      <el-button @click="logout"
                 icon="el-icon-switch-button"
                 style="background-color: transparent; border: none; color: white">
        退出系统
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible"
               title="修改密码"
               width="30%">
      <!-- 修改密码表单 -->
      <el-form ref="form"
               :model="form"
               :rules="rules"
               label-width="100px">
        <el-form-item label="旧密码"
                      prop="oldPassword">
          <el-input v-model="form.oldPassword"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码"
                      prop="newPassword">
          <el-input v-model="form.newPassword"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码"
                      prop="confirmPassword">
          <el-input v-model="form.confirmPassword"
                    type="password"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="submitForm">修改</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { modifyPwd } from '@/api/user'
export default {
  name: 'HeadPortrait',

  data () {
    return {
      dialogVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions(['setToken']),
    logout () {
      sessionStorage.removeItem('ADMIN')
      sessionStorage.removeItem('token')

      this.setToken('')
      this.$router.push('/login')
    },
    showDialog () {
      this.dialogVisible = true
    },
    validateConfirmPassword (rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 处理提交逻辑
          // ...
          this.dialogVisible = false

          modifyPwd({
            userAcc: JSON.parse(sessionStorage.getItem('ADMIN')).userAcc,
            newPassword: this.form.newPassword,
            oldPassword: this.form.oldPassword
          }).then((res) => {
            if (res.data.code == 200) {
              this.notifySucceed(res.data.msg)
            } else {
              this.notifyError(res.data.msg)
            }
          })
        } else {
          console.log('表单验证失败')
        }
      })
    }
  }
}
</script>
<style scoped>
.navbar {
  widows: 199px;
  height: 60px;
  margin-top: 20px;
}
img {
  width: 60px;
  border-radius: 10px;
}
a {
  text-decoration: none;
}
</style>
