<template>
  <div>
    <Header></Header>
    <section>
      <div v-if='payStatus' class="text">支付成功<br><van-icon name="success" /></div>
      <div v-else class="text">支付失败</div>
      <table>
        <tr>
          <td>订单号</td>
          <td>{{ orderId }}</td>
        </tr>
        <tr>
          <td>商家</td>
          <td>茶叶网</td>
        </tr>
      </table>
      <div class="button">
        <van-button round type="info" color="#07c160" to="/home">返回首页</van-button><van-button round type="info" color="#07c160" to="/orderList">查看订单</van-button>
      </div>
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import { successPayment } from '@/http/axios.js'
import Tabbar from "@/components/common/Tabbar.vue"
import Header from "@/components/common/Header.vue"
import qs from 'qs'
export default {
  data() {
    return {
      payStatus: false,
      orderId: ''
    }
  },
  components: {
    Tabbar, Header
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let datas = {
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no
      }
      successPayment({ data: qs.stringify(datas) }).then(res => {
        if (res.data.code == 2) {
          this.payStatus = true
          this.orderId = res.data.order_id
        }
      }).catch(() => { })
    },
  },
}
</script>

<style lang="less" scoped>
section {
  padding-top: 1.4666666rem;
  background-color: #447b7d;
  min-height: calc(100vh - 1.4666667rem);

  .text {
    color: #fff;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    box-sizing: border-box;
    text-shadow: 0px 2px 3px rgba(0, 0, 0, .5);
  }

  table {
    margin: 0 auto;
    font-size: 0.373333rem;
    width: calc(100vw - 0.8rem);
    background-color: #447b7d;
    color: white;
    height: 3.2rem;

    td:nth-child(2) {
      text-align: right;
    }
  }
}

.button {
  margin-top:0.8rem;
  display:flex;
  justify-content:space-around;

}
</style>