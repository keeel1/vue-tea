<template>
  <div class="store">
    <Table :tableData="tableData"></Table>
  </div>
</template>

<script>
import Table from "@/components/common/Table.vue";
import { getStore } from "@/http/axios";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    Table,
  },
  methods: {
    getData() {
      getStore().then((res) => {
        this.tableData = res.data;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style>
</style>