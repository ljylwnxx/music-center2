<template>
  <div class="home-view">
    <div class="home-page-view mtop-20">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import TabsMenu from '@/components/menu/TabsMenu'
export default {
  name: 'HomeMain',
  components: {
    TabsMenu
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.home-view {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    max-width: 1200px;
}
</style>
