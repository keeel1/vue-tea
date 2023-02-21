<template>
  <div class="header">
    <div class="title">
      <slot name="left"><h1>茶叶网</h1></slot>
    </div>
    <div class="search">
      <slot name="center">
        <i class="iconfont icon-fangdajing"></i>
        <form action="" onsubmit="return false" @keyup.enter="goSearch">
          <input
            type="search"
            placeholder="搜您喜欢的产品..."
            id="searchtxt"
            v-model="searchValue"
          />
        </form>
      </slot>
    </div>
    <div class="kefu">
      <slot name="right"
        ><span class="right" @click="goSearch">搜索</span></slot
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 先看||左边true则执行,再看||右边  (如果在search页面左边undefined就会去找右边)
      searchValue: this.$route.query.key || "",
      historyArr: [],
    };
  },
  methods: {
    goSearch() {
      // 去除头尾空格
      let value = this.searchValue.trim();
      // 输入为空返回
      if (!value) return;
      // 判断是否有本地存储
      if (!localStorage.getItem("history")) {
        // 初始化
        localStorage.setItem("history", "[]");
      } else {
        // 否则将已有本地存储赋值给historyArr
        this.historyArr = JSON.parse(localStorage.getItem("history"));
      }
      // 将输入的value添加到historyArr 先添加已有
      this.historyArr.unshift(value);
      // 去重
      let newArr = new Set(this.historyArr);
      // 存入本地存储  Array.from将类数组转化为真正数组
      localStorage.setItem("history", JSON.stringify(Array.from(newArr)));

      this.$router.push({ name: "list", query: { key: value } });
    },
  },
};
</script>

<style scoped>
.right {
  color: white;
  height: 1.173333rem;
  line-height: 1.173333rem;
  font-size: 0.4rem;
  font-weight: 800;
}
.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgb(16, 76, 31);
  width: 100%;
  height: 1.173333rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.header .title {
  width: 1.813333rem;
}
.header .title h1 {
  height: 100%;
  font-size: 0.533333rem;
  font-family: "Courier New", Courier, monospace;
  color: white;
}
.search {
  display: flex;
  align-items: center;
  width: 6.56rem;
  height: 0.8rem;
  background-color: white;
  border-radius: 0.8rem;
  color: #747474;
}
.search i {
  font-size: 0.453333rem;
  margin: 0rem 0.133333rem;
}
.search span {
  font-size: 0.4rem;
}
.search form {
  display: flex;
}
.search form input {
  width: 5.333333rem;
  flex: 1;
}
.kefu i {
  font-size: 0.64rem;
  color: white;
}
#searchtxt {
  font-size: 0.373333rem;
}
</style>