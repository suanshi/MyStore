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