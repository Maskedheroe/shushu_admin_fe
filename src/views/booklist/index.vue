<template>
  <div>
    <el-table
      v-loading="loading"
      :data="booklist"
      stripe
      style="width: 100%"
      max-height="800"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="name" label="姓名" width="180" />
      <el-table-column prop="createTime.date" label="发布日期" />
      <el-table-column label="封面" width="250">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scop">
          <el-button size="mini" @click="() => handleEdit(scop.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="() => handleDelete(scop.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button 
      size="mini" 
      type="primary" 
      @click="handleLoadMore"
    >
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
import { fetchList, del } from "../../api/booklist";

export default {
  name: "BookList",
  data() {
    return {
      booklist: [],
      count: 10,
      loading: false,
      delDialogVisiable: false,
      bookInfo: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList({
        start: this.booklist.length,
        count: this.count,
      }).then((res) => {
        if (res.code === 20000 && res.data.length >= this.count) {
          this.booklist = [...this.booklist, ...res.data];
        }
        this.loading = false;
      });
    },
    handleLoadMore() {
      this.getList();
    },
    handleEdit(row) {
      this.$router.push(`/booklist/edit/${row._id}`)
    },
    handleDelete(row) {
      this.delDialogVisiable = true
      this.bookInfo.id = row._id
    },
    doDel() {
      del({
        id: this.bookInfo.id
      }).then((res) => {
        console.log('res', res)
        if (res.data.deleted > 0) {
          this.delDialogVisiable = false  // 清除对话框

          this.booklist = []  // 清空数据
          this.getList() // 重新加载  
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message.error('删除失败')
        }
      })
    }
  },
};
</script>

<style>
</style>
