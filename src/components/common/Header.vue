<template>
<div class="header">
    <van-nav-bar :title="this.$route.meta.headerTitle" left-arrow @click-left="onClickLeft" @click-right="onClickright">
    <slot slot="right" name="right" >
      <van-icon name="wap-home-o" size="18" color="white"/>
    </slot>
  </van-nav-bar>
</div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickright() {
      // 购物车页用了插槽 不需要默认行为
      if(this.$route.name == 'Cart') return;
      this.$router.push('/home')
    }
  },
};
</script>

<style scoped>
.header {
  z-index: 999;
  width: 100vw;
  position: fixed;
}
img {
  width: 0.533333rem;
  height: 0.533333rem;
}
.van-nav-bar {
  background-color: #104c1f;
}
::v-deep .van-nav-bar__content{
  height: 1.466667rem;
}
::v-deep .van-nav-bar__title {
  color: white;
}
::v-deep .van-nav-bar__arrow {
  color: white;
}
</style>