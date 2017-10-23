<template>
<div class="tmpl">
  <el-row>
    <el-col :span="24">
      <div class="abread bt-line">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品新增</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-col>
  </el-row>
  <!-- 表单 -->
  <el-row>
    <el-col :span="24"  class="formt">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
        <el-row>
            <el-col :span="12">
                <el-form-item   label="内容标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span='12'>
                <el-form-item label="副标题" prop="sub_title">
                    <el-input v-model="form.sub_title"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
             <el-col :span='24'>
                <el-row>
                     <el-col :span='6'>
                        <el-form-item label="所属类别" prop="category_id">
                            <el-select v-model="form.category_id" placeholder="请选择">
                                 <el-option v-for="(cate,index) in categorylist" :key="index" :label="cate.title" :value="cate.category_id">
                                        <span v-for="count in (cate.class_layer-1)">&nbsp;</span>
                                        <span v-if="cate.class_layer>1">|-</span>
                                         <span v-text="cate.title"></span>
                                </el-option>
                            </el-select>
                          </el-form-item>
                     </el-col>
                     <el-col :span='2':offset='3'>
                        <el-form-item label="是否发布">
                            <el-switch on-text="发布" off-text="未发布" v-model="form.status" :width="80"></el-switch>
                          </el-form-item>
                    </el-col>
                    <el-col :span='8':offset='3' align="left">
                        <el-form-item label="推荐类型">
                            <el-switch on-text="进入轮播" off-text="不进轮播" v-model="form.is_slide" :width="90"></el-switch>
                            <el-switch on-text="置顶" off-text="不置顶" v-model="form.is_top" :width="80"></el-switch>
                            <el-switch on-text="推荐" off-text="不推荐" v-model="form.is_hot" :width="80"></el-switch>
                          </el-form-item>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span='6' align='left'>
                        <el-form-item label="商品号" prop="goods_no">
                                 <el-input v-model="form.goods_no"></el-input>
                         </el-form-item>    
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label="库存" prop="stock_quantity">
                            <el-input v-model="form.stock_quantity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label="市场价" prop="market_price">
                            <el-input v-model="form.market_price"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label="销售价" prop="sell_price">
                            <el-input v-model="form.sell_price"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='10' align='left'>
                            <el-form-item label="上传封面">
                                    <el-upload
                                    class="upload-demo"
                                    action="http://157.122.54.189:9095/admin/article/uploadimg"
                                    :on-success="imgUploaded"
                                    :file-list="form.imgList"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                                  </el-upload>
                                </el-form-item>
                    </el-col>
                    <el-col :span='14' align='left'>
                            <el-form-item label="上传附件">
                                    <el-upload
                                    class="upload-demo"
                                    action="http://157.122.54.189:9095/admin/article/uploadfile"      
                                    :on-success='fileUploaded'
                                    :file-list="form.fileList"
                                    list-type="picture">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                                  </el-upload>
                                </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='24' align='left'>
                        <el-form-item label="详细描述" >
                              <quill-editor v-model="form.content"></quill-editor>
                        </el-form-item>           
                    </el-col>
                </el-row>
             </el-col>
         </el-row>
         <el-row class='reserSub'>
                <el-col :span='24' align='left'>
                        <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                              </el-form-item>
                </el-col>
            </el-row>
      </el-form>
    </el-col>
  </el-row>
</div>
</template>

<script>
    import {
        quillEditor
    } from 'vue-quill-editor'; // 导入富文本编辑器组件对象
    export default {
        // 注册私有组件
        components: {
            quillEditor
        },
        data() {
            var checkNumber = (rule, value, callback) => {
                // 非空验证
                if (!value) {
                    return callback(new Error('不能为空'));
                }

                if (isNaN(value)) {
                    return callback(new Error('输入的值必须是一个数字'));
                } else {
                    callback();
                }
            };
            return {
                categorylist: [],
                form: {
                    title: '',
                    sub_title: '',
                    category_id: '',
                    status: true,
                    is_slide: true,
                    is_top: true,
                    is_hot: true,
                    goods_no: '',
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    content: '',
                    imgList: [], // 商品封面图片数据对象
                    fileList: [] //商品相册图片数组
                },
                rules: {
                    title: [{
                        required: true,
                        message: '请输入标题名称',
                        trigger: 'blur'
                    }],
                    goods_no: [{
                        required: true,
                        message: '请输入商品编号',
                        trigger: 'blur'
                    }],
                    stock_quantity: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    market_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }],
                    sell_price: [{
                        validator: checkNumber,
                        trigger: 'blur'
                    }]
                }
            };
        },
        created() {
            // 当页面加载完毕以后，执行getCatelist()获取到分类下拉框数据
            this.getCatelist();
        },
        methods: {
            imgUploaded(response, file, fileList) {
                this.form.imgList = [response]; // 单张封面图片
                // console.log(response)
            },
            fileUploaded(response, file, fileList) {
                this.form.fileList.push(response);
            },
            getCatelist() {
                this.$http.get('/admin/category/getlist/goods').then(res => {
                    this.categorylist = res.data.message;
                });
            },
            submitForm(formref) {
                this.$refs[formref].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        this.$http.post('/admin/goods/add/goods', this.form).then(res => {
                            console.log(456)
                            if (res.data.status == 1) {
                                this.$message.error(res.data.message);
                                return;
                            };
                            console.log(this.form.category_id)
                            this.$message.success("添加成功");
                            this.$router.push({
                                name: 'goodslist'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //重置表单
            resetForm(formref) {
                this.$refs[formref].resetFields();
            }
        }
    }
</script>
<style scoped>
    .formt {
        padding-left: 10px;
    }
    
    .el-form-item__label {
        width: 50px !important;
    }
    
    .quill-editor {
        height: 200px;
        clear: both;
    }
    
    .reserSub {
        margin-top: 100px;
    }
</style>