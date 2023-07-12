<!--
 * @Author: luckyNwa
 * @Date: 2023-07-04 10:38:45
 * @登录页面
-->
<template>
  <div class="bg">
    <div class="login-container">
      <h1 class="login-title">工作日志系统</h1>
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    type="password"
                    placeholder="密码"></el-input>
        </el-form-item>
        <div class="yzmdiv">
          <el-form-item prop="yzm">
            <el-input placeholder="验证码"
                      v-model="loginForm.yzm"
                      style="width: 130px; margin-right: 22px"></el-input>
          </el-form-item>
          <div>
            <el-button prop="yzmm"
                       style="width: 100px"
                       @click="refreshYzm">{{
              loginForm.yzmm
            }}</el-button>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary"
                     @click="login"
                     style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginM } from '@/api/login'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'MyLogin',
  computed: {
    ...mapGetters(['getToken'])
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        code: '',
        yzm: '',
        yzmm: '6666'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      codeUrl: ''
    }
  },
  methods: {
    ...mapActions(['setToken']),
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          if (
            this.loginForm.yzm.toLowerCase() !==
            this.loginForm.yzmm.toLowerCase()
          ) {
            console.log('验证码有误！')
            this.$msgbox({
              title: '提示',
              roundButton: true,
              message: '验证码有误',
              showClose: false,
              confirmButtonText: '确定'
            })
            return
          }
          // let client = {
          //   userAcc: this.loginForm.username,
          //   userPwd: this.loginForm.password
          // }

          // loginM(this.$qs.stringify(client)).then((resp) => {
          //   const data = resp.data.data
          //   console.log(resp)
          //   if (data !== null) {
          //     window.sessionStorage.setItem('ADMIN', JSON.stringify(data))
          //     this.notifySucceed(resp.data.msg)
          //     this.$router.push('/home')
          //     // this.setUser(data)

          //     // this.isShowLogin = false
          //     // this.$emit('userName', data.userName)
          //   } else {
          //     this.yzmm = this.$options.methods.showCode()
          //     this.$set(this.loginForm, 'yzmm', this.yzmm)

          //     this.$refs['loginForm'].resetFields()

          //     this.notifyError('账号或密码错误')
          //   }
          // })
          loginM({ userAcc: this.loginForm.username, userPwd: this.loginForm.password }).then((resp) => {
            const data = resp.data.data
            console.log(resp)
            if (data !== null) {
              window.sessionStorage.setItem('ADMIN', JSON.stringify(data))
              window.sessionStorage.setItem('token', data.token)
              this.setToken(data.token)
              //   console.log('vuex里的token' + this.getToken)
              this.notifySucceed(resp.data.msg)
              this.$router.push('/home')
              // this.setUser(data)

              // this.isShowLogin = false
              // this.$emit('userName', data.userName)
            } else {
              this.yzmm = this.$options.methods.showCode()
              this.$set(this.loginForm, 'yzmm', this.yzmm)

              this.$refs['loginForm'].resetFields()

              this.notifyError('账号或密码错误')
            }
          })
        }
      })
    },
    refreshCode () {
      // 在这里刷新验证码
      console.log('刷新验证码')
      this.yzmm = this.$options.methods.showCode()
      this.$set(this.loginForm, 'yzmm', this.yzmm)
    },
    showCode () {
      var codeBox = '23456789qwertyupasdfghjkzxcvbnmQWERTYUPASDFGHJKZXCVBNM'

      var code = ''
      for (var i = 1; i <= 4; i++) {
        code += codeBox.charAt(Math.floor(Math.random() * codeBox.length))
      }
      this.yzmm = code
      return code
    },
    refreshYzm () {
      this.yzmm = this.$options.methods.showCode()
      this.$set(this.loginForm, 'yzmm', this.yzmm)
    }
  },
  mounted () {
    // 初始化时获取验证码
    this.refreshCode()
  }
}
</script>

<style></style>
