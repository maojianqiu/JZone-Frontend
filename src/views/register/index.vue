<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autoComplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon
            icon-class="login-mall"
            style="width: 56px; height: 56px; color: #409eff"
          ></svg-icon>
        </div>
        <h2 class="login-title color-main">注册账号</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input
            name="nickname"
            type="text"
            v-model="loginForm.nickname"
            autoComplete="on"
            placeholder="请输入昵称"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            name="phone"
            type="number"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.phone"
            autoComplete="on"
            placeholder="请输入联系方式"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <el-input
            name="authCode"
            type="number"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.authCode"
            autoComplete="on"
            placeholder="请输入验证码"
            style="width:220px;"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
          </el-input>
            <el-button type="primary" size="small" @click="handleAuthCode" v-model="authCode">
              {{(authCode == ""||authCode==null) ? '获取验证码': authCode}}
              </el-button>
        </el-form-item>
        <div style="font-size:11px;margin-bottom:20px;">
          <span >注册即代表您已同意 <a href="http://localhost:8090/copyright"  rel="noreferrer" target="_blank" style="color: #409eff;">《版权声明》</a> 和 <a href="http://localhost:8090/policy"  rel="noreferrer" target="_blank" style="color: #409eff;">《服务条款》</a></span>
        </div>

        <el-form-item style="margin-bottom: 60px; text-align: center">
          <el-button
            style="width: 45%"
            type="primary"
            :loading="loading"
            @click="handleLogin"
          >
            注册
          </el-button>
          <span slot="prefix">
            <svg-icon icon-class="phone" class="color-main"></svg-icon>
          </span>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout" />
  </div>
</template>

<script>
import { isvalidUsername, isvalidateTelephone } from "@/utils/validate";
import login_center_bg from "@/assets/images/02.jpg";
import { getAuthCode, register} from "@/api/mem_login";

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validateNickname = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的昵称"));
      } else {
        callback();
      }
    };
    const validateTelephone = (rule, value, callback) => {
      if (!isvalidateTelephone(value)) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    const validateAuthCode = (rule, value, callback) => {
      if (value.length != 6) {
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
     const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      authCode:'',
      loginForm: {
        username: "",
        nickname: "",
        password: "",
        phone: "",
        authCode:'',
        authCodeImg:"",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        nickname: [
          { required: true, trigger: "blur", validator: validateNickname },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        phone: [
          { required: true, trigger: "blur", validator: validateTelephone },
        ],
        authCode: [
          { required: true, trigger: "blur", validator: validateAuthCode },
        ],
      },
      loading: false,
      pwdType: "password",
      login_center_bg,
      dialogVisible: false,
      supportDialogVisible: false,
    };
  },

  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      //element-ui 表單驗證
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log("==========");
          console.log(this.loginForm);
          this.loading = true;
          //提交异步store对象，commit是同步
          // .then 是promise 回调函数的；dispatch返回的就是promise
          register(this.loginForm)
            .then((response) => {
              this.loading = false;
              if(response.data == -1){
                this.$message({
                  message: response.message,
                  type: "error",
                });
                return ;
              }
              this.$router.push({ path: "/login" });
              this.$message({
                message: "注册成功！",
                type: "success",
              });

            })
            .catch(() => {
              this.$message.error("系统异常，请重新操作");
              this.loading = false;
            });

          
        } else {
          // this.$message({
          //   message: "参数验证不合法哦~",
          //   type: "warning",
          // });
          return false;
        }
      });
    },
    handleAuthCode(){
        if (isvalidateTelephone(this.loginForm.phone)) {
          this.loading = true;
          let phone = { telephone: this.loginForm.phone}
          getAuthCode(phone)
            .then((response) => {
              this.loading = false;
              this.authCode = response.data
            })
            .catch(() => {
              this.$message.error("系统异常，请重新操作");
              this.loading = false;
            });
        } else {
          this.$message({
            message: "请输入联系方式",
            type: "warning",
          });
          return false;
        }
    }
  },
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px solid #409eff;
}

.login-title {
  text-align: center;
}

.login-center-layout {

  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;

}
</style>
