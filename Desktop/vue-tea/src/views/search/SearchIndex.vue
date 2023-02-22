<template>
  <div class="search-index">
    <Header>
      <div slot="left" class="left" @click="backHome">
        <i class="iconfont icon-fanhui"></i><span>返回</span>
      </div>
    </Header>
    <div class="content">
      <div class="history">
        <i class="iconfont icon-lishixiao"></i>
        <span>历史搜索</span>
        <ul>
          <li v-for="(item, index) in historyArr" :key="index" @click="historyClick(item)">{{ item }}</li>
        </ul>
        <div class="clear">
          <span @click="clearHistory">{{ clearText }}</span>
        </div>
      </div>
      <div class="history hot">
        <i class="iconfont icon-remen"></i>
        <span>热门搜索</span>
        <ul>
          <li>大红袍</li>
          <li>铁观音</li>
        </ul>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header.vue";
import Tabbar from "@/components/common/Tabbar.vue";
export default {
  components: { Header, Tabbar },
  data() {
    return {
      historyArr: [],
      clearText: "清空历史记录",
    };
  },
  methods: {
    backHome() {
      this.$router.replace({ name: "Home" });
    },
    clearHistory() {
      if (this.clearText === '暂无历史记录...') return;
      MessageBox({
        title: "提示",
        message: "确定执行此操作?",
        showCancelButton: true,
        confirmButtonClass: "messageBox",
      }).then((res) => {
        if (res === "confirm") {
          localStorage.removeItem("history");
          this.historyArr = [];
          this.clearText = "暂无历史记录...";
        }
      });
    },
    historyClick(item) {
      this.$router.push({ name: "list", query: { key: item } });
    }
  },
  created() {
    // 页面创建时从localStorge拿数据 去v-for渲染
    this.historyArr = JSON.parse(localStorage.getItem("history"));
    if (!this.historyArr) this.clearText = "暂无历史记录...";
  },
};
</script>

<style scoped>
.search-index {
  height: calc(100vh - 2.933333rem);
  background-color: #f5f5f5;
}
.left {
  color: white;
  font-size: 0.48rem;
  text-align: center;
  font-weight: 800;
}
.left i {
  font-weight: 800;
  font-size: 0.533333rem;
}
.left span {
  font-size: 0.48rem;
}

.content {
  margin-top: 1.173333rem;
  background: #eee;
}
.history {
  padding: 0.266667rem;
}
.history span {
  font-size: 0.48rem;
  font-weight: 800;
  margin-left: 0.08rem;
}
.history ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0.266667rem 0.533333rem;
}
.history ul li {
  text-align: center;
  font-size: 0.373333rem;
  min-width: 0.933333rem;
  height: 0.533333rem;
  line-height: 0.533333rem;
  padding: 0.026667rem 0.08rem;
  margin-left: 0.266667rem;
  margin-top: 0.133333rem;
  border: 1px solid #ccc;
  color: rgb(132, 132, 132);
}
.history .clear {
  text-align: center;
}
.history .clear span {
  font-size: 0.426667rem;
}
.hot {
  padding: 0.266667rem;
  background-color: rgb(247, 255, 246);
}
.hot span {
  font-size: 0.48rem;
  font-weight: 800;
  margin-left: 0.08rem;
}

/* iconfont */
.icon-lishixiao {
  color: #104c1f;
}
.icon-remen {
  color: #104c1f;
  font-size: 0.426667rem;
}
.messageBox {
  color: #104c1f;
}
</style>