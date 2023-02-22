<template>
  <div class="cart">
    <Header>
      <div
        slot="right"
        class="slot-right"
        @click="changeIsEdit"
        v-text="isEdit ? '完成' : '编辑'"
      ></div>
    </Header>
    <section>
      <div class="top">
        <van-checkbox
          @click="checkAllFn"
          :value="ISCHECKED_ALL"
          :checked-color="checkedColor"
        ></van-checkbox>
        <b>商品</b>
        <b v-if="isEdit" @click="SELECT_DEL" class="deleteButton">删除</b>
      </div>
      <div class="center" v-for="(item, index) in list" :key="index">
        <van-swipe-cell>
          <div class="center-item">
            <van-checkbox
              @click="selectItem(item.isChecked, item.id)"
              v-model="item.isChecked"
              :checked-color="checkedColor"
            ></van-checkbox>
            <van-card
              :price="item.price"
              :desc="item.content"
              :title="item.name"
              :thumb="item.imgUrl"
            >
              <template #footer>
                <van-stepper
                  v-model="item.addnum"
                  theme="round"
                  button-size="22"
                  disable-input
                  @change="changeNum(item.addnum, item.id)"
                />
                <van-icon
                  v-if="isEdit"
                  name="delete-o"
                  @click="DEL_GOODS(item)"
                />
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="DEL_GOODS(item)"
            />
          </template>
        </van-swipe-cell>
      </div>
    </section>
    <!-- <Tabbar></Tabbar> -->
    <footer>
      <div class="wrapper">
        <van-checkbox
          @click="checkAllFn"
          :value="ISCHECKED_ALL"
          :checked-color="checkedColor"
        ></van-checkbox>
        <div class="total">
          <div class="top">
            共有<span>{{ selectList.length }}</span
            >件商品
          </div>
          <div class="bottom">
            总计：<span>￥{{ TOTAL_PRICE }}</span>
          </div>
        </div>
        <button class="buy" :class="TOTAL_PRICE == 0 ? 'disbuy' : ''" @click="buy(TOTAL_PRICE)">去结算</button>
      </div>
    </footer>
  </div>
</template>

<script>
import Tabbar from "@/components/common/Tabbar.vue";
import Header from "@/components/common/Header.vue";
import { Toast } from "vant";
import { getCartData, updateCartNum } from "@/http/axios.js";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      checkedColor: "#104c1f",
      isEdit: false,
    };
  },
  computed: {
    ...mapState({
      list: (state) => {
        // 遍历数组
        state.cart.list.forEach((element) => {
          // 转成字符串
          element.price = element.price + "";
          // 判断是否有小数点
          if (element.price.indexOf(".") == -1) {
            // 整数数字给它补上 .0
            element.price = element.price + ".0";
          }
        });
        return state.cart.list;
      },
      selectList: (state) => {
        return state.cart.selectList;
      },
    }),
    ...mapGetters(["ISCHECKED_ALL", "TOTAL_PRICE"]),
  },
  methods: {
    ...mapMutations([
      "CART_LIST",
      "CAR_SELECTLIST",
      "DEL_GOODS",
      "SELECT_DEL",
      "UPDATE_SELECT",
    ]),
    ...mapActions(["checkAllFn"]),
    getData() {
      const token = this.$store.state.user.userInfo.token;
      if (!token) return;
      getCartData({ token: token })
        .then((res) => {
          res.data.forEach((element) => {
            element["isChecked"] = false;
          });
          this.CART_LIST(res.data);
        })
        .then(() => {
          // 第一次进入页面时等list 初始化完 去更新存在vuex里被选中的商品
          this.UPDATE_SELECT();
        });
    },
    selectItem(itemChecked, itemId) {
      let selceItem = {
        isChecked: itemChecked,
        id: itemId,
      };
      this.CAR_SELECTLIST(selceItem);
    },
    changeIsEdit() {
      this.$router.push("/cart");
      this.isEdit = !this.isEdit;
    },
    changeNum(addnum, goodsId) {
      let token = this.$store.state.user.token;
      updateCartNum({ num: addnum, goodsId, token }).then((res) => {
        console.log(res);
      });
    },
    buy(price) {
      if(price == 0) {
        Toast({
          message:'请选择商品',
          duration:800
        })
      }else {
        this.$router.push({name:'CheckOut',params:{price:this.TOTAL_PRICE,num:this.selectList.length}})
      }
      
    }
  },
  components: { Tabbar, Header },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.slot-right {
  color: white;
}
section {
  background-color: #f5f5f5;
  min-height: calc(100vh - 3.066667rem);
  padding-bottom: 1.6rem;
  padding-top: 1.466667rem;
  .top {
    font-size: 0.48rem;
    display: flex;
    background-color: #f8f8f8;
    width: 100vw;
    box-sizing: border-box;
    padding: 0.533333rem 0.266667rem;
    border-bottom: 0.026667rem solid #e8e8e8;
    b {
      margin-left: 0.266667rem;
      color: #104c1f;
      font-size: 0.466667rem;
    }
  }
  .center {
    display: flex;
    flex-direction: column;
    .center-item {
      display: flex;
    }
    .van-checkbox {
      height: 2.773333rem;
      background-color: #fafafa;
      padding: 0rem 0.266667rem;
      margin-top: 0.25rem;
    }
    .van-card {
      width: calc(100vw - 1.06666666rem);
    }
    .van-stepper {
      position: absolute;
      right: 0.533333rem;
      bottom: 0.373333rem;
    }
  }
}

.van-icon {
  font-size: 0.6rem;
  position: absolute;
  top: 0.133333rem;
  right: 0.58rem;
}
::v-dep .van-stepper__plus {
  color: black;
}
.delete-button {
  margin-top: 0.213333rem;
  height: 100%;
}
.deleteButton {
  position: absolute;
  right: 0.533333rem;
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
.wrapper .disbuy {
  background-color: #888888;
}
.wrapper .van-checkbox {
  margin-left: 0.266667rem;
}
.wrapper .total {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 0.533333rem;
  font-size: 0.373333rem;
}
.wrapper .total span {
  color: #104c1f;
}
</style>