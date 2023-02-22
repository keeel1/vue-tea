<template>
  <div class="order-list">
    <Header></Header>
    <section>
      
    </section>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue'
import {getOrderList} from "@/http/axios.js"
export default {
  components: {
    Header
  },
  methods: {
    getData() {
      let token = this.$store.state.user.userInfo.token;
      getOrderList({token}).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
section{
  background-color:#f5f5f5;
  min-height:100vh
}

</style>