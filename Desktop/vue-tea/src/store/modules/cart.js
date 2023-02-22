import { CART_LIST, ISCHECKED_ALL, CAR_SELECTLIST, UN_CHECKALL, CHECKALL, DEL_GOODS, SELECT_DEL, TOTAL_PRICE, UPDATE_SELECT } from './mutations-type'
import { Dialog, Toast } from "vant";
import user from './user'
import { deleteCartGoods } from "@/http/axios.js";
export default {
  state: {
    list: [],//是购物车的数据
    selectList: [],//选中的数据  
  },
  mutations: {
    [CART_LIST](state, cartArr) {
      state.list = cartArr;
    },
    [CAR_SELECTLIST](state, item) {
      item.isChecked ? state.selectList.push(item.id) : state.selectList = state.selectList.filter(i => i != item.id)
      console.log(state.selectList);
    },
    [UPDATE_SELECT](state) {
      state.selectList.forEach(e => {
        state.list.forEach(i => {
          if (i.id == e) {
            i.isChecked = true
          }
        });
      });
    },
    // 全不选
    [UN_CHECKALL](state) {
      console.log(state.list);
      // 关闭所有单选按钮
      state.list.forEach(e => {
        e.isChecked = false
      });
      // 全选按钮
      state.selectList = [];
    },
    // 全选
    [CHECKALL](state) {
      // 全选按钮
      state.selectList = state.list.map(e => e.id)
      // 单选按钮
      state.list.forEach(e => {
        e.isChecked = true
      });
    },
    [DEL_GOODS](state, item) {
      state.list.forEach(e => {
        if (e.id == item.id) {
          state.list = state.list.filter(i => i.id != item.id)
        }
      });
      var token = user.state.token
      deleteCartGoods({ token: token, goodsId: item.id }).then((res) => {
        Toast.success(res.msg);
        // 清除一下selectList
        state.selectList = state.selectList.filter(i => !(i == item.id))
      })
    },
    [SELECT_DEL](state) {
      var token = user.state.token
      var goodsId = state.selectList
      function beforeClose(action, done) {
        if (action == "confirm") {
          deleteCartGoods({ token: token, goodsId: goodsId })
            .then((res) => {
              Toast.success(res.msg);
            })
            .then(function () {
              done();
              // 更新vuex
              goodsId.forEach(e => {
                state.list = state.list.filter(i => i.id != e)
              });
              // selcetList也更新一下 被选中的都被删了 所以清空就行
              state.selectList = []
            })
        } else {
          done()
        }
      }
      Dialog.confirm({
        title: "编辑-商品",
        message: "是否删除所选商品",
        beforeClose,
      }).catch(() => { })
    },
  },
  getters: {
    [ISCHECKED_ALL](state) {
      return state.selectList.length >= state.list.length
    },
    [TOTAL_PRICE](state) {
      var result = 0
      state.selectList.forEach(e => {
        state.list.filter(i => {
          if (i.id == e) {
            console.log(i.price, i.addnum);
            result = i.price * i.addnum + result
          }
        })

      });
      return result
    }
  },
  actions: {
    checkAllFn({ commit, getters }) {
      getters.ISCHECKED_ALL ? commit('UN_CHECKALL') : commit('CHECKALL')
    }
  }
}