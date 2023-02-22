<template>
  <div class="login">
    <Header :header="header"></Header>
    <section>
      <div class="login-warp">
        <div class="login-email">
          <input type="text" placeholder="请输入邮箱号" v-model="username" />
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="login-check" @click="loginCheck">登录</div>
      </div>
      <div class="login-more">
        <span class="pwdlogin">忘记密码</span>
        <span class="register" @click="goRegister">邮箱注册</span>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/common/Header.vue";
import { postLoginTest } from "@/http/axios.js";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      header: {
        title: "登录",
      },
    };
  },
  components: { Header, Tabbar },
  methods: {
    ...mapMutations(["USER_LOGIN"]),
    loginCheck() {
      if (!this.username || !this.password) {
        return Toast.fail({ message: "请输入账号密码", duration: 1000 });
      }
      postLoginTest({
        user: this.username,
        pwd: this.password,
      }).then((res) => {
        setTimeout(() => {
          var type = "";
          res.data.success ? (type = "success") : (type = "fail");
          Toast[type]({
            message: res.data.msg,
          });
        }, 500);
        // 信息存入vuex
        if (res.data.success) {
          this.USER_LOGIN(res.data.data);
          this.$router.push("/my");
        }
      });
    },
    goRegister() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style scoped>
section {
  padding-top:1.466667rem;
  padding-bottom: 1.6rem;
  background-color: #f5f5f5;
  height: calc(100vh - 3.066667rem);
}
.login-warp {
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
.login-check {
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
  width: 9rem;
  height: 0.597333rem;
  margin: 0 auto;
  position: relative;
}
.login-more .pwdlogin {
  position: absolute;
  left: 0;
}
.login-more .register {
  position: absolute;
  right: 0;
}
</style>