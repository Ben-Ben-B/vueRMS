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
                    <router-link to="/admin/goodsadd">
                        <el-button type="primary" icon="plus" size="small">新增</el-button>
                    </router-link>
                   
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
                    height="400"
                    @selection-change="getrows"
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
                                    {{scope.row.user_name }}  / {{scope.row.add_time| datefmt('YYYY-MM-DD')}}
                                </template>
</el-table-column>
<el-table-column prop="name" label="属性" width="120">
    <template scope="scope">
            <el-tooltip class="item" effect="dark" v-bind="{content:(scope.row.is_slide==1?'进入轮播图':'不进入轮播图')}" placement="top">
                    <i v-bind="{class:'el-icon-picture ls '+ (scope.row.is_slide==1?'imgactive':'')}"></i>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" v-bind="{content:scope.row.is_top==1?'置顶':'不置顶'}" placement="top">
                        <i v-bind="{class:'el-icon-upload ls '+ (scope.row.is_top==1?'imgactive':'')}"></i>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" v-bind="{content:scope.row.is_hot==1?'推荐':'不推荐'}" placement="top">
                            <i v-bind="{class:'el-icon-star-on ls '+ (scope.row.is_hot==1?'imgactive':'')}"></i>
                          </el-tooltip>
            </template>
</el-table-column>
<el-table-column label="操作" width="80">
    <template scope="scope">
                                    <a href="#">修改</a>
                                </template>
</el-table-column>
</el-table>
</el-col>
</el-row>
<el-row>
    <el-col :span='24'>
        <el-pagination @size-change="sizeChange" @current-change="changePage" :current-page="currentPage" :page-sizes="[10, 20, 30, 50,100,200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" align="left" class='marTop'>
        </el-pagination>
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
                list: [],
                ids: '',
                total: '',
                pageSize: 10,
                currentPage: 1
            }
        },
        created() {
            this.getlist();
        },
        methods: {
            changePage(pageIndex) {
                this.currentPage
            },
            sizeChange(currentSize) {
                this.pageSize = currentSize;
                this.getlist();
            },
            getrows(rows) {
                this.ids = '';
                var splitchar = ',';
                for (var i = 0; i < rows.length; i++) {
                    if (i == rows.length - 1) {
                        splitchar = '';
                    }
                    this.ids += rows[i].id + splitchar;
                }
            },
            getlist() {
                var url = `/admin/goods/getlist?pageIndex=1&pageSize=10&searchvalue=${this.searchValue}`;
                this.$http.get(url).then(res => {
                    // 判断服务器返回的状态status
                    if (res.data.status == 1) {
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.list = res.data.message;
                    // 将总数据条数赋值给total
                    this.total = res.data.totalcount;
                })
            }
        }
    }
</script>
<style scoped>
    .bt-line {
        height: 20px;
    }
    
    .marTop {
        margin-top: 20px;
    }
</style>