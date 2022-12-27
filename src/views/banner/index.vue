<template>
  <div>
    <div class="fileter-container">
      <el-upload
        class="upload-demo"
        action="http://localhost:3001/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary"> 点击上传 </el-button>
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="swiperList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="() => handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="delDialogVisiable" width="30%">
      <span>确定删除该图片吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from "../../api/swiper";

export default {
  name: "Banner",
  data() {
    return {
      swiperList: [],
      loading: false,
      delDialogVisiable: false,
      swiper: {},
    };
  },
  created() {
    this.loading = true;
    this.getList();
    this.loading = false;
  },
  methods: {
    getList() {
      fetchList().then((res) => {
        if (res.code === 20000) {
          this.swiperList = res.data;
        }
      });
    },
    uploadSuccess(res) {
      if (res.id_list.length > 0) {
        this.$message({
          message: "上传成功",
          type: "success",
        });
        this.getList();
      } else {
        this.$message({
          message: "上传失败",
          type: "fail",
        });
      }
    },
    handleDelete(value) {
      this.swiper = value;
      this.delDialogVisiable = true;
    },
    doDel() {
      this.delDialogVisiable = false;
      this.loading = true;
      del(this.swiper).then(() => {
        this.loading = false;
        this.getList()
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
