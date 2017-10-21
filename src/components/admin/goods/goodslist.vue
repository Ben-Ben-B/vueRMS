<template>
 <div class="arttmpl">
     <el-row>
        <div class="abread bt-line">
       <el-col :span="24"> 
           <!-- 面包屑导航 -->
            <el-breadcrumb separator="/" class="crumbFla">
              <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>商品管理</el-breadcrumb-item>
              <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          </el-breadcrumb>     
       </el-col>
      </div>
     </el-row>
     <div class="operation">
        <el-row>
              <el-col :span="5">
                  <el-button type="primary" icon="plus" size="small">新增</el-button>
                  <el-button type="primary" icon="check" size="small">全选</el-button>
                  <el-button type="primary" icon="delete" size="small">删除</el-button>
              </el-col>
              <el-col :span="4":offset="15">
                   <!-- 搜索框 -->
                   <el-input placeholder="请输入搜索条件" icon="search" v-model="searchValue" :on-icon-click="getlist">                    
                </el-input>
              </el-col>
       </el-row>
    </div>
    <!-- 商品列表 -->
    <el-row>
            <el-col :span="24">
                    <el-table
                    ref="multipleTable"
                    :data="list"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    align="left"
                   >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column prop="title" label="标题">
                        </el-table-column>
                        <el-table-column prop="categoryname" label="类别" width="100">
                            </el-table-column>
                            <el-table-column label="发布人/发布时间"  width="150" show-overflow-tooltip>
                                <template scope="scope">
                                    {{scope.row.user_name }}  / {{scope.row.add_time}}
                                </template>
</el-table-column>
<el-table-column prop="name" label="属性" width="100">
</el-table-column>
<el-table-column label="操作" width="80">
    <template scope="scope">
                                    <a href="#">修改</a>
                                </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
</div>
</template>

<script>
    export default {
        data() {
            return {
                // 搜索框的绑定属性
                searchValue: '',
                list: []
            }
        },
        created() {
            this.getlist();
        },
        methods: {
            getlist() {
                var url = `/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue=${this.searchValue}`;
                this.$http.get(url).then(res => {
                    // 判断服务器返回的状态status
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.list = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
    .bt-line {
        height: 20px;
    }
</style>