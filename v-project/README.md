# 手动配置Vue项目

一般情况下，vue create projectName 就可创建vue中的router、vuex等  但现在就不想放过自己 请看下面

## Sass

```bash
npm i node-sass@4.14.1 --save-dev
npm i sass-loader@7.3.1 --save-dev
```

**【ps】可以指定一下版本号 避免node-sass 或者 sass-loader 版本过高带来的坑**

```vue
<style lang="scss">
	#app{
       /*这里可以用scss*/
    }
</style>
```

## vue-router

```bash
npm i vue-router -S
```

```js
//  /src/router/index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../Home.vue';
Vue.use(VueRouter);

const routes = [
	{
		path:'/',
		component:Home
	},
    // 有其他路由路径可写入
]
const router = new VueRouter({
	mode:'history',
	routes
})
export default router;
```

```js
//   /src/main.js
import router from './router/index.js';
new Vue({
  render: h => h(App),
	router
}).$mount('#app')

```

## Vuex

```bash 
npm i vuex --save
```

```js
// src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
    state : {
        count : 6
    },
    getters : {
        doCount: (state, getters) => {
            return getters.doneTodos.length
        },
        //getters里的第一个参数是state，第二个是getters本身
        doneTodos:(state) =>{
            return state.count+2
        }
    },
    mutations : {
    	counts(state, v) {
            state.count = v;
        },
        addNum(state,v) {
            if(v){
                state.count += v
            }else{
                state.count ++
            }
        },
        reduceNum(state) {
            state.count --
        }
	},
    actions : {
        actionNumAdd(v) {
            // axios.get("/customer/user_info").then(res => {
            //     v.commit(addNum, res.data);
            // });
            //这里可以直接掉接口，并赋值，第一个参数是mutation里对应的名字，第二个参数是传的值
            v.commit('addNum', 6);
        },
        actionNumReduce(v) {
            // axios.get("/customer/user_info").then(res => {
            //     v.commit(addNum, res.data);
            // });
            //这里可以直接掉接口，并赋值，第一个参数是mutation里对应的名字，第二个参数是传的值

            v.commit('reduceNum', 6);
        }
    }
})
```

```js
//  /src/index.js
import {store} from './store/index.js';
new Vue({
    render: h => h(App),
	router
    store,
})
```

```vue
<!--  调用vuex  -->
<template>
  <div id="app">
    <input v-model="counts" />
    <input v-model="getternum" />
    <button @click="addnum1">mutation+1</button>
    <button @click="actionnum6">action+6</button>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import { mapState , mapMutations , mapActions , mapGetters  } from 'vuex';
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      counts:(state) => state.count
    }),
    ...mapGetters({
      getternum:'doneTodos'
    })

  },
  methods:{
    ...mapMutations({
      addnum:'addNum'
    }),
    ...mapActions({
      actionnum:'actionNumAdd'
    }),
    addnum1(){
      this.addnum()
    },
    actionnum6(){
      this.actionnum()
    }
  }
}

</script>
```

## 开启代理
```js
// 与package.json 同级 创建  vue.config.js
module.exports = {
  //其余配置...
  devServer: {
    port: 8000,  // 端口号
    open: false, //项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    changeOrigin: true,//是否跨域
    proxy: {
      "/api": {
        //真实转换成的后台请求地址，别忘了加http(https)
        target: "http://XX.XX.XX.XX:8081/api", 
        // pathRewrite: {//重定向
          "^/trccw": "/",//和上面一样，将请求地址中前面的替换为后面的内容
        // }
      }
    }
  }
};
```