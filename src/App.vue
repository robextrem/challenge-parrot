<script lang="ts">
import NavBar from './components/layouts/NavBar.vue'
import SideBar from './components/layouts/SideBar.vue'
export default {
  components: {
    NavBar,
    SideBar,
  },
  data:function(){
    return{
      hideSidebar:true
    }
  }
}
</script>
<template>
    <nav-bar></nav-bar>
    <main>
      <side-bar :is-hidden="hideSidebar"></side-bar>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
</template>