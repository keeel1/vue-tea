<template>
  <div class="check-out">
    <Header></Header>
    <section>
      <div class="body">
        <div class="body-text">收货信息：</div>
        <div class="body-address">
          <van-icon name="arrow" class="arrow" />
          <div class="name">
            <span>{{defaultAddress.name}}</span>
            <span>{{ defaultAddress.tel }}</span>
          </div>
          <div class="content">
            <span>{{ defaultAddress.address }}</span>
          </div>
        </div>
      </div>
      <van-card
        v-for="(item, index) in cardList"
        :num="item.addnum"
        :price="item.price"
        :desc="item.content"
        :title="item.name"
        :thumb="item.imgUrl"
        :key="index"
      />
      <div class="body">
        <div class="body-text">账单明细</div>
        <div class="body-content">
          <table>
            <tr>
              <td>订单总价</td>
              <td>￥{{ price }}</td>
            </tr>
            <tr>
              <td>运费</td>
              <td>￥0.0</td>
            </tr>
            <tr>
              <td>优惠券</td>
              <td>￥0.0</td>
            </tr>
            <tr>
              <td>实付款</td>
              <td class="red">￥{{ price }}</td>
            </tr>
          </table>
        </div>
      </div>
    </section>
    <footer>
      <div class="wrapper">
        <div class="total">
          <div class="text">
            <div class="top">
              共<span>{{ num }}</span
              >件，
            </div>
            <div class="bottom">
              总计：<span class="big-font">￥{{ price }}</span>
            </div>
          </div>
        </div>
        <button class="buy" @click="submitOrder">提交订单</button>
      </div>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import { submitOrder, deleteCartGoods, payment } from "@/http/axios.js";
import { mapState } from "vuex";
import { getDefaultAddress } from "@/http/axios.js";
export default {
  data() {
    return {
      cardList: [],
      defaultAddress: {},
      price: 0,
      num: 0,
    };
  },
  components: { Header },
  computed: {
    ...mapState({
      list: (state) => {
        return state.cart.list;
      },
      selectList: (state) => {
        return state.cart.selectList;
      },
    }),
  },
  methods: {
    getData() {
      let token = this.$store.state.user.token;
      getDefaultAddress({ token }).then((res) => {
        this.defaultAddress = res.data[0];
      });
    },
    submitOrder() {
      let goodsList = [];
      let token = this.$store.state.user.userInfo.token;
      this.selectList.forEach((e) => {
        goodsList.push(this.list.filter((i) => i.id == e));
      });
      // 提交订单
      submitOrder({ goodsList, token, price: this.price }).then((res) => {
        
      });
      // 把购物车选中的商品删除
      deleteCartGoods({ goodsId: this.selectList, token }).then(
        (this.$store.state.cart.selectList = [])
      );
    },
  },
  created() {
    // 把购物车里选择的商品拿到
    this.selectList.forEach((e) => {
      this.cardList.push(this.list.filter((i) => e == i.id));
    });
    // 结构调整一下
    this.cardList = this.cardList.map((e) => (e = e[0]));
    localStorage.setItem("checkout", `[${this.cardList}]`);
    this.getData();
    this.price = this.$route.params.price;
    this.num = this.$route.params.num;
  },
};
</script>

<style scoped>
section {
  width: 100vw;
  background-color: #f5f5f5;
  min-height: calc(100vh - 3.066667rem);
  padding-top: 1.466667rem;
  padding-bottom: 1.6rem;
}
.body-text {
  font-size: 0.426667rem;
  padding: 0.213333rem 0.4rem;
}
.body span {
  margin-left: 0.4rem;
  font-size: 0.373333rem;
}
/* 地址 */
.body-address {
  height: 1.6rem;
  background-color: #fff;
}
.body-address .arrow {
  right: 0.4rem;
  float: right;
  line-height: 1.6rem;
}
/* 明细 */
.body-content {
  width: 100vw;
  background-color: #fff;
}
table {
  margin: 0 auto;
  font-size: 0.373333rem;
  width: calc(100vw - 0.8rem);
  background-color: #fff;
  height: 3.2rem;
}
td:nth-child(2) {
  text-align: right;
}
td:nth-child(1) {
  color: #999999;
}

/* footer */
footer {
  position: fixed;
  bottom: 0;
}
.wrapper {
  display: flex;
  box-shadow: 10px 10px 5px #888888;
  width: 100vw;
  height: 1.333333rem;
  background-color: #ffffff;
}
.wrapper button {
  position: absolute;
  right: 0;
  height: 100%;
  width: 30%;
  border: none;
  font-size: 0.48rem;
  background-color: #104c1f;
  color: white;
}
.wrapper .total {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 0.533333rem;
  font-size: 0.426667rem;
}
.wrapper .total .text {
  display: flex;
}
.wrapper .total span {
  color: #104c1f;
}
.red {
  color: #b0352f;
}
</style>