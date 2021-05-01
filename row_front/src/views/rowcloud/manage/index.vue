<template>
  <div class="app-container">
       <!-- 分页组件区域 -->
      <!-- 
      size-change	pageSize 改变时会触发 回调参数：每页条数
      current-change	currentPage 改变时会触发 回调参数：当前页
      current-page	当前页数，支持 
      page-sizes	每页显示个数选择器的选项设置
      page-size	每页显示条目个数，
      layout	组件布局，子组件名用逗号分隔
      total	总条目数
       -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1,5, 10, 100]"
      :page-size="5"
      style="padding: 30px 0; text-align: center;"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        <!--查询表单 TODO 有点小问题 ，施肥标记查询所有漏施的，播种标记查询同理 
        这里也
        -->
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-select
            v-model="queryInfo.ftag"
            clearable
            placeholder="是否漏施"
          >
            <el-option :value="0" label="漏施" />
            <el-option :value="1" label="正常" />
          </el-select>
        </el-form-item>

         <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getRowList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
         </el-form-item>
         <el-form-item>
            <!-- 出现####是因为表格太小，拉宽即可 -->
        <a :href= "BASE_API+'/downloadExcel'"></el-button><el-button type="primary">导出excel</el-button></a>
         </el-form-item>
           <uploader 
           isComplete 
            :options="options" 
            class="uploader-example"
              @file-success="onFileSuccess" 
              @file-error="onFileError"
              @file-removed="removeFile">
              <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                  <uploader-btn>上传excel文件</uploader-btn>
                </uploader-drop>
              <uploader-list></uploader-list>
          </uploader>
      </el-form>
    </el-form>
     
    <!-- 表格区域 -->
      <el-table
        id="row_table" 
        :data="rowList" 
        border 
        stripe
        fit
        highlight-current-row
        lazy
        v-loading="listLoading"
        element-loading-text="数据加载中,请稍后..."
        >
        <el-table-column label="序号" width="50px">
           <template slot-scope="scope">
            {{ (page - 1) * limit + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="经度" prop="lng" width="110"></el-table-column>
        <el-table-column label="纬度" prop="lat" width="110"></el-table-column>
        <el-table-column label="播深(mm)" prop="sdeep" width="60"></el-table-column>
          <el-table-column label="施肥标记" prop="ftag" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.ftag === 0">正常</el-tag>
            <el-tag type="danger" v-else>漏施</el-tag>
           </template>
        </el-table-column>
        <el-table-column label="播种标记" prop="stag" width="80">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.stag === 0">漏播</el-tag>
            <el-tag type="success" v-else-if="scope.row.stag === 1">单粒</el-tag>
            <el-tag type="info" v-else>重播</el-tag>
           </template>
        </el-table-column>
        <el-table-column label="时间" prop="createTime" width="160">
        </el-table-column>
        <el-table-column label="镇压力(N)" prop="press" width="90"></el-table-column>
        <el-table-column label="角速度" prop="pals" width="70"></el-table-column>
        <el-table-column label="加速度" prop="acce" width="70"></el-table-column>
        <!-- 操作区域 -->
        <!--自定义操作插槽-->
        <el-table-column label="删除" width="80">
          <template slot-scope="scope">
            <el-button
            size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="deleteRow(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>   
      </el-table>
    </el-card>
  </div>
</template>

<script>
import rowApi from '@/api/rowcloud/row'
export default {
  data() {
    return {
      BASE_API: process.env.BASE_API,  //请求接口
      rowList: null, //返回存放播种信息列表
      total: 0, //总记录数
      page: 1, //当前页
      limit: 5, //每页记录数
       //查询信息实体
      queryInfo: {},
      //是否显示加载信息
      listLoading: true,
      // 上传Excel组件设置
      options: {
        target: process.env.BASE_API + '/getExcelData', //上传excel请求接口地址
        testChunks: false  //分片
      },
      attrs: {
          //上传文件类型
          accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
        }
    };
  },
  created() {
    //实例开始创建就加载信息列表
    this.getRowList();
  },
  methods: {
    //上传excel成功  有参数(rootFile, file, response, chunk)
     onFileSuccess() {
        this.$message({
            type: "success",
            message: "上传成功!"
          });
          //上传成功之后刷新列表
          this.getRowList()
      },
      //上传excel失败提示
      onFileError() {
           this.$message({
            type: "waring",
            message: "上传失败!"
          });
      },
    //获取所有分页用户
    getRowList() {
      rowApi.getRowList(this.page, this.limit, this.queryInfo).then(response => {
        //请求成功
          //response接口返回的数据
          this.rowList = response.data.rows;
          this.total = response.data.total;
          //数据加载完毕停止加载中
          this.listLoading = false;
      })
    },

    deleteRow(id) {
       this.$confirm("此操作将永久删除该讲师记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         //点击确定，执行then方法
        rowApi.deleteRow(id).then(response => {
          //删除成功
          //提示
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //回到列表页面，刷新
          this.getRowList();
        });
      });
    },

  //点击改变页数触发的事件
   handleSizeChange(newSize) {
      this.limit = newSize;
      this.getRowList(); // 数据发生改变重新申请数据
    },
    //current-change	currentPage 改变时会触发  回调参数：当前页
    //// 监听页码改变的事件
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getRowList(); // 数据发生改变重新申请数据
    },
    //重置查询表单
    resetData() {
      this.queryInfo = {};  //清空查询对象
      this.getRowList();  //刷新列表
    },
  }
};
</script>

<style lang="scss" scoped>
.btn {
  margin-left: 5%;
}
.link {
  color:#fff;
}
.link:hover {
  text-decoration: none;
  color: rgb(255, 112, 112);
}
.uploader-drop {
  padding: 0;
  border: 0px dashed rgb(211, 67, 67);
  background-color: #fff
}
.uploader-btn {
  color: black;
}
.uploader-list {
  float: left;
  width: 400px !important;
  position: relative;
}
</style>
