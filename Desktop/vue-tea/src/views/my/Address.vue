<template>
  <div class="address">
    <Header></Header>
    <section>
      <van-address-list
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        :switchable="false"
      />
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import { getAddressList ,selectDefaultAddress } from "@/http/axios.js";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: { Header },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      list: (state) => state.address.list,
    }),
    ...mapGetters(["defaultControl"]),
  },
  methods: {
    ...mapMutations(["INIT_ADDRESS"]),
    onAdd() {
      this.$router.push("/addAddress");
    },
    onEdit(item, index) {
      this.$router.push({ name: "EditAddress", params: { item, index } });
    },
    getData() {
      let token = this.$store.state.user.token;
      getAddressList({ token }).then((res) => {
        this.INIT_ADDRESS(res.data);
      });
    },
  },
  created() {
    this.getData();
  },
  watch: {
    defaultControl() {
      // 当没有默认地址时触发
      if(this.defaultControl == 0) {
        // 找到列表第一个地址的id 返回给后端 让它变成默认地址 
        // 地址为空时返回
        if(this.$store.state.address.list.length == 0) return;
        let id = this.$store.state.address.list[0].id
        selectDefaultAddress({id}).then((res) => {
        }).then(
          // 直接改vuex里的数据 更新视图 这样不用刷新页面
          this.$store.state.address.list[0].isDefault = true
        )
      }
    }
  }
};
</script>

<style scoped>
section {
  background-color: #f5f5f5;
  min-height: calc(100vh - 1.466667rem);
  padding-top: 1.466667rem;
}
</style>