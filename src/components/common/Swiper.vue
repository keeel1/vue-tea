<template>
  <div class="swiper">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#dd2727 ">
      <van-swipe-item v-for="(item, index) in swiperImg" :key="index">
        <img :src="swiperImg[index]" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {};
  },
  props: {
    swiperImg: Array,
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 10rem;
}
.swiper img{
  width: 100%;
  height: 100%;
}
::v-deep .van-swipe__indicator{
  background-color: black;
}
</style>