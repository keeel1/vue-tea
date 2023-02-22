<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('INIT_USER')
  }
}
</script>

