<template>
  <div class="add-address">
    <Header></Header>
    <section>
      <van-address-edit
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        show-set-default
        @save="onSave"
      />
    </section>
  </div>
</template>

<script>
import Header from "@/components/common/Header.vue";
import { areaList } from "@vant/area-data";
import { addAddress } from "@/http/axios.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      areaList,
      AddressInfo: {},
    };
  },
  components: { Header },
  methods: {
    onSave(content) {
      let token = this.$store.state.user.token;
      addAddress({ content, token })
        .then((res) => {
          Toast.success({
            message: res.msg
          });
        })
        .then(
          setTimeout(() => {
            this.$router.back(-1);
          }, 300)
        );
    },
  },
};
</script>

<style scoped>
section {
  padding-top: 1.466667rem;
  min-height: calc(100vh - 1.466667rem);
}
</style>