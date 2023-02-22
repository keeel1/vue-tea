<template>
  <div class="home">
    <div class="top-all">
      <Header>
        <div slot="center" class="center" @click="goSearch">
          <i class="iconfont icon-fangdajing"></i>
          <form action="" onsubmit="return false" @keyup.enter="goSearch">
            <input
              type="search"
              placeholder="搜您喜欢的产品..."
              id="searchtxt"
            />
          </form>
        </div>
        <i class="iconfont icon-kefu" slot="right"></i>
      </Header>
      <ly-tab
        v-model="selectedId"
        :items="items"
        :options="options"
        @change="changeBar"
      ></ly-tab>
    </div>
    <section>
      <div>
        <div class="content">
          <Goods :goodsList="goodsList"></Goods>
        </div>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/search/Header.vue";
import Goods from "@/components/common/Goods.vue";
import { getHomeTabbar, getHomeList } from "@/http/axios.js";
export default {
  naem: "home",
  components: { Tabbar, Header, Goods },
  data() {
    return {
      type: 0,
      items: [],
      goodsList: [],
      selectedId: 0,
      options: {
        activeColor: "#4ac23f",
      },
    };
  },
  methods: {
    changeBar(item, index) {
      let BarType = index;
      getHomeList({ type: BarType }).then((res) => {
        this.goodsList = res.data;
      });
      // url显示参数(type?)
      this.$router.push({
        path: "/home",
        query: { type: BarType },
      });
    },
    getData() {
      // 拿到头部数据
      getHomeTabbar().then((res) => {
        this.items = res.data;
        // console.log(res.data);
      });
      //首次加载综合里的数据
      getHomeList({ type: this.type }).then((res) => {
        this.goodsList = res.data;
        //  url显示参数(type?)
        this.$router.push({
          path: "/home",
          query: { type: this.type },
        });
      });
    },
    goSearch() {
      this.$router.push("/search");
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
/* header */
.center {
  display: flex;
  align-items: center;
  width: 6.56rem;
  height: 0.8rem;
  background-color: white;
  border-radius: 0.8rem;
  color: #747474;
  i {
  font-size: 0.453333rem;
  margin: 0rem 0.133333rem;
  }
  span {
  font-size: 0.4rem;
  }
  form {
  display: flex;
  }
  form input {
  width: 5.333333rem;
  flex: 1;
  }
}
/* .center i {
  font-size: 0.453333rem;
  margin: 0rem 0.133333rem;
} */
// .center span {
//   font-size: 0.4rem;
// }
// .center form {
//   display: flex;
// }
// .center form input {
//   width: 5.333333rem;
//   flex: 1;
// }
/* setcion */
section {
  position: absolute;
  width: 100%;
  margin-top: 2.4rem;
  margin-bottom: 1.6rem;
}
.ly-tab {
  position: fixed;
  margin-top: 1.173333rem;
  z-index: 999;
  background-color: aliceblue;
}
/* ::v-deep 深度选择器 当使用了组件样式去掉scoped的话又会影响全局样式，针对这种情况，可以使用深度作用选择器（即样式穿透） */
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
</style>
