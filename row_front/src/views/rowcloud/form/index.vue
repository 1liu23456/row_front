<template>
  <div class="app-container">
    <el-form ref="form" :model="row" label-width="120px">
      <el-form-item label="经度">
        <el-input v-model="row.lng"/>
      </el-form-item>
      <el-form-item label="纬度">
        <el-input v-model="row.lat"/>
      </el-form-item>
      <el-form-item label="sdeep">
        <el-input v-model="row.sdeep"/>
      </el-form-item>

      <el-form-item label="stag">
        <el-input v-model="row.stag"/>
      </el-form-item>
      <el-form-item label="ftag">
        <el-input v-model="row.ftag"/>
      </el-form-item>

      <el-form-item label="press">
        <el-input v-model="row.press"/>
      </el-form-item>
      <el-form-item label="acce">
        <el-input v-model="row.acce"/>
      </el-form-item>

        <el-form-item label="pals">
        <el-input v-model="row.pals"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>  
    </el-form>
  </div>
</template>

<script>
import rowApi from '@/api/rowcloud/row'
export default {
  data() {
    return {
        row: {},
    }
  },
  methods: {
    onSubmit() {
      rowApi.saveRowList(this.row).then(response => {
          this.$message({
            message: '添加成功!',
            type: 'primary'
      })
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

