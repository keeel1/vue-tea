<template>
  <div>
    <div class="my">
      <Header :header="header"> </Header>
      <!-- V-IF -->
      <header>
        <div class="login" v-if="!loginStatus">
          <van-button plain hairline icon="friends" type="info" @click="goLogin" color="#104c1f" round>
            登录/注册
          </van-button>
        </div>
        <div v-else class="login">
          <van-image round width="2rem" height="2rem" src="https://img01.yzcdn.cn/vant/cat.jpeg" fit="cover" />
          <div class="username">{{ userInfo.name }}</div>
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
          <li @click="goAddress"><van-icon name="map-marked" color="#104c1f" />地址管理</li>
          <li @click="goOrderList"><van-icon name="balance-list" color="#104c1f" />我的订单</li>
          <li @click="LOGIN_OUT"><van-icon name="clear" color="#104c1f" />退出登录</li>
        </ul>
      </section>

    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/common/Header.vue";
import { mapState, mapMutations } from "vuex";
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
      box-sizing: border-box;
      font-size: 0.64rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 3.92rem;
      background-color: #2f5039;
      .username {
        padding:10px;
        font-weight:800;
        font-size: 0.6rem;
        color: white;
      }

      .van-button {
        width: 4rem;
        border: solid 0.06rem;
        box-shadow: 0.1rem 0.1rem grey;
      }
    }
  }

  section {
    padding-bottom: 1.6rem;

    ul>li {
      border-bottom: 0.02rem dashed #104c1f;
      font-size: 0.533333rem;
      padding: 0.2666667rem 0.4rem;
      font-size: 0.45rem;
      color: black;
    }
  }
}
</style>