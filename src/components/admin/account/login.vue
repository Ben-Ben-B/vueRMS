<template>
<div class="accounttmpl">
    <el-row>
        <el-col :span="8" :offset="6">
            <el-form :model="form" :rules="rules" ref="form1">
                <el-form-item label="账号" prop="uname">
                       <el-input v-model="form.uname"></el-input>
                   </el-form-item>
                   <el-form-item label="密码" prop="upwd">
                        <el-input v-model="form.upwd"></el-input>
                     </el-form-item>
                     <el-form-item label="">
                        <el-button type="success" @click="login">登录</el-button>
                     </el-form-item>
              </el-form>
        </el-col>
    </el-row>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }, ]
                },
                upwd: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }, ]
            }
        },
        mounted() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "#0094ff";
        },
        beforeDestroy() {
            document.getElementsByTagName('body')[0].style.backgroundColor = "white";
        },
        methods: {
            login() {
                this.$refs.form1.validate((valid) => {
                    if (valid) {
                        this.$http.post('/admin/account/login', this.form)
                            .then(res => {
                                if (res.data.status == 1) {
                                    this.$message.error(res.data.message);
                                    return;
                                }
                                this.$router.push({
                                    name: 'layout'
                                })
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>

</style>