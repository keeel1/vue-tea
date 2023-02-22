<template>
  <div class="register">
    <Header :header="header"></Header>
    <section>
      <div class="register-warp">
        <div class="register-email">
          <input
            type="text"
            placeholder="请输入用户名"
            v-model="userInfo.username"
          />
          <input
            type="text"
            placeholder="请输入邮箱号"
            v-model="userInfo.email"
          />
          <input
            type="password"
            placeholder="请输入密码"
            v-model="userInfo.password"
          />
          <input
            type="password"
            placeholder="请再次输入密码"
            v-model="userInfo.password_confirm"
          />
          <input
            type="text"
            placeholder="请输入验证码"
            v-model="userInfo.code"
          />
          <div
            class="code"
            :class="disabled ? 'disabled' : ''"
            @click="snedCode"
          >
            {{ codeMsg }}
          </div>
        </div>
        <div class="register-check" @click="handleRegister">注册</div>
      </div>
      <div class="login-more">
        <span class="pwdlogin">忘记密码</span>
        <span class="go-login" @click="goLogin">已有账号？去登录</span>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/common/Header.vue";
import { postEmail } from "@/http/axios.js";
import { Toast } from "vant";
import { RegisterData } from "@/http/axios.js";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        code: "",
      },
      codeNum: 30,
      codeMsg: "获取验证码",
      disabled: false,
      recCode: "",
      header: {
        title: "注册",
      },
    };
  },
  components: { Header, Tabbar },
  methods: {
    snedCode() {
      if (this.disabled) return;
      // 验证邮箱格式
      let regEmail = new RegExp(
        "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
      );
      if (!regEmail.test(this.userInfo.email)) {
        return Toast.fail("请输入正确的邮箱");
      }
      // 发送邮件
      postEmail({ email: this.userInfo.email }).then((res) => {
        this.recCode = res.code;
        setTimeout(() => {
          var type = "";
          res.success ? (type = "success") : (type = "fail");
          Toast[type]({
            message: res.msg,
          });
        }, 500);
      });
      // 倒计时
      let timer = setInterval(() => {
        // 禁止点击
        this.disabled = true;
        --this.codeNum;
        this.codeMsg = `重新发送${this.codeNum}`;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        this.codeNum = 30;
        this.disabled = false;
        this.codeMsg = `获取短信验证码`;
      }, 30000);
    },
    handleRegister() {
      // 检查填写情况
      let { username, email, password, password_confirm, code } = this.userInfo;
      if (username && email && password && password_confirm && code) {
        let regEmail = new RegExp(
          "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
        );
        if (!regEmail.test(email)) {
          return Toast.fail("请输入正确的邮箱");
        }
        if (password != password_confirm) {
          return Toast.fail("两次密码不一致");
        }
        if (!(password.length >= 6 && password.length <= 12)) {
          return Toast.fail("密码长度为6到12位");
        }
        if (code != this.recCode) {
          console.log(code);
          return Toast.fail("验证码错误");
        }
        // 发送注册
        RegisterData({ userInfo: this.userInfo }).then((res) => {
          setTimeout(() => {
            var type = "";
            res.data.success ? (type = "success") : (type = "fail");
            Toast[type]({
              message: res.data.msg,
            });
          }, 500);
        });
      } else {
        // 填写有误
        Toast.fail("请填完所有项");
        setTimeout(() => {
          Toast.clear();
        }, 1000);
      }
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
section {
  padding-top: 1.466667rem;
  padding-bottom: 1.6rem;
  background-color: #f5f5f5;
  height: calc(100vh - 3.066667rem);
}
.register-warp {
  padding: 0.533333rem;
}
input {
  border: 0.026667rem solid #9a9a9a;
  padding: 0.2rem;
  font-size: 0.373333rem;
  margin-top: 0.5rem;
  height: 1.066667rem;
  width: 8.7rem;
  background-color: #fff;
  border-radius: 0.08rem;
}
.register-email {
  position: relative;
}
.code {
  font-size: 0.373333rem;
  text-align: center;
  color: white;
  width: 4rem;
  height: 1.4rem;
  line-height: 1.4rem;
  z-index: 999;
  position: absolute;
  right: -0.2rem;
  bottom: 0.06rem;
  background-color: #104c1f;
  border-radius: 0.08rem;
}
.disabled {
  background-color: #9a9a9a;
  pointer-events: none;
}
.register-check {
  font-size: 0.373333rem;
  margin-top: 0.533333rem;
  text-align: center;
  width: 9.1rem;
  height: 1.173333rem;
  line-height: 1.173333rem;
  border-radius: 0.08rem;
  background-color: #104c1f;
  color: white;
}
.login-more {
  font-size: 0.373333rem;
  width: 9.1rem;
  height: 0.597333rem;
  margin: 0 auto;
  position: relative;
}
.login-more .pwdlogin {
  position: absolute;
  left: 0;
}
.login-more .go-login {
  position: absolute;
  right: 0;
}
</style>