<template>
  <div>
    <el-form ref="form" :model="book" label-width="100px">
      <el-form-item label="歌单名称">
        <el-input v-model="book.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="book.copywriter"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchById, update } from "@/api/booklist";

export default {
  data() {
    return {
      book: {},
    };
  },
  created() {
    fetchById({
      id: this.$route.params.id,
    }).then((res) => {
      this.book = res.data;
    });
  },
  methods: {
    onCancel() {
        this.$router.back()
    },
    async onSubmit() {
      update(this.book).then((res) => {
        if (res.data.modified > 0) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$router.back()
        } else {
          this.$message.error('更新失败')
        }
      })
    }
  }
};
</script>

<style>
</style>