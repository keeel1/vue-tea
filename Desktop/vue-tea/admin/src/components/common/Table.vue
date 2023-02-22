<template>
  <div class="table">
    <el-main>
      <el-input
        placeholder="请输入名称并按回车查询"
        v-model="search"
        @keyup.enter.native="handleQuery"
      >
        <el-button
          slot="append"
          icon="el-icon-refresh"
          @click="resetQuery"
        ></el-button>
        <el-button
          slot="append"
          icon="el-icon-refresh"
          @click="resetQuery"
        ></el-button>
      </el-input>
      <el-table
        :data="
          this.tableData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        sort
        stripe
        border
        :header-cell-style="{
          'text-align': 'center',
          color: 'black',
        }"
      >
        <el-table-column
          prop="id"
          label="商品id"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column prop="num" label="商品数量"></el-table-column>
        <el-table-column prop="visits" label="商品浏览量"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页的数据条数
    };
  },
  props: {
    tableData: Array,
  },
  methods: {
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleQuery() {
      // this.tableData = this.tableData.filter((data) => {
      //   return !this.search || data.name.includes(this.search);
      // });
    },
    resetQuery() {},
  },
  computed: {
    newTableData: function () {
      return this.tableData.filter((data) => {
        return !this.search || data.name.includes(this.search);
      });
    },
  },
};
</script>

<style scoped>
.table {
  height: calc(100vh - 500px);
}
.el-main {
  line-height: 100px;
}
</style>