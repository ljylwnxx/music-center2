<template>
  <div class="home-view">
    <div class="home-page-view">
      <transition name="el-fade-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HomeMain'
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