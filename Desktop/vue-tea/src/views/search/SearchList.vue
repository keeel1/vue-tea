<template>
  <div class="search-index">
    <Header>
      <div slot="left" class="left" @click="backSearch">
        <i class="iconfont icon-fanhui"></i><span>返回</span>
      </div>
    </Header>
    <div class="headers">
      <ul>
        <li
          v-for="(item, index) in orderList"
          :key="index"
          @click="selectIndex(index, item)"
        >
          <div :class="currentIndex === index ? 'active' : ''">
            {{ item.name }}
          </div>
          <div class="search-filter" v-if="index != 0">
            <i
              class="iconfont icon-xiangshang"
              :class="item.status === 1 ? 'active' : ''"
            ></i
            ><i
              class="iconfont icon-xiangxia"
              :class="item.status === 2 ? 'active' : ''"
            ></i>
          </div>
        </li>
      </ul>
    </div>
    <section>
      <Goods :goodsList="searchList"></Goods>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from "@/components/search/Header.vue";
import Tabbar from "@/components/common/Tabbar.vue";
import { getSearchList } from "@/http/axios.js";
import Goods from "@/components/common/Goods.vue";
export default {
  components: { Header, Tabbar, Goods },
  data() {
    return {
      searchList: [],
      orderList: [
        // status箭头 0->都不选 1->上 2->下
        { name: "综合", status: 2, key: "id" },
        { name: "价格", status: 0, key: "price" },
        { name: "销量", status: 0, key: "num" },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    backSearch() {
      this.$router.replace("/search");
    },
    getData() {
      getSearchList({
        searchName: this.$route.query.key,
        ...this.orderBy,
      }).then((res) => {
        this.searchList = res.data;
      });
    },
    selectIndex(index, item) {
      /*
        判断是否为第一次点击（点击的前的下标和点击后的下标对比）
        相等为第一次点击，不相等为第二次点击
      */
      if (this.currentIndex != index) {
        // 第一次点击
        // 遍历每个元素将箭头状态都设为空
        this.orderList.forEach((element) => (element.status = 0));
        // 将当前点击的箭头状态设为上（即第一次默认为上）
        item.status = 1;
      } else {
        // 第N次点击切换上下
        item.status = item.status == 2 ? 1 : 2;
      }
      // 切换当前item
      this.currentIndex = index;
      // 当排序变化，发送给后端，执行sql拿到排序后的数组
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  // 路由变化的时候更新（即有搜索后params更新）
  watch: {
    $route() {
      this.getData();
    },
  },
  computed: {
    // 升序降序
    orderBy() {
      // desc 降序 asc升序
      let obj = this.orderList[this.currentIndex];
      let val = obj.status == "1" ? "desc" : "asc";
      return {
        [obj.key]: val,
      };
    },
  },
};
</script>

<style scoped>
.search-index {
  overflow: hidden;
}
.right {
  color: white;
  height: 1.173333rem;
  line-height: 1.173333rem;
  font-size: 0.8rem;
  font-weight: 800;
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

.headers {
  width: 100vw;
  background-color: white;
  position: fixed;
  margin-top: 1.173333rem;
  border-radius: 0.266667rem;
  border-top: 3px solid #000000;
  border-bottom: 3px solid #104c1f;
}
.headers ul {
  font-weight: 600;
  padding: 0.266667rem 0rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0.426667rem;
  line-height: 0.426667rem;
}
.headers ul li {
  display: flex;
  align-items: center;
}
.search-filter {
  margin-left: 0.266667rem;
  display: flex;
  flex-direction: column;
}

/* goods */
section {
  padding-top: 2.666667rem;
  margin-bottom: 1.6rem;
}
/* iconfont */
.icon-xiangshang {
  font-size: 0.32rem;
  color: #d1d1d1;
}
.icon-xiangxia {
  font-size: 0.32rem;
  color: #d1d1d1;
}
/* 选择高亮 */
.active {
  color: #b0352f;
}
</style>