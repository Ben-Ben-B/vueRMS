import Vue from 'vue';
import axios from 'axios';

//导入element-ui
import vueRouter from 'vue-router';
Vue.use(vueRouter);
import ElementUI from 'element-ui';
import '../statics/theme_rms/index.css';
// 将此项目的全局样式导入到elementui中的css之后
import '../statics/css/site.css';
Vue.use(ElementUI);
import App from './App.vue';
import layout from './components/admin/layout.vue';

import login from './components/admin/account/login.vue';
// 导入goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue';
import goodsadd from './components/admin/goods/goodsadd.vue';
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd }
            ]
        }
    ]
});
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
// Vue.use(axios);
// 4.0 定义共有过滤器(全局过滤器)来实现日期字符串的格式化操作
Vue.filter('datefmt', (input, fmtstring) => {
    var mydate = new Date(input);
    var y = mydate.getFullYear();
    var m = mydate.getMonth() + 1;
    var d = mydate.getDate();
    var h = mydate.getHours();
    var mi = mydate.getMinutes();
    var s = mydate.getSeconds();

    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD HH:mm:ss') {
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s;
    }

});

new Vue({
    el: '#app',
    // 使用app这个组件对象
    router,
    // es5的写法
    // render:function(create){create(App);}
    // es6的写法
    render: create => create(App)
});