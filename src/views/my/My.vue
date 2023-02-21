<template>
  <div class="my">
    <Header :header="header"> </Header>
    <!-- V-IF -->
    <header>
      <div class="login" v-if="!loginStatus">
        <van-button
          plain
          hairline
          icon="friends"
          type="info"
          @click="goLogin"
          color="#104c1f"
          round
        >
          登录/注册
        </van-button>
      </div>
      <div v-else class="login">
        <div class="username">用户名：{{ userInfo.name }}</div>
      </div>
    </header>
    <!-- V-IF -->
    <section v-if="!loginStatus">
      <ul>
        <li>请登录</li>
      </ul>
    </section>
    <section v-else>
      <ul>
        <li @click="goAddress">地址管理</li>
        <li @click="goOrderList">我的订单</li>
        <li @click="LOGIN_OUT">退出登录</li>
      </ul>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/common/Header.vue";
import { mapState,   mapMutations } from "vuex";
export default {
  data() {
    return {
      header: {
        title: "我的",
      },
    };
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  components: { Tabbar, Header },
  methods: {
    ...mapMutations(["LOGIN_OUT"]),
    goLogin() {
      this.$router.push("/login");
    },
    goAddress() {
      this.$router.push('/address')
    },
    goOrderList() {
      this.$router.push('/orderList')
    }
  },
};
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f5f5;
  height: 100vh;
  header {
    padding-top: 1.466667rem;
    .login {
    font-size: 0.64rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 3.92rem;
    background-color: #d3d3d3;
      .van-button {
        width: 4rem;
        border: solid 0.06rem;
        box-shadow: 0.1rem 0.1rem grey;
      }
    }
  }
  section {
    padding-bottom: 1.6rem;
    ul > li {
      font-size: 0.533333rem;
    }
  }
}

</style>