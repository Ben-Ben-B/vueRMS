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
var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist }
            ]
        }
    ]
});
axios.defaults.baseURL = 'http://157.122.54.189:9095';
Vue.prototype.$http = axios;
// Vue.use(axios);

new Vue({
    el: '#app',
    // 使用app这个组件对象
    router,
    // es5的写法
    // render:function(create){create(App);}
    // es6的写法
    render: create => create(App)
});