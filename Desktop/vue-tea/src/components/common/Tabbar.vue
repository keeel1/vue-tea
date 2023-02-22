<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item, index) in routerList"
        :key="index"
        @click="switchTab(item.path)"
      >
        <img :src="item.path == $route.path ? item.active : item.default" alt="" />
        <span :class="item.path == $route.path ? 'active' : ''">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [
        {
          title: "首页",
          path: "/home",
          default: "/images/shouye.png",
          active: "/images/shouye_active.png",
        },
        {
          title: "分类",
          path: "/list",
          default: "/images/fenlei.png",
          active: "/images/fenlei_active.png",
        },
        {
          title: "购物车",
          path: "/cart",
          default: "/images/gouwuche.png",
          active: "/images/gouwuche_active.png",
        },
        {
          title: "我的",
          path: "/my",
          default: "/images/wode.png",
          active: "/images/wode_active.png",
        },
      ],
    };
  },
  methods: {
    switchTab(path) {
      // 判断路径 如果当前路径和要点击路径相同就返回
      if (this.$route.path == path) return;
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 1.6rem;
  background-color: #fff;
}
.tabbar ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
.tabbar ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.tabbar ul li img {
  width: 0.826667rem;
  height: 0.826667rem;
}
.tabbar ul li span {
  font-size: 0.426667rem;
}
.active {
  font-weight: 700;
  color: #0a7917;
}
</style>