<template>
  <div class="aside">
    <el-menu
      @open="handleOpen"
      @close="handleClose"
      default-active="/home"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      align="left"
    >
      <el-menu-item
        :index="item.router"
        v-for="(item, index) in navBar"
        :key="index"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navBar: [
        {
          title: "首页",
          icon: "el-icon-s-platform",
          router: "/home",
        },
        {
          title: "商品管理",
          icon: "el-icon-sell",
          router: "/store",
        },
        {
          title: "用户管理",
          icon: "el-icon-user",
          router: "/user",
        },
        {
          title:"数据统计",
          icon:'el-icon-pie-chart',
          router:'/statistic',
        }
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

};
</script>

<style scoped>
</style>