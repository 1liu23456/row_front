<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped>
/* 解决表格与表头不对齐问题，必须在入口文件全局添加 */
.el-table th { display: table-cell!important; }
</style>
