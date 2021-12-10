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