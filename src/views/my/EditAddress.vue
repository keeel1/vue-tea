<template>
  <div class="edit-address">
    <Header></Header>
    <section>
      <van-address-edit
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        show-delete
        show-set-default
        :address-info="addressInfo"
        v-on="addressInfo"
        @save="onSave"
        @delete="onDelete"
      />
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import { areaList } from "@vant/area-data";
import { Toast } from "vant";
import { deleteAddress, updateAddress } from "@/http/axios.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      addressInfo: {},
    };
  },
  components: {
    Header,
  },
  methods: {
    onSave(content) {
      let token = this.$store.state.user.token; 
      updateAddress({content,token}).then((res) => {
        Toast.success(`${res.msg}`)
      }).then(this.$router.back(-1))
    },
    onDelete() {
      let token = this.$store.state.user.token;
      let index = this.$route.params.index
      let addresId = this.$store.state.address.list[index].id
      deleteAddress({addresId,token}).then((res) => {
        console.log(res.code);
        Toast.success(`${res.msg}`)
      }).then( this.$router.back(-1))
    },
  },
  created() {
    this.addressInfo = this.$route.params.item;
    // 将 1 0转为true false 按钮才能正常显示
    this.addressInfo.isDefault == 1 ?  this.addressInfo.isDefault = true : this.addressInfo.isDefault = false
  },
};
</script>

<style scoped>
section {
  background-color: #f5f5f5;
  min-height: calc(100vh - 1.466667rem);
  padding-top: 1.466667rem;
}
</style>