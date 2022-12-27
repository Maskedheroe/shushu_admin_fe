<template>
  <div>
    <el-table
      v-loading="loading"
      :data="findList"
      stripe
      style="width: 100%"
      max-height="800"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="nickName" label="发布人" />
      <el-table-column prop="createTime" label="发布日期" />
      <el-table-column label="操作">
        <template slot-scope="scop">
          <el-button
            size="mini"
            type="danger"
            @click="() => handleDelete(scop.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button size="mini" type="primary" @click="handleLoadMore">
      加载更多
    </el-button>
    <el-dialog title="提示" :visible.sync="delDialogVisiable" width="30%">
      <span>确定删除该书籍吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from "@/api/find";

export default {
  name: "Find",
  data() {
    return {
      findList: [],
      count: 20,
      loading: false,
      tradeInfo: {},
      delDialogVisiable: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList({
        start: this.findList.length,
        count: this.count,
      }).then((res) => {
        if (res.code === 20000) {
          if (!res.data.data.length) {
            this.$message({
              message: "没有更多了",
              type: "info",
            });
            this.loading = false;
            return;
          }
          this.findList = [...this.findList, ...res.data.data];
          this.loading = false;
        }
      });
    },
    handleDelete(val) {
      this.delDialogVisiable = true;
      this.tradeInfo = val;
    },
    doDel() {
      del(this.tradeInfo)
        .then(() => {
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.getList();
        })
        .catch((rej) => {
          this.$message({
            message: "删除失败",
            type: "error",
          });
          // TODO 做一个异常监控埋点
          console.log("rej", rej);
        });
      this.delDialogVisiable = false;
    },
    handleLoadMore() {
      this.getList();
    },
  },
};
</script>

<style>
</style>