<template>
  <div class="goods">
    <div v-if="goodsList.length == 0" class="listNone">没有找到相关商品</div>
    <ul>
      <li
        v-for="(item, index) in goodsList"
        :key="index"
        @click="goodsDetail(item)"
        v-lazy="item"
      >
        <img :src="item.imgUrl" alt="" :title="item.name" />
        <hr />
        <p class="text">{{ item.name }}</p>
        <div class="pb">
          <div class="price">￥{{ item.price }}</div>
          <div class="buy">立即购买</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsItem: [],
    };
  },
  props: {
    goodsList: Array,
  },
  methods: {
    goodsDetail(item) {
      this.goodsItem = item;
      let id = item.id;
      this.$router.replace({
        path: "/detail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  margin-bottom: 1.6rem;
}
.goods ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.goods ul li {
  margin-top: 0.133333rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  background-color: #f1f1f1;
  min-width: 4.9024rem;
  width: 49%;
}
.goods ul li img {
  width: 4.7rem;
  height: 4.7rem;
}
.goods ul li hr {
  width: 100%;
  margin-top: 0.08rem;
  border: 0.026667rem solid #767575;
}
.goods ul li .text {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  font-size: 0.48rem;
}
.goods ul li .pb {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.goods ul li .price {
  text-align: left;
  font-size: 0.45rem;
  color: #b0352f;
}
.goods ul li .buy {
  margin-right: 0.266667rem;
  color: #fff;
  padding: 0.053333rem 0.106667rem;
  background-color: #b0352f;
  text-align: center;
  border-radius: 0.106667rem;
  white-space: nowrap;
  width: 1.6rem;
  font-size: 0.373333rem;
}
.listNone {
  margin: 2.666667rem auto;
  color: #d1d1d1;
}
</style>